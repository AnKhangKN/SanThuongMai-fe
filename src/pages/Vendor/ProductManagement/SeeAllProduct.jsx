import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, InputNumber } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// Các component layout giả định
import ButtonComponents from '../../../components/VendorComponents/ButtonComponents/ButtonComponents';
import InputComponent from '../../../components/VendorComponents/InputComponent/InputComponent';
import ComboboxComponent from '../../../components/VendorComponents/ComboboxComponent/ComboboxComponent';
import { WrapperHeaderSeeAllProduct, WrapperUnderHeaderSeeAllProduct } from './StyleSeeAllProduct';

const SeeAllProduct = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickToAddProduct = () => {
    navigate('/vendor/add-product');
  };

  const sampleData = [
    {
      id: 1,
      product_name: 'Giày đá bóng Nike',
      images: ['https://via.placeholder.com/50'],
      details: [
        {
          price: 700000,
          color: 'Đỏ',
          size: '42',
          quantity: 10,
        },
      ],
    },
    {
      id: 2,
      product_name: 'Áo thể thao Adidas',
      images: ['https://via.placeholder.com/50'],
      details: [
        {
          price: 450000,
          color: 'Xanh',
          size: 'L',
          quantity: 15,
        },
      ],
    },
  ];

  const PriceProduct = [
    { label: 'Tất cả', value: 'all' },
    { label: '0 -> 100.000', value: '0-100000' },
    { label: '100.000 -> 200.000', value: '100000-200000' },
    { label: '200.000 -> 300.000', value: '200000-300000' },
    { label: '300.000 -> 400.000', value: '300000-400000' },
    { label: '400.000 -> 500.000', value: '400000-500000' },
    { label: '500.000 -> 600.000', value: '500000-600000' },
  ];

  const handleEdit = (record) => {
    setEditingProduct(record);
    form.setFieldsValue({
      product_name: record.product_name,
      price: record.details?.[0]?.price,
      color: record.details?.[0]?.color,
      size: record.details?.[0]?.size,
      quantity: record.details?.[0]?.quantity,
    });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log('Dữ liệu đã sửa:', { ...editingProduct, ...values });
      setIsModalOpen(false);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'images',
      key: 'images',
      render: (images) => (
        <img
          src={images?.[0] || 'https://via.placeholder.com/50'}
          alt="product"
          style={{ width: 50, height: 50, objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Giá bán',
      dataIndex: ['details', 0, 'price'],
      key: 'price',
      render: (price, record) =>
        `${record.details?.[0]?.price?.toLocaleString() || 0}₫`,
    },
    {
      title: 'Màu sắc',
      dataIndex: ['details', 0, 'color'],
      key: 'color',
      render: (_, record) => record.details?.[0]?.color || 'Không có',
    },
    {
      title: 'Kích thước',
      dataIndex: ['details', 0, 'size'],
      key: 'size',
      render: (_, record) => record.details?.[0]?.size || 'Không có',
    },
    {
      title: 'Số lượng',
      dataIndex: ['details', 0, 'quantity'],
      key: 'quantity',
      render: (_, record) => record.details?.[0]?.quantity || 0,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Sửa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <WrapperHeaderSeeAllProduct>
        <h3>Sản phẩm</h3>
        <ButtonComponents onClick={handleClickToAddProduct} icon={<PlusOutlined />} textButton={'Thêm sản phẩm'} />
      </WrapperHeaderSeeAllProduct>

      <WrapperUnderHeaderSeeAllProduct>
        <InputComponent name="searchProduct" label={'Tìm kiếm sản phẩm'} placeholder={'Nhập tên sản phẩm'} icon={<SearchOutlined />} />
        <ComboboxComponent name="searchPriceProduct" label={'Giá sản phẩm'} placeholder={'Chọn giá sản phẩm'} options={PriceProduct} />
      </WrapperUnderHeaderSeeAllProduct>

      <WrapperUnderHeaderSeeAllProduct>
        <h4>Danh sách sản phẩm</h4>
        <div>{sampleData.length} sản phẩm</div>
      </WrapperUnderHeaderSeeAllProduct>

      <Table columns={columns} dataSource={sampleData} rowKey="id" />

      <Modal title="Chỉnh sửa sản phẩm" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="product_name" label="Tên sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Giá bán" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="color" label="Màu sắc">
            <Input />
          </Form.Item>
          <Form.Item name="size" label="Kích thước">
            <Input />
          </Form.Item>
          <Form.Item name="quantity" label="Số lượng">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SeeAllProduct;
