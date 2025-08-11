import React from "react";
import { Menu } from "antd";
import {
  ShoppingCartOutlined,
  OrderedListOutlined,
  DollarCircleOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const MenuVendorComponent = () => {
  const navigate = useNavigate();

  const items = [
    {
      key: "product",
      label: "Quản lý sản phẩm",
      icon: <ShoppingCartOutlined />,
      children: [
        { key: "/vendor/add-product", label: "Thêm sản phẩm" },
        { key: "/vendor/see-all-product", label: "Tất cả sản phẩm" },
        // { key: '/edit-product', label: 'Sửa sản phẩm' },
        // { key: '/delete-product', label: 'Xóa sản phẩm' },
      ],
    },
    {
      key: "order",
      label: "Quản lý đơn hàng",
      icon: <OrderedListOutlined />,
      children: [
        { key: "/vendor/approve-order", label: "Duyệt đơn & cập nhật" },
        // { key: '/vendor/update-status', label: 'Cập nhật trạng thái' },
      ],
    },
    {
      key: "revenue",
      label: "Quản lý tài chính",
      icon: <DollarCircleOutlined />,
      children: [
        { key: "/vendor/revenue-report", label: "Thống kê thu nhập" },
        // { key: '/vendor/add-payment', label: 'Thêm cổng thanh toán' },
      ],
    },
    {
      key: "customer",
      label: "Tương tác khách hàng",
      icon: <MessageOutlined />,
      children: [
        // { key: '/vendor/reply-comment', label: 'Trả lời bình luận' },
        { key: "/vendor/feedback-comment", label: "Phản hồi bình luận" },
      ],
    },
  ];

  const onClick = (e) => {
    navigate(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: "100%" }}
      mode="inline"
      items={items}
    />
  );
};

export default MenuVendorComponent;
