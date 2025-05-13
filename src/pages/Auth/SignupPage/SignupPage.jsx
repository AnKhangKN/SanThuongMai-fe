import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Input, Typography, message } from "antd";
import * as AuthServices from "../../../services/shared/AuthServices";
import { useMutationHooks } from "../../../hook/useMutationHook";
import logo_remove_bg from "../../../assets/images/Logo_Den-removebg-preview.png";
import * as MessageComponent from "../../../components/CustomerComponents/MessageComponent/MessageComponent";
import logo_den from "../../../assets/images/Logo_Trang.jpg";

const { Title, Text, Link: AntLink } = Typography;

const SignupPage = () => {
  const navigate = useNavigate();

  // Lưu các thuộc tính vào useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Call API
  const mutation = useMutationHooks((data) => AuthServices.signupUser(data));

  const { error, isError, isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess) {
      MessageComponent.success("Đăng kí thành công");
      handleNavigateLogin();
    }
  }, [isSuccess]);

  // Theo dõi thay đổi
  const handleOnchangeEmail = (e) => setEmail(e.target.value);
  const handleOnchangePassword = (e) => setPassword(e.target.value);
  const handleOnchangeConfirmPassword = (e) =>
    setConfirmPassword(e.target.value);

  // Thực hiện signup
  const handleSignUp = () => {
    mutation.mutate(
      {
        email,
        password,
        confirm_password: confirmPassword,
      },
      {
        onError: (error) => {
          const msg = error?.response?.data?.message || "Đăng ký thất bại!";
          message.error(msg);
        },
      }
    );
  };

  const handleNavigateLogin = () => {
    navigate("/login");
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
          Đăng ký
        </div>
      </div>

      {/* Main */}
      <div style={{ backgroundColor: "#194a7a", minHeight: "600px" }}>
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
            <img src={logo_remove_bg} alt="logo" style={{ width: 300 }} />
            <div style={{ fontSize: 24, fontWeight: "bold" }}>HKN</div>
          </div>

          {/* Form đăng ký */}
          <Card
            style={{
              width: 400,
              padding: 24,
              borderRadius: 8,
            }}
          >
            <Title level={3} style={{ textAlign: "center" }}>
              Đăng ký
            </Title>

            <Input
              type="email"
              placeholder="Email"
              size="large"
              name="email"
              style={{ marginBottom: 16 }}
              onChange={handleOnchangeEmail}
            />

            <Input.Password
              placeholder="Mật khẩu"
              size="large"
              name="password"
              style={{ marginBottom: 16 }}
              onChange={handleOnchangePassword}
            />

            <Input.Password
              placeholder="Xác nhận mật khẩu"
              size="large"
              name="confirmPassword"
              style={{ marginBottom: 16 }}
              onChange={handleOnchangeConfirmPassword}
            />

            {/* Hiển thị thông báo lỗi */}
            {isError && (
              <div style={{ color: "red", marginBottom: 12 }}>
                {error?.response?.data?.message || "Có lỗi xảy ra"}
              </div>
            )}

            <Button
              disabled={
                !email.length || !password.length || !confirmPassword.length
              }
              type="primary"
              block
              size="large"
              style={{
                backgroundColor:
                  !email.length || !password.length || !confirmPassword.length
                    ? "#ccc"
                    : "#194a7a",
                borderColor:
                  !email.length || !password.length || !confirmPassword.length
                    ? "#ccc"
                    : "#194a7a",
                color: "#fff",
              }}
              onClick={handleSignUp}
            >
              TIẾP THEO
            </Button>

            <Text
              type="secondary"
              style={{ display: "block", marginTop: 20, fontSize: 12 }}
            >
              Bằng việc đăng ký, bạn đã đồng ý với HKN về{" "}
              <AntLink href="#">Điều khoản dịch vụ</AntLink> &{" "}
              <AntLink href="#">Chính sách bảo mật</AntLink>
            </Text>

            <div style={{ textAlign: "center", marginTop: 16 }}>
              <Text type="secondary">Bạn đã có tài khoản? </Text>
              <AntLink onClick={handleNavigateLogin}>Đăng nhập</AntLink>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
