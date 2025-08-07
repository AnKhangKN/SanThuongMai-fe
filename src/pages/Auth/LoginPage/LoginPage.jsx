import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Input, message, Typography } from "antd";
import logo_den from "../../../assets/images/Logo_Trang.jpg";
import logo_removebg from "../../../assets/images/Logo_Den-removebg-preview.png";
import * as AuthServices from "../../../services/shared/AuthServices";
import { useMutationHooks } from "../../../hook/useMutationHook";
import * as MessageComponent from "../../../components/CustomerComponents/MessageComponent/MessageComponent";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/slices/userSlice";
import { updateCart } from "../../../redux/slices/cartSlice";
import * as CartServices from "../../../services/customer/CartServices";

const { Title, Text, Link: AntLink } = Typography;

const LoginPage = () => {
  //lưu
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  //call api
  const mutation = useMutationHooks((data) => AuthServices.loginUser(data));

  const { data, isError, isSuccess } = mutation;

  // useEffect 1: thông báo và lưu token
  useEffect(() => {
    if (isSuccess) {
      MessageComponent.success("Đăng nhập thành công");
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
    }
  }, [isSuccess, isError, data]);

  // useEffect 2: xử lý navigate và gọi API
  useEffect(() => {
    const fetchUserAndNavigate = async () => {
      if (isSuccess && data?.access_token) {
        const decoded = jwtDecode(data.access_token);
        await handleGetDetailUser(
          data.access_token,
          decoded.isAdmin,
          decoded.isVendor
        );

        // Sau khi set user xong mới điều hướng
        if (location.state) {
          navigate(location.state);
        }
      }
    };

    fetchUserAndNavigate();
  }, [isSuccess, data, location]);

  const handleGetDetailUser = async (accessToken, isAdmin, isVendor) => {
    try {
      const res = await AuthServices.getDetailUser(accessToken);
      const userData = res.data;
      dispatch(updateUser(userData));

      if (!userData.isAdmin && !userData.isVendor) {
        const cartRes = await CartServices.getAllItem(accessToken);
        const userCart = cartRes.data?.[0];

        if (userCart) {
          dispatch(
            updateCart({
              products: userCart.productItems || [],
              total_item: userCart.productItems?.length || 0,
            })
          );
        } else {
        }
      }

      if (isAdmin) {
        handleNavigateAdminPage();
      } else if (isVendor) {
        handleNavigateVendorPage();
      } else {
        handleNavigateHome();
      }
    } catch (err) {
      console.error("Lỗi lấy thông tin người dùng:", err);
      message.error("Không thể lấy thông tin người dùng.");
    }
  };

  const navigate = useNavigate();

  //truyền
  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnchangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleNavigateSignup = () => {
    navigate("/sign-up");
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleNavigateAdminPage = () => {
    navigate("/admin");
  };

  const handleNavigateVendorPage = () => {
    navigate("/vendor");
  };

  const handleNavigateForget = () => {
    navigate("/forget-password");
  };

  // Xử lý
  const handleLogin = () => {
    mutation.mutate(
      {
        email,
        password,
      },
      {
        onError: (error) => {
          if (error.status === 401) {
            message.error(error.response.data.message);
          }

          if (error.status === 500) {
            message.error(error.response.data.message);
          }
        },
      }
    );
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          lineHeight: "84px",
          display: "flex",
          maxWidth: "1200px",
          margin: "auto",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            style={{ width: "40px", objectFit: "cover" }}
            src={logo_den}
            alt="logo"
          />
        </div>
        <div style={{ marginLeft: 12, fontWeight: "bold", fontSize: 20 }}>
          Đăng nhập
        </div>
      </div>

      {/* Main */}
      <div style={{ backgroundColor: "#194a7a", minHeight: "600px" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
            height: "600px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {/* Logo bên trái */}
          <div
            className="d-none d-md-block"
            style={{ textAlign: "center", color: "#fff" }}
          >
            <img src={logo_removebg} alt="logo" style={{ width: 300 }} />
            <div style={{ fontSize: 24, fontWeight: "bold" }}>HKN</div>
          </div>

          {/* Form đăng nhập */}
          <Card
            style={{
              width: 400,
              padding: 24,
              borderRadius: 8,
            }}
          >
            <Title level={3} style={{ textAlign: "center" }}>
              Đăng nhập
            </Title>

            <Input
              name="email"
              type="email"
              placeholder="Tên đăng nhập hoặc Email"
              size="large"
              style={{ marginBottom: 16 }}
              onChange={handleOnchangeEmail}
            />

            <Input.Password
              name="password"
              placeholder="Mật khẩu"
              size="large"
              style={{ marginBottom: 16 }}
              onChange={handleOnchangePassword}
            />

            {data?.status === "ERROR" && (
              <div style={{ color: "red", marginBottom: 12 }}>
                {data?.message}
              </div>
            )}

            <Button
              loading={mutation.isLoading}
              disabled={!email.length || !password.length}
              type="primary"
              block
              size="large"
              style={{
                backgroundColor:
                  !email.length || !password.length ? "#ccc" : "#194a7a",
                borderColor:
                  !email.length || !password.length ? "#ccc" : "#194a7a",
                color: "#fff",
              }}
              onClick={handleLogin}
            >
              TIẾP THEO
            </Button>

            <div style={{ textAlign: "right", marginTop: 8 }}>
              <AntLink onClick={handleNavigateForget}>Quên mật khẩu?</AntLink>
            </div>

            <div style={{ textAlign: "center", marginTop: 16 }}>
              <Text type="secondary">Bạn mới biết đến HKN store? </Text>
              <AntLink onClick={handleNavigateSignup}>Đăng ký</AntLink>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
