import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Input, message, Typography } from "antd";
import logo_den from "../../../assets/images/Logo_Trang.jpg";
import logo_removebg from "../../../assets/images/Logo_Den-removebg-preview.png";
import * as AuthServices from "../../../services/shared/AuthServices";

const { Title, Text, Link: AntLink } = Typography;

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Xử lý nhập email
  const handleOnChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  // Điều hướng đến trang đăng nhập
  const handleNavigateLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  // Gửi yêu cầu lấy lại mật khẩu
  const handleSendPassword = useCallback(async () => {
    if (!email.trim()) {
      return message.warning("Vui lòng nhập email.");
    }

    setLoading(true);
    try {
      const res = await AuthServices.forgetPassword({ email });

      if (res) {
        message.success("Mật khẩu mới đã được gửi đến email của bạn.");
        handleNavigateLogin();
      }
    } catch (error) {
      message.error("Lỗi đổi mật khẩu!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [email, handleNavigateLogin]);

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
          <div style={{ textAlign: "center", color: "#fff" }}>
            <img src={logo_removebg} alt="logo" style={{ width: 300 }} />
            <div style={{ fontSize: 24, fontWeight: "bold" }}>HKN</div>
          </div>

          {/* Form quên mật khẩu */}
          <Card style={{ width: 400, padding: 24, borderRadius: 8 }}>
            <Title level={3} style={{ textAlign: "center" }}>
              Quên mật khẩu
            </Title>

            <Input
              name="email"
              type="email"
              placeholder="Nhập email của bạn"
              size="large"
              style={{ marginBottom: 16 }}
              onChange={handleOnChangeEmail}
              value={email}
            />

            <Button
              disabled={!email.trim()}
              type="primary"
              block
              size="large"
              style={{
                backgroundColor: "#194a7a",
                borderColor: "#194a7a",
                color: "#fff",
              }}
              loading={loading}
              onClick={handleSendPassword}
            >
              Nhận mật khẩu mới
            </Button>

            <div style={{ textAlign: "center", marginTop: 16 }}>
              <Text type="secondary">Bạn mới biết đến HKN store? </Text>
              <AntLink onClick={handleNavigateLogin}>Đăng nhập</AntLink>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
