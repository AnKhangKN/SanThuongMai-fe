import React from "react";
import VendorSteps from "../../../components/VendorComponents/VendorSteps/VendorSteps";
import {
  WrapperFormVendor,
  WrapperPositionButtonVendor,
  WrapperStepsPadding,
  WrapperStepsVendor,
  WrapperVendorInfoTax,
  WrapperVendorInfoTaxIn,
} from "./styleForm";
import { Button } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import FormTaxOfVendorRegister from "../../../components/VendorComponents/FormOfVendorRegister/FormTaxOfVendorRegister";
import { useNavigate } from "react-router-dom";

const RegisterTax = () => {
  const navigate = useNavigate();

  const handleClickToNextSuccessRegister = () => {
    navigate("/vendor/register-success"); // Đường dẫn
  };

  const handleClickToBackTransportRegister = () => {
    navigate("/vendor/register-transport");
  };
  return (
    <div>
      <WrapperStepsPadding>
        <WrapperStepsVendor>
          <VendorSteps current={2} />
        </WrapperStepsVendor>
      </WrapperStepsPadding>

      <WrapperVendorInfoTax>
        <WrapperVendorInfoTaxIn>
          <InfoCircleFilled
            style={{
              color: "#2673dd",
              display: "flex",
              alignItems: "flex-start",
              paddingTop: "4px",
            }}
          />
          <span
            style={{
              marginRight: "20px",
              fontSize: "14px",
              lineHeight: "16px",
            }}
          >
            Việc thu thập Thông Tin Thuế và Thông Tin Định Danh là bắt buộc theo
            quy định của Luật an ninh mạng, Thương mại điện tử và Thuế của Việt
            Nam. Thông Tin Thuế và Thông Tin Định Danh sẽ được bảo vệ theo chính
            sách bảo mật của HIN. Người bán hoàn toàn chịu trách nhiệm về
            tính chính xác của thông tin.
          </span>
        </WrapperVendorInfoTaxIn>
      </WrapperVendorInfoTax>

      <WrapperStepsPadding>
        <WrapperFormVendor>
          <FormTaxOfVendorRegister />
        </WrapperFormVendor>
      </WrapperStepsPadding>

      <WrapperPositionButtonVendor style={{ justifyContent: "space-between" }}>
        <Button
          style={{
            marginRight: "10px",
            backgroundColor: "#fff",
            color: "#333",
          }}
          onClick={handleClickToBackTransportRegister}
        >
          Quay lại
        </Button>
        <Button
          style={{ backgroundColor: "#333", color: "#fff" }}
          onClick={handleClickToNextSuccessRegister}
        >
          Tiếp theo
        </Button>
      </WrapperPositionButtonVendor>
    </div>
  );
};

export default RegisterTax;
