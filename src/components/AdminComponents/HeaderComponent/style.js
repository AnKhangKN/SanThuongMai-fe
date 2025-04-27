import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid #f2f4f7;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  font-size: 26px;
  cursor: pointer;
  &:hover {
    color: #878ff5;
  }
`;

export const AccountText = styled.p`
  position: relative;
  color: rgb(155, 155, 155);
  margin-right: 20px;
  &::after {
    content: "";
    position: absolute;
    top: 6px;
    right: -20px;
    display: block;
    width: 7px;
    height: 8px;
    border-right: 0.5px solid rgb(155, 155, 155);
    border-bottom: 0.5px solid rgb(155, 155, 155);
    transform: rotate(45deg);
  }
`;
