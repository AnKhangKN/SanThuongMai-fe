import React from 'react';
import { Steps } from "antd";

const { Step } = Steps;

const steps = [
  { title: "Thông tin Shop" },
  { title: "Cài đặt vận chuyển" },
  { title: "Thông tin thuế" },
  { title: "Hoàn tất" },
];



const VendorSteps = (props) => {
  const {
    current,
  } = props
  return (
    <Steps current={current} size="small">
      {steps.map((step, index) => (
        <Step key={index} title={step.title} />
      ))}
    </Steps>
  );
};

export default VendorSteps