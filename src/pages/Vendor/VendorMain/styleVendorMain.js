import { Row } from "antd";
import styled from "styled-components";

export const WrapperVendor = styled(Row)`
  width: 100%;
  mix-height: 100vh;
  max-height: 500vh;
`;

export const WrapperVendorMainItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const WrapperVendorTextMain = styled.h1`
  display: flex;
  align-items: center;
  justify-content: start;
  font-weight: 400;
  margin-left: 18px;
`;

export const WrapperVendorMain = styled.div`
  padding: 0 14px;
`;

export const WrapperItemNumber = styled.div`
  margin-bottom: 4px;
  font-size: 20px;
  line-height: 28px;
  color: #2673dd;
  font-weight: 500;
  font-weight: var(--font-weight);
`;

export const WrapperItemText = styled.div`
  overflow: hidden;
  font-size: 12px;
  line-height: 16px;
  max-height: 32px;
  color: #333;
`;

export const WrapperVendorBackgroundItem = styled.div`
  border-radius: 14px;
  padding: 14px 40px;
  &:hover {
    background-color: #f6f6f6;
  }
`;
