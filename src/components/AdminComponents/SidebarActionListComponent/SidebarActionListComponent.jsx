import { useState } from "react";
import { IconContainer, OptionContainer, OptionSelect, Wrapper } from "./style";
import { BiSolidDashboard } from "react-icons/bi";
import { AiFillProduct } from "react-icons/ai";
import { MdAccountBox } from "react-icons/md";
import { FaChartPie, FaShippingFast } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const SidebarActionListComponent = ({ isCollapsed }) => {
  const navigate = useNavigate();

  const [isShowAccountOptions, setIsShowAccountOptions] = useState(false);

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

      {/* Quản lý vi phạm */}
      {/* <OptionContainer
        onClick={() => setIsShowViolationOptions(!isShowViolationOptions)}
      >
        <OptionSelect>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconContainer>
              <IoWarning />
            </IconContainer>

            {!isCollapsed && (
              <div style={{ paddingLeft: "10px" }}>Quản lý vi phạm</div>
            )}
          </div>
        </OptionSelect>
      </OptionContainer>

      {isShowViolationOptions && (
        <OptionContainer style={{ paddingLeft: "20px" }}>
          <Link
            to="/admin/report/shops"
            style={{ textDecoration: "none", color: "#333" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {!isCollapsed && (
                <div style={{ paddingLeft: "10px" }}>Cửa hàng vi phạm</div>
              )}
            </div>
          </Link>
        </OptionContainer>
      )}

      {isShowViolationOptions && (
        <OptionContainer style={{ paddingLeft: "20px" }}>
          <Link
            to="/admin/report/products"
            style={{ textDecoration: "none", color: "#333" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {!isCollapsed && (
                <div style={{ paddingLeft: "10px" }}>Sản phẩm vi phạm</div>
              )}
            </div>
          </Link>
        </OptionContainer>
      )}

      {isShowViolationOptions && (
        <OptionContainer style={{ paddingLeft: "20px" }}>
          <Link
            to="/admin/report/orders"
            style={{ textDecoration: "none", color: "#333" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {!isCollapsed && (
                <div style={{ paddingLeft: "10px" }}>Đơn hàng vi phạm</div>
              )}
            </div>
          </Link>
        </OptionContainer>
      )} */}

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
