import React, { useEffect, useState, useCallback } from 'react';
import { Modal, Form, Input, InputNumber, Upload, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

import ButtonComponents from '../../../components/VendorComponents/ButtonComponents/ButtonComponents';
import InputComponent from '../../../components/VendorComponents/InputComponent/InputComponent';
import ComboboxComponent from '../../../components/VendorComponents/ComboboxComponent/ComboboxComponent';
import { WrapperHeaderSeeAllProduct, WrapperUnderHeaderSeeAllProduct, StyledTable, StyledTh, StyledTd, ProductImage, EditButton } from './StyleSeeAllProduct';
import * as ProductService from '../../../services/vendor/ProductService';
import * as AuthServices from "../../../services/shared/AuthServices";
import { isJsonString } from "../../../utils";

const SeeAllProduct = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [allData, setAllData] = useState([]);

  const handleClickToAddProduct = () => {
    navigate('/vendor/add-product');
  };

  const handleDecoded = () => {
    const storageData = localStorage.getItem('access_token');
    let decoded = {};

    if (storageData && isJsonString(storageData)) {
      const parsed = JSON.parse(storageData);
      decoded = jwtDecode(parsed);
      return { decoded, storageData: parsed };
    }

    return { decoded, storageData };
  };

  const fetchProducts = useCallback(async () => {
    try {
      let { storageData, decoded } = handleDecoded();

      let accessToken = storageData;

      if (decoded?.exp < Date.now() / 1000) {
        const res = await AuthServices.refreshToken();
        accessToken = res?.access_token;
        localStorage.setItem("access_token", JSON.stringify(accessToken));
      }

      const res = await ProductService.getAllProducts(accessToken);

      console.log('res',res)

      // Kiểm tra kiểu dữ liệu của res.data trước khi map
      const productsWithKeys = res.data.data.map((product) => ({
        ...product,
        key: product._id,
        product_name: product.product_name,
        description: product.description,
        category: product.category,
        status: product.status,

      }));

      console.log('productsWithKeys',productsWithKeys)

      setAllData(productsWithKeys);

    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const fetchUpdateProduct = async (productData) => {
    try {
      let { storageData, decoded } = handleDecoded();
      let accessToken = storageData;

      if (decoded?.exp < Date.now() / 1000) {
        const res = await AuthServices.refreshToken();
        if (res?.access_token) {
          accessToken = res.access_token;
          localStorage.setItem('access_token', JSON.stringify(accessToken));
        }
      }

      const res = await ProductService.updatedProduct(accessToken, productData);

      if (res?.status === 200) {
        message.success('Sửa sản phẩm thành công!');
        form.resetFields();
        setIsModalOpen(false);
        fetchProducts();
      } else {
        message.error('Sửa sản phẩm thất bại!');
      }
    } catch (error) {
      console.error('Lỗi khi sửa sản phẩm:', error);
      message.error('Có lỗi xảy ra khi sửa sản phẩm.');
    }
  };

  const onFinish = async (values) => {
    const productData = {
      _id: editingProduct?._id,
      user_id: editingProduct?.user_id,
      product_name: values.product_name,
      description: values.description,
      category: values.category,
      status: values.status,
      images: previewImages.length > 0 ? previewImages : editingProduct.images,
      details: [{
        price: values.price,
        import_price: values.import_price,
        color: values.color,
        size: values.size,
        quantity: values.quantity,
      }],
    };

    await fetchUpdateProduct(productData);
  };

  const PriceProduct = [
    { label: 'Tất cả', value: 'all' },
    { label: '0 -> 100.000', value: '0-100000' },
    { label: '100.000 -> 200.000', value: '100000-200000' },
    { label: '200.000 -> 300.000', value: '200000-300000' },
    { label: '300.000 -> 400.000', value: '300000-400000' },
    { label: '400.000 -> 500.000', value: '400000-500000' },
    { label: '500.000 -> 600.000', value: '500000-600000' },
  ];

  return (
    <div>
      <WrapperHeaderSeeAllProduct>
        <h3>Sản phẩm</h3>
        <ButtonComponents onClick={handleClickToAddProduct} icon={<PlusOutlined />} textButton="Thêm sản phẩm" />
      </WrapperHeaderSeeAllProduct>

      <WrapperUnderHeaderSeeAllProduct>
        <InputComponent name="searchProduct" label="Tìm kiếm sản phẩm" placeholder="Nhập tên sản phẩm" icon={<SearchOutlined />} />
        <ComboboxComponent name="searchPriceProduct" label="Giá sản phẩm" placeholder="Chọn giá sản phẩm" options={PriceProduct} />
      </WrapperUnderHeaderSeeAllProduct>

      <WrapperUnderHeaderSeeAllProduct>
        <h4>Danh sách sản phẩm</h4>
        <div>{allData?.length} sản phẩm</div>
      </WrapperUnderHeaderSeeAllProduct>

      <StyledTable>
        <thead>
          <tr>
            <StyledTh>Tên sản phẩm</StyledTh>
            <StyledTh>Hình ảnh</StyledTh>
            <StyledTh>Giá bán</StyledTh>
            <StyledTh>Màu sắc</StyledTh>
            <StyledTh>Kích thước</StyledTh>
            <StyledTh>Số lượng</StyledTh>
            <StyledTh>Thao tác</StyledTh>
          </tr>
        </thead>
        <tbody>
          {allData?.map((item) => (
            <tr key={item._id}>
              <StyledTd>{item.product_name}</StyledTd>
              <StyledTd>
                <ProductImage src={item.main_image || 'https://via.placeholder.com/150'} alt="product" />
              </StyledTd>
              <StyledTd>{item.price ? item.price.toLocaleString() : 'Chưa có giá'}₫</StyledTd>
              <StyledTd>{item.color || 'Chưa có màu sắc'}</StyledTd>
              <StyledTd>{item.size || 'Chưa có kích thước'}</StyledTd>
              <StyledTd>{item.quantity || 0}</StyledTd>
              <StyledTd>
                <EditButton>Sửa</EditButton>
              </StyledTd>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default SeeAllProduct;
