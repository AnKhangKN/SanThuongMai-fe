import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const BreadcrumbComponent = () => {
    // Mapping giữa path và tên hiển thị
const breadcrumbNameMap = {
  "/vendor": "Trang chủ",
  "/vendor/profile-shop": "Hồ sơ Shop",
  "/vendor/add-product": "Thêm sản phẩm",
  "/vendor/see-all-product": "Danh sách sản phẩm",
  "/vendor/approve-order": "Duyệt đơn hàng",
  "/vendor/revenue-report": "Báo cáo doanh thu",
  "/vendor/add-payment": "Thêm hình thức thanh toán",
  "/vendor/reply-comment": "Trả lời bình luận",
  "/vendor/feedback-comment": "Phản hồi bình luận",
};

  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter(i => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Trang mua hàng</Link>
    </Breadcrumb.Item>,
    ...extraBreadcrumbItems,
  ];

  return (
    <Breadcrumb style={{ margin: "0 20px" }}>{breadcrumbItems}</Breadcrumb>
  );
}

export default BreadcrumbComponent;