import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Input, message, Typography } from "antd";
import logo_den from "../../../assets/images/Logo_Den.jpg";
import logo_removebg from "../../../assets/images/Logo_Den-removebg-preview.png";
import * as AuthServices from "../../../services/shared/AuthServices";
import { useMutationHooks } from "../../../hook/useMutationHook";
import * as MessageComponent from "../../../components/CustomerComponents/MessageComponent/MessageComponent";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/slices/userSlice";

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

    if (isError) {
      MessageComponent.error("Đăng nhập thất bại!");
    }
  }, [isSuccess, isError, data]);

  // useEffect 2: xử lý navigate và gọi API
  useEffect(() => {
    if (isSuccess && data?.access_token) {
      const decoded = jwtDecode(data.access_token);

      if (location.state) {
        navigate(location.state);
      } else if (decoded?.id) {
        handleGetDetailUser(
          decoded.id,
          data.access_token,
          decoded.isAdmin,
          decoded.isVendor
        );
      }
    }
  }, [isSuccess, data, location]);

  const handleGetDetailUser = async (id, accessToken, isAdmin, isVendor) => {
    const res = await AuthServices.getDetailUser(id, accessToken);
    dispatch(updateUser({ ...res?.data, access_token: accessToken }));

    if (isAdmin) {
      handleNavigateAdminPage();
    } else if (isVendor) {
      handleNavigateVendorPage();
    } else {
      handleNavigateHome();
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
            message.error("Người dùng chưa xác định hoặc chưa có tài khoản!");
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
          width: "1200px",
          margin: "auto",
          alignItems: "center",
        }}
      >
        <div style={{ width: "40px", height: "40px" }}>
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
      <div style={{ backgroundColor: "#ee4d2d", minHeight: "600px" }}>
        <div
          style={{
            width: "1200px",
            margin: "auto",
            height: "600px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {/* Logo bên trái */}
          <div style={{ textAlign: "center", color: "#fff" }}>
            <img src={logo_removebg} alt="logo" style={{ width: 300 }} />
            <div style={{ fontSize: 24, fontWeight: "bold" }}>Shopee</div>
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
                  !email.length || !password.length ? "#ccc" : "#f53d2d",
                borderColor:
                  !email.length || !password.length ? "#ccc" : "#f53d2d",
                color: "#fff",
              }}
              onClick={handleLogin}
            >
              TIẾP THEO
            </Button>

            <div style={{ textAlign: "right", marginTop: 8 }}>
              <AntLink href="#">Quên mật khẩu?</AntLink>
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
