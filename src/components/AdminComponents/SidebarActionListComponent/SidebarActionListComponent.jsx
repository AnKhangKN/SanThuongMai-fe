import React, { useState } from "react";
import { IconContainer, OptionContainer, OptionSelect, Wrapper } from "./style";
import { BiSolidDashboard } from "react-icons/bi";
import { AiFillProduct } from "react-icons/ai";
import { MdAccountBox, MdShoppingCart } from "react-icons/md";
import { IoWarning } from "react-icons/io5";
import { FaChartPie } from "react-icons/fa";
import { Link } from "react-router-dom";

const SidebarActionListComponent = ({ isCollapsed }) => {
  const [isShowAccountOptions, setIsShowAccountOptions] = useState(false);

  return (
    <Wrapper>
      {/* Trang chủ */}
      <OptionContainer>
        <Link to="/admin" style={{ textDecoration: "none", color: "#333" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconContainer>
              <BiSolidDashboard />
            </IconContainer>
            {!isCollapsed && (
              <div style={{ paddingLeft: "10px" }}>Trang chủ</div>
            )}
          </div>
        </Link>
      </OptionContainer>

      {/* Quản lý tài khoản */}
      <OptionContainer>
        <OptionSelect
          onClick={() => setIsShowAccountOptions(!isShowAccountOptions)}
        >
          <IconContainer>
            <MdAccountBox />
          </IconContainer>
          {!isCollapsed && (
            <div style={{ paddingLeft: "10px" }}>Quản lý tài khoản</div>
          )}
        </OptionSelect>

        {!isCollapsed && isShowAccountOptions && (
          <>
            <Link
              to="/admin/vendors"
              style={{ textDecoration: "none", color: "#333" }}
            >
              <div style={{ padding: "10px 0px 20px 30px" }}>Cộng tác viên</div>
            </Link>

            <Link
              to="/admin/customers"
              style={{ textDecoration: "none", color: "#333" }}
            >
              <div style={{ paddingLeft: "30px" }}>Khách hàng</div>
            </Link>
          </>
        )}
      </OptionContainer>

      {/* Quản lý sản phẩm */}
      <OptionContainer>
        <Link
          to="/admin/products"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconContainer>
              <AiFillProduct />
            </IconContainer>
            {!isCollapsed && (
              <div style={{ paddingLeft: "10px" }}>Quản lý sản phẩm</div>
            )}
          </div>
        </Link>
      </OptionContainer>

      {/* Quản lý đơn hàng */}
      <OptionContainer>
        <Link
          to="/admin/orders"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconContainer>
              <MdShoppingCart />
            </IconContainer>
            {!isCollapsed && (
              <div style={{ paddingLeft: "10px" }}>Quản lý đơn hàng</div>
            )}
          </div>
        </Link>
      </OptionContainer>

      {/* Quản lý vi phạm */}
      <OptionContainer>
        <Link
          to="/admin/reports"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconContainer>
              <IoWarning />
            </IconContainer>
            {!isCollapsed && (
              <div style={{ paddingLeft: "10px" }}>Quản lý vi phạm</div>
            )}
          </div>
        </Link>
      </OptionContainer>

      {/* Thống kê */}
      <OptionContainer>
        <Link
          to="/admin/statistics"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconContainer>
              <FaChartPie />
            </IconContainer>
            {!isCollapsed && (
              <div style={{ paddingLeft: "10px" }}>Thống kê</div>
            )}
          </div>
        </Link>
      </OptionContainer>
    </Wrapper>
  );
};

export default SidebarActionListComponent;
