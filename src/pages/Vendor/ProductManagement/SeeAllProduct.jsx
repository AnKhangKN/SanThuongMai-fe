import React from 'react'
import ButtonComponents from '../../../components/VendorComponents/ButtonComponents/ButtonComponents'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { WrapperHeaderSeeAllProduct, WrapperUnderHeaderSeeAllProduct } from './StyleSeeAllProduct';
import InputComponent from '../../../components/VendorComponents/InputComponent/InputComponent';
import ComboboxComponent from '../../../components/VendorComponents/ComboboxComponent/ComboboxComponent';
import TableProductComponent from '../../../components/VendorComponents/TableProductComponent/TableProductComponent';
import { useNavigate } from 'react-router-dom';

const SeeAllProduct = () => {

  const navigate = useNavigate();
  
    const handleClickToAddProduct = () => {
      navigate('/vendor/add-product'); // Đường dẫn bạn muốn chuyển đến
    };

  const PriceProduct = [
    { label: 'Tất cả', value: 'all' },
    {label: '0 -> 100.000', value: '0-100000'},
    {label: '100.000 -> 200.000', value: '100000-200000'},
    {label: '200.000 -> 300.000', value: '200000-300000'},
    {label: '300.000 -> 400.000', value: '300000-400000'},
    {label: '400.000 -> 500.000', value: '400000-500000'},
    {label: '500.000 -> 600.000', value: '500000-600000'},

  ];

  const sampleData = [
    {
      id: 1,
      name: 'Giày đá bóng Nike',
      importPrice: 500000,
      sellPrice: 700000,
      brand: 'Nike',
      origin: 'Việt Nam',
    },
    {
      id: 2,
      name: 'Áo thể thao Adidas',
      importPrice: 300000,
      sellPrice: 450000,
      brand: 'Adidas',
      origin: 'Trung Quốc',
    },
  ];
    const handleEdit = (product) => {
      console.log('Sửa sản phẩm:', product);
      // Navigate đến trang sửa hoặc mở form
    };
  
    const handleDelete = (product) => {
      console.log('Xóa sản phẩm:', product);
      // Gọi API xóa hoặc mở confirm
    };

  return (
    <div>
      <WrapperHeaderSeeAllProduct>
        <h3>Sản phẩm</h3>
        <div>
          <ButtonComponents onClick={handleClickToAddProduct} icon={<PlusOutlined />} textButton={'Thêm sản phẩm'} />
        </div>
      </WrapperHeaderSeeAllProduct>

      <WrapperUnderHeaderSeeAllProduct>
        <InputComponent name='searchProduct' label={'Tìm kiếm sản phẩm'} placeholder={'Nhập tên sản phẩm'} icon={<SearchOutlined />} />
        <ComboboxComponent name='searchPriceProduct' label={'Giá sản phẩm'} placeholder={'Chọn giá sản phẩm'} options={PriceProduct} />
      </WrapperUnderHeaderSeeAllProduct>

      <WrapperUnderHeaderSeeAllProduct>
        <h4>Danh sách sản phẩm</h4>
        <div>10 sản phẩm</div>
      </WrapperUnderHeaderSeeAllProduct>

      <div>
        <TableProductComponent dataSource={sampleData} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  )
}
export default SeeAllProduct