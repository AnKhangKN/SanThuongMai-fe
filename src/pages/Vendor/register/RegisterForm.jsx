import React from "react";
import VendorSteps from "../../../components/VendorComponents/VendorSteps/VendorSteps";
import {
  WrapperFormVendor,
  WrapperPositionButtonVendor,
  WrapperStepsPadding,
  WrapperStepsVendor,
} from "./styleForm";
import FormOfVendorRegister from "../../../components/VendorComponents/FormOfVendorRegister/FormOfVendorRegister";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const handleClickToNextSuccess = () => {
    navigate("/vendor/register-success"); // Đường dẫn
  };
  return (
    <div>
      <WrapperStepsPadding>
        <WrapperStepsVendor>
          <VendorSteps current={0} />
        </WrapperStepsVendor>
      </WrapperStepsPadding>

      <WrapperStepsPadding>
        <WrapperFormVendor>
          <FormOfVendorRegister />
        </WrapperFormVendor>
      </WrapperStepsPadding>

      <WrapperPositionButtonVendor>
        <Button
          style={{
            marginRight: "10px",
            backgroundColor: "#fff",
            color: "#333",
          }}
        >
          Lưu
        </Button>
        <Button
          style={{ backgroundColor: "#333", color: "#fff" }}
          onClick={handleClickToNextSuccess}
        >
          Tiếp theo
        </Button>
      </WrapperPositionButtonVendor>
    </div>
  );
};

export default RegisterForm;
