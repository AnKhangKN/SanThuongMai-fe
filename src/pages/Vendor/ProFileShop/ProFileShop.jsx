import React from 'react'
import shopLogo from '../../../assets/images/Logo_Trang.jpg'
import {
  ShopProfileWrapper,
  ShopAvatar,
  ShopInfo,
  ShopName,
  ShopDescription,
  ShopDetail
} from './styleOfProfile';
import { useSelector } from 'react-redux';

const ProFileShop = () => {
  const user = useSelector((state) => state.user);


  return (
    <ShopProfileWrapper>
      <ShopAvatar src={shopLogo} alt="Shop Logo" />
      <ShopInfo>
        <ShopName>Shop Thể Thao HKN</ShopName>
        <ShopDescription>
          Chuyên cung cấp các dụng cụ thể thao chất lượng cao, giá cả hợp lý.
        </ShopDescription>
        <ShopDetail>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Điện thoại:</strong> {user?.shop?.phone}</p>
          <p><strong>Địa chỉ:</strong> 123 Nguyễn Trãi, Q.5, TP.HCM</p>
        </ShopDetail>
      </ShopInfo>
    </ShopProfileWrapper>
  )
}

export default ProFileShop