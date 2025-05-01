import React from "react";
import { Button, Image } from "antd";
import InformationSignUp from "../../../assets/images/Orther/InformationSignUp.png";
import {
  WrapperRegister,
  WrapperRegisterTextDescribe,
  WrapperRegisterTextWelcome,
} from "./styleRegister";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleClickToNextForm = () => {
    navigate("/vendor/register-form"); // Đường dẫn
  };
  return (
    <WrapperRegister>
      <div>
        <Image
          src={InformationSignUp}
          alt="Information SignUp image"
          style={{ height: "200px", width: "200px" }}
          preview={false}
        ></Image>
      </div>
      <WrapperRegisterTextWelcome>
        Chào mừng đến với HKN!
      </WrapperRegisterTextWelcome>
      <WrapperRegisterTextDescribe>
        Vui lòng cung cấp thông tin để thành lập tài khoản người bán trên HKN
      </WrapperRegisterTextDescribe>
      <Button
        type="primary"
        style={{ backgroundColor: "#f6f6f6", color: "#000" }}
        onClick={handleClickToNextForm}
      >
        Bắt đầu đăng ký
      </Button>
    </WrapperRegister>
  );
};

export default Register;
