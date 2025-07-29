import styled from "styled-components";

export const ModalChatBox = styled.div`
  position: fixed;
  bottom: 60px;
  right: 60px;
  width: 350px;
  height: 500px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  z-index: 1000;
`;

export const ChatButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: 80px;
  z-index: 999;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
