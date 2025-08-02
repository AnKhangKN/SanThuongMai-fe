import React, { useEffect, useState, useMemo } from "react";
import { Col, message } from "antd";
import { jwtDecode } from "jwt-decode";
import {
  WrapperItemNumber,
  WrapperItemText,
  WrapperVendor,
  WrapperVendorBackgroundItem,
  WrapperVendorMain,
  WrapperVendorMainItem,
  WrapperVendorTextMain,
} from "./styleVendorMain";
import * as AuthServices from "../../../services/shared/AuthServices";
import * as OrderProductService from "../../../services/vendor/OrderProductService";

const VendorMain = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const decoded = jwtDecode(token);

      if (decoded.exp < Date.now() / 1000) {
        const refreshed = await AuthServices.refreshToken();
        localStorage.setItem("access_token", refreshed.access_token);
      }

      const res = await OrderProductService.getAllOrders(
        localStorage.getItem("access_token")
      );

      if (res.data.status === "OK") {
        setOrders(res.data.data);
      } else {
        message.error("Không thể tải đơn hàng");
      }
    } catch (err) {
      console.error("Lỗi fetch orders:", err);
      message.error("Lỗi khi tải đơn hàng");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Đếm số lượng theo trạng thái
  const statusCounts = useMemo(() => {
    const count = {
      pending: 0,
      processing: 0,
      shipping: 0,
      delivered: 0,
      returned: 0,
      cancelled: 0,
    };

    orders.forEach((order) => {
      order.productItems.forEach((item) => {
        if (count[item.status] !== undefined) {
          count[item.status]++;
        }
      });
    });

    return count;
  }, [orders]);

  return (
    <WrapperVendor>
      <Col span={24}>
        <WrapperVendorMain>
          <WrapperVendorTextMain>Danh sách cần làm</WrapperVendorTextMain>
          <WrapperVendorMainItem>
            <WrapperVendorBackgroundItem>
              <WrapperItemNumber>{statusCounts.shipping}</WrapperItemNumber>
              <WrapperItemText>Chờ lấy hàng</WrapperItemText>
            </WrapperVendorBackgroundItem>

            <WrapperVendorBackgroundItem>
              <WrapperItemNumber>{statusCounts.processing}</WrapperItemNumber>
              <WrapperItemText>Đang xử lý</WrapperItemText>
            </WrapperVendorBackgroundItem>

            <WrapperVendorBackgroundItem>
              <WrapperItemNumber>{statusCounts.delivered}</WrapperItemNumber>
              <WrapperItemText>Đã giao</WrapperItemText>
            </WrapperVendorBackgroundItem>

            <WrapperVendorBackgroundItem>
              <WrapperItemNumber>{statusCounts.pending}</WrapperItemNumber>
              <WrapperItemText>Chờ xác nhận</WrapperItemText>
            </WrapperVendorBackgroundItem>

            <WrapperVendorBackgroundItem>
              <WrapperItemNumber>
                {statusCounts.cancelled + statusCounts.returned}
              </WrapperItemNumber>
              <WrapperItemText>Đơn hủy / Trả hàng</WrapperItemText>
            </WrapperVendorBackgroundItem>
          </WrapperVendorMainItem>
        </WrapperVendorMain>
      </Col>
    </WrapperVendor>
  );
};

export default VendorMain;
