import React from "react";
import { Button } from "antd";
import {
  WrapperRegister,
  WrapperRegisterTextDescribe,
  WrapperRegisterTextWelcome,
  WrapperStepsPadding,
  WrapperStepsVendor,
} from "./styleSuccess";
import { useNavigate } from "react-router-dom";
import { CheckCircleFilled } from "@ant-design/icons";
import VendorSteps from "../../../components/VendorComponents/VendorSteps/VendorSteps";

const SuccessRegister = () => {
  const navigate = useNavigate();

  const handleClickTobackVendorMain = () => {
    navigate("/vendor"); // Đường dẫn bạn muốn chuyển đến
  };
  return (
    <div>
      <WrapperStepsPadding>
        <WrapperStepsVendor>
          <VendorSteps current={3} />
        </WrapperStepsVendor>
      </WrapperStepsPadding>

      <WrapperRegister>
        <div>
          <CheckCircleFilled style={{ fontSize: "100px", color: "#55cc77" }} />
        </div>
        <WrapperRegisterTextWelcome>
          Đăng kí thành công
        </WrapperRegisterTextWelcome>
        <WrapperRegisterTextDescribe>
          Hãy đăng bán sản phẩm đầu tiên để để khởi động hàng trình bán hàng
          cùng HKN nhé
        </WrapperRegisterTextDescribe>
        <Button
          type="primary"
          style={{ backgroundColor: "#f6f6f6", color: "#000" }}
          onClick={handleClickTobackVendorMain}
        >
          Đi đến trang bán hàng
        </Button>
      </WrapperRegister>
    </div>
  );
};

export default SuccessRegister;
