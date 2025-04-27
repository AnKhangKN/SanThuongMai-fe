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

const ProFileShop = () => {
  return (
    <ShopProfileWrapper>
      <ShopAvatar src={shopLogo} alt="Shop Logo" />
      <ShopInfo>
        <ShopName>Shop Thể Thao HKN</ShopName>
        <ShopDescription>
          Chuyên cung cấp các dụng cụ thể thao chất lượng cao, giá cả hợp lý.
        </ShopDescription>
        <ShopDetail>
          <p><strong>Mã shop:</strong> SHP-202504</p>
          <p><strong>Email:</strong> hknsports@gmail.com</p>
          <p><strong>Điện thoại:</strong> 0987 654 321</p>
          <p><strong>Địa chỉ:</strong> 123 Nguyễn Trãi, Q.5, TP.HCM</p>
        </ShopDetail>
      </ShopInfo>
    </ShopProfileWrapper>
  )
}

export default ProFileShop