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
  line-height: 46px;
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

export const WrapperNotification = styled.div`
  position: relative;
`;

export const ModalNotification = styled.div`
  position: absolute;
  visibility: hidden;
  z-index: 20;
  background-color: #fff;
  top: 40px;
  right: 0px;
  padding: 10px;
  width: 300px;
  max-width: 300px;
  box-shadow: 0px 2px 6px 0px #b2b2b2;

  /* Hiển thị modal khi hover */
  ${WrapperNotification}:hover > & {
    visibility: visible;
  }

  &::before {
    content: "";
    right: 0px;
    top: -20px;
    position: absolute;
    height: 30px;
    width: 150px;
    z-index: 30;
  }
`;

export const WrapperChatBox = styled.div`
  position: relative;
`;

export const ModalChatBox = styled.div`
  position: absolute;
  visibility: hidden;
  z-index: 20;
  background-color: #fff;
  top: 40px;
  right: 0px;
  padding: 10px;
  width: 200px;
  box-shadow: 0px 2px 6px 0px #b2b2b2;

  ${WrapperChatBox}:hover > & {
    visibility: visible;
  }

  &::before {
    content: "";
    right: 0px;
    top: -20px;
    position: absolute;
    height: 30px;
    width: 150px;
  }
`;

export const WrapperInformation = styled.div`
  display: flex;
  font-size: 16px;
  align-items: center;
  position: relative;
`;

export const ModalInformation = styled.div`
  position: absolute;
  top: 55px;
  gap: 10px;
  right: 0px;
  display: flex;
  flex-flow: column;
  visibility: hidden;
  z-index: 20;
  background-color: #fff;
  padding: 10px;
  width: 150px;
  box-shadow: 0px 2px 6px 0px #b2b2b2;

  ${WrapperInformation}:hover > & {
    visibility: visible;
  }

  & > div {
    cursor: pointer;
  }
`;
