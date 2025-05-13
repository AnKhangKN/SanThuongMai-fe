import React from "react";
import VendorSteps from "../../../components/VendorComponents/VendorSteps/VendorSteps";
import {
  WrapperFormVendor,
  WrapperPositionButtonVendor,
  WrapperStepsPadding,
  WrapperStepsVendor,
  WrapperVendordescribeTransport,
  WrapperVendorItemTransport,
  WrapperVendorTextTransport,
} from "./styleTransport";
import { Button, Switch } from "antd";
import { useNavigate } from "react-router-dom";

const RegisterTransport = () => {
  const onChange = () => {};
  const navigate = useNavigate();

  const handleClickToNextTax = () => {
    navigate("/vendor/register-tax"); // Đường dẫn
  };

  const handleClickToBackForm = () => {
    navigate("/vendor/register-form");
  };
  return (
    <div>
      <WrapperStepsPadding>
        <WrapperStepsVendor>
          <VendorSteps current={1} />
        </WrapperStepsVendor>
      </WrapperStepsPadding>

      <WrapperStepsPadding>
        <WrapperFormVendor>
          <WrapperStepsPadding style={{ paddingLeft: 0 }}>
            <WrapperVendordescribeTransport>
              <div>
                <WrapperVendorTextTransport>
                  Phương thức vân chuyển
                </WrapperVendorTextTransport>
                <div style={{ color: "#999", display: "flex" }}>
                  Kích hoạt phương thức vận chuyển phù hợp
                </div>
              </div>
            </WrapperVendordescribeTransport>
          </WrapperStepsPadding>

          <div style={{ margin: "12px 0" }}>
            <WrapperVendorTextTransport>Hỏa Tốc</WrapperVendorTextTransport>
            <WrapperVendorItemTransport>
              <div>
                <span style={{ marginRight: "8px" }}>Hỏa Tốc</span>
                <span style={{ color: "red" }}>[COD đã được kích hoạt]</span>
              </div>

              <div>
                <Switch defaultChecked onChange={onChange} />
              </div>
            </WrapperVendorItemTransport>
          </div>

          <div style={{ margin: "12px 0" }}>
            <WrapperVendorTextTransport>Nhanh</WrapperVendorTextTransport>
            <WrapperVendorItemTransport>
              <div>
                <span style={{ marginRight: "8px" }}>Nhanh</span>
                <span style={{ color: "red" }}>[COD đã được kích hoạt]</span>
              </div>

              <div>
                <Switch defaultChecked onChange={onChange} />
              </div>
            </WrapperVendorItemTransport>
          </div>

          <div style={{ margin: "12px 0" }}>
            <WrapperVendorTextTransport>Tiếm Kiệm</WrapperVendorTextTransport>
            <WrapperVendorItemTransport>
              <div>
                <span style={{ marginRight: "8px" }}>Tiếm Kiệm</span>
                <span style={{ color: "red" }}>[COD đã được kích hoạt]</span>
              </div>

              <div>
                <Switch defaultChecked onChange={onChange} />
              </div>
            </WrapperVendorItemTransport>
          </div>

          <div style={{ margin: "12px 0" }}>
            <WrapperVendorTextTransport>
              Hành Cồng Kềnh
            </WrapperVendorTextTransport>
            <WrapperVendorItemTransport>
              <div>
                <span style={{ marginRight: "8px" }}>Hành Cồng Kềnh</span>
                <span style={{ color: "red" }}>[COD đã được kích hoạt]</span>
              </div>

              <div>
                <Switch defaultChecked onChange={onChange} />
              </div>
            </WrapperVendorItemTransport>
          </div>

          <WrapperVendordescribeTransport>
            <div>
              <WrapperVendorTextTransport>
                Thêm Đơn Vị Vân Chuyển
              </WrapperVendorTextTransport>
              <div style={{ color: "#999", display: "flex" }}>
                Lưu ý: KHN không hỗ trợ theo dõi quá trình cho các phương
                thức vận chuyển không có tích hợp và cũng sẽ không chịu trách
                nhiệm về bất kỳ sản phẩm nào bị thiếu hoặc hư hỏng.
              </div>
            </div>
          </WrapperVendordescribeTransport>
        </WrapperFormVendor>
      </WrapperStepsPadding>

      <WrapperPositionButtonVendor>
        <Button
          style={{
            marginRight: "10px",
            backgroundColor: "#fff",
            color: "#333",
          }}
          onClick={handleClickToBackForm}
        >
          Quay lại
        </Button>
        <Button
          style={{ backgroundColor: "#333", color: "#fff" }}
          onClick={handleClickToNextTax}
        >
          Tiếp theo
        </Button>
      </WrapperPositionButtonVendor>
    </div>
  );
};

export default RegisterTransport;
