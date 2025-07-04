import { useState } from "react";
import { IconContainer, OptionContainer, OptionSelect, Wrapper } from "./style";
import { BiSolidDashboard } from "react-icons/bi";
import { AiFillProduct } from "react-icons/ai";
import { MdAccountBox, MdDiscount } from "react-icons/md";
import { FaChartPie, FaShippingFast } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const SidebarActionListComponent = ({ isCollapsed }) => {
  const navigate = useNavigate();

  const [isShowAccountOptions, setIsShowAccountOptions] = useState(false);
  const [isShowPromotionOptions, setIsShowPromotionOptions] = useState(false);

  const handleNavigateManagementUser = () => {
    navigate("/admin/users");
  };

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

      {/* Quản lý người dùng */}
      <OptionContainer
        onClick={() => setIsShowAccountOptions(!isShowAccountOptions)}
      >
        <OptionSelect>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconContainer>
              <MdAccountBox />
            </IconContainer>

            {!isCollapsed && (
              <div style={{ paddingLeft: "10px" }}>Quản lý người dùng</div>
            )}
          </div>
        </OptionSelect>
      </OptionContainer>

      {isShowAccountOptions && (
        <OptionContainer style={{ paddingLeft: "20px" }}>
          <Link
            to="/admin/vendors"
            style={{ textDecoration: "none", color: "#333" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {!isCollapsed && (
                <div style={{ paddingLeft: "10px" }}>Công tác viên</div>
              )}
            </div>
          </Link>
        </OptionContainer>
      )}

      {isShowAccountOptions && (
        <OptionContainer style={{ paddingLeft: "20px" }}>
          <div onClick={handleNavigateManagementUser}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {!isCollapsed && (
                <div style={{ paddingLeft: "10px" }}>Người dùng</div>
              )}
            </div>
          </div>
        </OptionContainer>
      )}

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

      {/* Quản lý ship hàng */}
      <OptionContainer>
        <Link
          to="/admin/shipping"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconContainer>
              <FaShippingFast />
            </IconContainer>
            {!isCollapsed && (
              <div style={{ paddingLeft: "10px" }}>Giao hàng</div>
            )}
          </div>
        </Link>
      </OptionContainer>

      {/* Promotion */}
      <OptionContainer
        onClick={() => setIsShowPromotionOptions(!isShowPromotionOptions)}
      >
        <OptionSelect>
          <Link
            to="/admin/banner"
            style={{ textDecoration: "none", color: "#333" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconContainer>
                <MdDiscount />
              </IconContainer>

              {!isCollapsed && (
                <div style={{ paddingLeft: "10px" }}>Banner & Giảm giá</div>
              )}
            </div>
          </Link>
        </OptionSelect>
      </OptionContainer>

      {isShowPromotionOptions && (
        <OptionContainer style={{ paddingLeft: "20px" }}>
          <Link
            to="/admin/banner"
            style={{ textDecoration: "none", color: "#333" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {!isCollapsed && (
                <div style={{ paddingLeft: "10px" }}>Banner</div>
              )}
            </div>
          </Link>
        </OptionContainer>
      )}

      {isShowPromotionOptions && (
        <OptionContainer style={{ paddingLeft: "20px" }}>
          <Link
            to="/admin/discount"
            style={{ textDecoration: "none", color: "#333" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {!isCollapsed && (
                <div style={{ paddingLeft: "10px" }}>Discount</div>
              )}
            </div>
          </Link>
        </OptionContainer>
      )}

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
