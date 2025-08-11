import React from "react";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  IconWrapper,
  InformationWrapper,
  ModalInformation,
  ModalNotification,
  NotificationWrapper,
  VendorText,
  Wrapper,
} from "./style";
import { BsInstagram } from "react-icons/bs";
import { PiBellSimpleRingingBold } from "react-icons/pi";
import { SlQuestion } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import * as AuthServices from "../../../services/shared/AuthServices";
import { resetUser } from "../../../redux/slices/userSlice";
import { message } from "antd";
import { resetCart } from "../../../redux/slices/cartSlice";

const HeaderNavbarComponent = () => {
  const user = useSelector((state) => state.user);
  const avatar = useSelector((state) => state.avatar);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigateVendor = () => {
    if (user?.id && user?.isVendor === true) {
      navigate("/vendor");
    } else if (user?.id && !user?.isVendor) {
      message.warning("Hãy đăng ký trở thành người bán hàng!");
      navigate("/vendor/register");
    } else {
      message.warning("Hãy đăng nhập trước!");
      navigate("/login");
    }
  };

  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };

  const handleNavigateLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      await AuthServices.logoutUser();
      localStorage.removeItem("access_token");
      dispatch(resetUser());
      dispatch(resetCart());
      navigate("/");
    } catch (error) {
      console.error("Lỗi khi logout:", error);
    }
  };

  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          rowGap: "10px",
          width: "100%",
        }}
      >
        {/* Left Side */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "15px",
            color: "#fff",
          }}
        >
          <div onClick={handleNavigateVendor} style={{ cursor: "pointer" }}>
            Kênh Bán Hàng
          </div>

          {user?.isVendor ? (
            <div>|</div>
          ) : !user?.id ? (
            <VendorText>
              <Link
                to="/login"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Trở thành người bán HKN
              </Link>
            </VendorText>
          ) : (
            <VendorText>
              <Link
                to="/vendor/register"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Trở thành người bán HKN
              </Link>
            </VendorText>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div>Kết nối</div>
            <div>
              <Link to="#" style={{ color: "#fff" }}>
                <FaFacebook />
              </Link>
              <Link to="#" style={{ color: "#fff", paddingLeft: "6px" }}>
                <BsInstagram />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
            color: "#fff",
          }}
        >
          <NotificationWrapper>
            <IconWrapper>
              <PiBellSimpleRingingBold />
            </IconWrapper>
            <div>Thông báo</div>

            <ModalNotification>
              <div>Thông báo</div>
              <div>Chưa có thông báo nào</div>
            </ModalNotification>
          </NotificationWrapper>

          <Link
            to="#"
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              textDecoration: "none",
              color: "#fff",
            }}
          >
            <IconWrapper>
              <SlQuestion />
            </IconWrapper>
            <div>Hỗ trợ</div>
          </Link>

          {user?.fullName ? (
            <InformationWrapper>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  height: "24px",
                  width: "24px",
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                }}
              >
                <img
                  src={avatar?.img || user?.img}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div style={{ marginLeft: "5px" }}>{user.fullName}</div>

              <ModalInformation>
                {user?.isAdmin ? (
                  <Link to="/admin">Quay về Admin</Link>
                ) : user?.isVendor ? (
                  <Link to="/vendor">Quay về Vendor</Link>
                ) : (
                  <>
                    <Link to="/user/account/profile">Thông tin cá nhân</Link>
                    <Link to="/user/purchase/delivered">Đơn mua</Link>
                  </>
                )}
                <div onClick={handleLogout}>Đăng xuất</div>
              </ModalInformation>
            </InformationWrapper>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <div onClick={handleNavigateSignUp} style={{ cursor: "pointer" }}>
                Đăng ký
              </div>
              <div>|</div>
              <div onClick={handleNavigateLogin} style={{ cursor: "pointer" }}>
                Đăng nhập
              </div>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default HeaderNavbarComponent;
