import { Avatar, Col, Image, message, Spin  } from "antd";
import React, { useState, useRef, useEffect } from "react";
import logo from "../../../assets/images/Logo_Trang.jpg";
import { DownOutlined, ShopOutlined, LogoutOutlined } from "@ant-design/icons";
import {
  AvatarWrapper,
  DropdownMenu,
  WrapperAvatarList,
  WrapperHeader,
  WrapperHeaderImageAvatar,
  WrapperHeaderImageLogo,
  WrapperHeaderTextAvatar,
  WrapperHeaderTextLogo,
  WrapperListItem,
} from "./styleHeaderOfVendor";
import { useNavigate } from "react-router-dom";
import { resetUser } from "../../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";
import * as AuthServices from "../../../services/shared/AuthServices";
import * as UserVendorService from "../../../services/vendor/UserVendorService";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";

const HeaderOfVendorComponent = (props) => {
  const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const baseUrl = process.env.REACT_APP_API_URL; // backend url
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClickToProfileShop = () => {
    navigate("/vendor/profile-shop"); // Đường dẫn bạn muốn chuyển đến
  };

  const handleClickToMainVendor = () => {
    navigate("/vendor");
  };
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await AuthServices.logoutUser();

      // Xoá access token localStorage
      localStorage.removeItem("access_token");

      // Reset redux user state
      dispatch(resetUser());

      // Điều hướng về trang login
      navigate("/login");
    } catch (error) {
      console.error("Lỗi khi logout:", error);
    }
  };

  const handleDecoded = async () => {
  let storageToken = localStorage.getItem("access_token");

  if (!storageToken) return null;

  // Nếu token đang ở dạng JSON string → parse
  if (isJsonString(storageToken)) {
    storageToken = JSON.parse(storageToken);
  }

  try {
    const decoded = jwtDecode(storageToken);
    const isExpired = decoded.exp < Date.now() / 1000;

    if (isExpired) {
      const res = await AuthServices.refreshToken();
      const newAccessToken = res?.access_token;
      if (newAccessToken) {
        localStorage.setItem("access_token", newAccessToken);
        return newAccessToken;
      } else {
        return null;
      }
    }

    return storageToken;
  } catch (err) {
    console.error("Lỗi khi decode token:", err);
    return null;
  }
};

  const fetchGetVendor = async () => {
    try {
      const token = await handleDecoded();
      if (!token) {
        console.log("token", token)
        message.error("Không có token hợp lệ.");
        return;
      }

      const res = await UserVendorService.getVendorInfo(token);
      if (res?.status === "OK" && res.data) {
        setShop(res.data);
      } else {
        message.error("Không thể lấy thông tin cửa hàng.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin shop:", error);
      message.error("Có lỗi xảy ra khi lấy thông tin.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGetVendor();
  }, []);

  if (loading) return <Spin tip="Đang tải thông tin cửa hàng..." />;

  if (!shop) return <p>Không tìm thấy thông tin cửa hàng.</p>;

  
  return (
    <WrapperHeader>
      <Col
        span={12}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <WrapperHeaderImageLogo
          onClick={handleClickToMainVendor}
          src={logo}
          alt="LogoHKN"
          preview={false}
          style={{ width: "50px", height: "30px" }}
        ></WrapperHeaderImageLogo>

      <div>
          <BreadcrumbComponent />
        </div>
      
      </Col>

      <Col
        span={12}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <AvatarWrapper ref={dropdownRef}>
          <WrapperHeaderImageAvatar onClick={toggleDropdown}>
            <Avatar src={shop.shopAvatar
            ? `${baseUrl}/avatar/${shop.shopAvatar}`
            : logo} size="default" gap={"10px"}></Avatar>
            {/* <WrapperHeaderImageAvatar src={avatar} alt='avatar' preview={false}></WrapperHeaderImageAvatar> */}
            <WrapperHeaderTextAvatar style={{ marginLeft: "10px", fontWeight: "500", fontSize: "16px" }}>{shop.shopName}</WrapperHeaderTextAvatar>
            <DownOutlined
              style={{ width: "16px", height: "16px", marginLeft: "10px" }}
            />
          </WrapperHeaderImageAvatar>

          {open && (
            <DropdownMenu>
              <WrapperAvatarList>
                <Avatar
                  src={shop.shopAvatar
            ? `${baseUrl}/avatar/${shop.shopAvatar}`
            : logo}
                  preview={false}
                  style={{ width: "56px", height: "56px", margin: "0 0 10px" }}
                />
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    padding: "0 16px",
                    wordBreak: "break-word",
                  }}
                >
                  {shop.shopName}
                </span>
              </WrapperAvatarList>
              <WrapperListItem className="menu-item" onClick={handleClickToProfileShop}>
                <ShopOutlined
                  style={{ fontSize: "16px", marginRight: "10px" }}
                />{" "}
                Hồ sơ Shop
              </WrapperListItem>
              <WrapperListItem className="menu-item" onClick={handleLogout}>
                <LogoutOutlined
                  style={{ fontSize: "16px", marginRight: "10px" }}
                />
                Đăng xuất
              </WrapperListItem>
            </DropdownMenu>
          )}
        </AvatarWrapper>
      </Col>
    </WrapperHeader>
  );
};

export default HeaderOfVendorComponent;
