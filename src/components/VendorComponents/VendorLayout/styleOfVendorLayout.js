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

export const WrapperColCenter = styled(Col)`
  width: 100%;
  background: #fff;
  margin: 64px 50px 16px auto;
  -webkit-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 24px;
  text-align: center;
`;

export const WrapperColRight = styled(Col)`
  flex: 0;
  margin: 58px 0px 24px 0px;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
`;

export const WrapperColLeft = styled(Col)`
  background: #fff;
  margin: 64px 0 16px 0;
  -webkit-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 92vh;
  overflow-y: auto;
  z-index: 100;
`;
