import React from "react";
import { IconContainer, OptionContainer, OptionSelect, Wrapper } from "./style";
import { BiSolidDashboard } from "react-icons/bi";
import { AiFillProduct } from "react-icons/ai";
import { MdAccountBox, MdShoppingCart } from "react-icons/md";
import { IoWarning } from "react-icons/io5";
import { FaChartPie } from "react-icons/fa";
import { Link } from "react-router-dom";

const SidebarActionListComponent = () => {
  return (
    <Wrapper>
      <OptionContainer>
        <Link to="/admin" style={{ textDecoration: "none", color: "#333" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconContainer>
              <BiSolidDashboard />
            </IconContainer>

            <div style={{ padding: "0px 0px 0px 10px" }}>Trang chủ</div>
          </div>
        </Link>
      </OptionContainer>

      <OptionContainer>
        <OptionSelect>
          <IconContainer>
            <MdAccountBox />
          </IconContainer>

          <div style={{ padding: "0px 0px 0px 10px" }}>Quản lý tài khoản</div>
        </OptionSelect>

        <Link
          to="/admin/vendors"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <div style={{ padding: "20px 0px 0px 30px" }}>Công tác viên</div>
        </Link>

        <Link
          to="/admin/customers"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <div style={{ padding: "20px 0px 0px 30px" }}>Khách hàng</div>
        </Link>
      </OptionContainer>

      <OptionContainer>
        <OptionSelect>
          <IconContainer>
            <AiFillProduct />
          </IconContainer>

          <div style={{ padding: "0px 0px 0px 10px" }}> Quản lý sản phẩm</div>
        </OptionSelect>

        <Link
          to="/admin/categories"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <div style={{ padding: "20px 0px 0px 30px" }}>Danh mục sản phẩm</div>
        </Link>

        <Link
          to="/admin/products"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <div style={{ padding: "20px 0px 0px 30px" }}>Sản phẩm</div>
        </Link>
      </OptionContainer>

      <OptionContainer>
        <Link
          to="/admin/orders"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconContainer>
              <MdShoppingCart />
            </IconContainer>

            <div style={{ padding: "0px 0px 0px 10px" }}>Quản lý đơn hàng</div>
          </div>
        </Link>
      </OptionContainer>

      <OptionContainer>
        <Link
          to="/admin/reports"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconContainer>
              <IoWarning />
            </IconContainer>

            <div style={{ padding: "0px 0px 0px 10px" }}>Quản lý vi phạm</div>
          </div>
        </Link>
      </OptionContainer>

      <OptionContainer>
        <Link
          to="/admin/statistics"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconContainer>
              <FaChartPie />
            </IconContainer>

            <div style={{ padding: "0px 0px 0px 10px" }}>Thống kê</div>
          </div>
        </Link>
      </OptionContainer>
    </Wrapper>
  );
};

export default SidebarActionListComponent;
