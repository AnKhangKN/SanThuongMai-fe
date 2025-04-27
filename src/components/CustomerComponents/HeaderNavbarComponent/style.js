import styled from "styled-components";

export const Wrapper = styled.div`
  line-height: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
`;

export const VendorText = styled.div`
  position: relative;
  margin: 0px 8px 0px 8px;
  padding: 0 8px 0px 8px;

  &::before {
    content: "";
    position: absolute;
    top: 9px;
    left: 0px;
    border-left: 0.5px solid #ccc;
    height: 15px;
    padding-left: 10px;
  }

  &::after {
    content: "";
    position: absolute;
    top: 9px;
    right: 0px;
    border-right: 0.5px solid #ccc;
    height: 15px;
    padding-left: 10px;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-right: 5px;
  cursor: pointer;
`;

// Notification
export const NotificationWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

export const ModalNotification = styled.div`
  position: absolute;
  top: 45px;
  right: 0px;
  background-color: #fff;
  width: 500px;
  color: #333;
  padding: 10px;
  visibility: hidden; /* Sử dụng visibility thay vì display: none */
  opacity: 0;
  z-index: 10;
  border-radius: 2px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.26);
  transition: opacity 0.3s ease, visibility 0.3s ease; /* Thêm transition cho opacity và visibility */

  ${NotificationWrapper}:hover & {
    visibility: visible; /* Hiển thị modal khi hover */
    opacity: 1;
  }

  &::before {
    position: absolute;
    right: 30px;
    top: -5px;
    content: "";
    width: 20px;
    height: 20px;
    background-color: #fff;
    transform: rotate(45deg);
  }
`;

// Information
export const InformationWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

export const ModalInformation = styled.div`
  position: absolute;
  top: 45px;
  background-color: #fff;
  display: flex;
  flex-flow: column;
  color: #333;
  padding: 10px;
  visibility: hidden; /* Sử dụng visibility thay vì display: none */
  opacity: 0;
  z-index: 10;
  width: 134px;
  right: 0px;
  border-radius: 2px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.26);
  transition: opacity 0.3s ease, visibility 0.3s ease; /* Thêm transition cho opacity và visibility */

  ${InformationWrapper}:hover & {
    visibility: visible; /* Hiển thị modal khi hover */
    opacity: 1;
  }

  &::before {
    position: absolute;
    right: 30px;
    top: -5px;
    content: "";
    width: 20px;
    height: 20px;
    background-color: #fff;
    transform: rotate(45deg);
  }
`;
