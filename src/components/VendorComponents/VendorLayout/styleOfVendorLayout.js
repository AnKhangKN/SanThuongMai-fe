import { Col, Row } from "antd";
import styled from "styled-components";

export const WrapperBody = styled(Row)`
  height: 100vh;
  min-height: 100vh;
  margin: 0;
  font-size: 14px;
  color: #333;
  background: #f6f6f6;
`;

export const WrapperColLeft = styled(Col)`
  width: 1232px;
  background: #fff;
  margin: 16px auto;
  -webkit-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 24px;
  text-align: center;
`;
