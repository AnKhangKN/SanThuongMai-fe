import React, { useEffect, useState } from 'react';
import { Col } from 'antd';
import {jwtDecode} from 'jwt-decode';
import { WrapperItemNumber, WrapperItemText, WrapperVendor, WrapperVendorBackgroundItem, WrapperVendorMain, WrapperVendorMainItem, WrapperVendorTextMain } from './styleVendorMain';
import { getOrderStatus } from '../../../services/vendor/OrderProductService';

const VendorMain = () => {
  const [orderStats, setOrderStats] = useState({});

  useEffect(() => {
    const fetchOrderStats = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) return;

        const decoded = jwtDecode(token);
        const ownerId = decoded.userId || decoded.id || decoded._id;

        if (!ownerId) return;

        const response = await getOrderStatus(token, ownerId);

        if (response.success) {
          setOrderStats(response.data);
        }
      } catch (error) {
        console.error("Lỗi lấy thống kê đơn hàng:", error);
      }
    };

    fetchOrderStats();
  }, []);

  return (
    <WrapperVendor>
      <Col span={24}>
        <WrapperVendorMain>
          <WrapperVendorTextMain>Danh sách cần làm</WrapperVendorTextMain>
          <WrapperVendorMainItem>

            <WrapperVendorBackgroundItem>
              <WrapperItemNumber>{orderStats.pending || 0}</WrapperItemNumber>
              <WrapperItemText>Chờ lấy hàng</WrapperItemText>
            </WrapperVendorBackgroundItem>

            <WrapperVendorBackgroundItem>
              <WrapperItemNumber>{orderStats.processing || 0}</WrapperItemNumber>
              <WrapperItemText>Đang xử lý</WrapperItemText>
            </WrapperVendorBackgroundItem>

            <WrapperVendorBackgroundItem>
              <WrapperItemNumber>{orderStats.shipped || 0}</WrapperItemNumber>
              <WrapperItemText>Đã giao</WrapperItemText>
            </WrapperVendorBackgroundItem>

            <WrapperVendorBackgroundItem>
              <WrapperItemNumber>{orderStats.delivered || 0}</WrapperItemNumber>
              <WrapperItemText>Đã nhận hàng</WrapperItemText>
            </WrapperVendorBackgroundItem>

            <WrapperVendorBackgroundItem>
              <WrapperItemNumber>{orderStats.cancelled || 0}</WrapperItemNumber>
              <WrapperItemText>Đơn hủy / Trả hàng</WrapperItemText>
            </WrapperVendorBackgroundItem>

          </WrapperVendorMainItem>
        </WrapperVendorMain>
      </Col>
    </WrapperVendor>
  );
};

export default VendorMain;
