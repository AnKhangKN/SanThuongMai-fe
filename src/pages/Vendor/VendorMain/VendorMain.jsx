import React, { useEffect, useState } from 'react';
import { Col } from 'antd';
import {jwtDecode} from 'jwt-decode';
import { WrapperItemNumber, WrapperItemText, WrapperVendor, WrapperVendorBackgroundItem, WrapperVendorMain, WrapperVendorMainItem, WrapperVendorTextMain } from './styleVendorMain';
// import { getOrderStatus } from '../../../services/vendor/OrderProductService';

const VendorMain = () => {

  return (
    <WrapperVendor>
      <Col span={24}>
        <WrapperVendorMain>
          <WrapperVendorTextMain>Danh sách cần làm</WrapperVendorTextMain>
          <WrapperVendorMainItem>

            <WrapperVendorBackgroundItem>
              <WrapperItemNumber>{0 || 0}</WrapperItemNumber>
              <WrapperItemText>Chờ lấy hàng</WrapperItemText>
            </WrapperVendorBackgroundItem>

            <WrapperVendorBackgroundItem>
              <WrapperItemNumber>{0 || 0}</WrapperItemNumber>
              <WrapperItemText>Đang xử lý</WrapperItemText>
            </WrapperVendorBackgroundItem>

            <WrapperVendorBackgroundItem>
              <WrapperItemNumber>{0 || 0}</WrapperItemNumber>
              <WrapperItemText>Đã giao</WrapperItemText>
            </WrapperVendorBackgroundItem>

            <WrapperVendorBackgroundItem>
              <WrapperItemNumber>{0 || 0}</WrapperItemNumber>
              <WrapperItemText>Đã nhận hàng</WrapperItemText>
            </WrapperVendorBackgroundItem>

            <WrapperVendorBackgroundItem>
              <WrapperItemNumber>{0 || 0}</WrapperItemNumber>
              <WrapperItemText>Đơn hủy / Trả hàng</WrapperItemText>
            </WrapperVendorBackgroundItem>

          </WrapperVendorMainItem>
        </WrapperVendorMain>
      </Col>
    </WrapperVendor>
  );
};

export default VendorMain;
