import styled from "styled-components";

export const ChatBoxWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const Sidebar = styled.div`
  width: 100px;
  background-color: #f8f9fa;
  border-right: 1px solid #ddd;
  padding: 8px 0;
  overflow-y: auto;
`;

export const UserItem = styled.div`
  padding: 10px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#e7f1ff" : "transparent")};
  font-size: 14px;
  text-align: center;

  &:hover {
    background-color: #e7f1ff;
  }
`;

export const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ChatHeader = styled.div`
  padding: 12px 16px;
  background-color: #007bff;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

export const ChatBody = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
`;

export const ChatFooter = styled.div`
  display: flex;
  padding: 10px 16px;
  border-top: 1px solid #ddd;
  background-color: #fff;
`;

export const Input = styled.input`
  flex: 1;
  border: 1px solid #ccc;
  padding: 8px 12px;
  border-radius: 20px;
  outline: none;
  font-size: 14px;
`;

export const SendButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  margin-left: 10px;
  padding: 8px 12px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
`;

export const MessageBubble = styled.div`
  background-color: ${(props) => (props.isSender ? "#007bff" : "#e1e1e1")};
  color: ${(props) => (props.isSender ? "white" : "black")};
  padding: 8px 12px;
  border-radius: 16px;
  margin-bottom: 8px;
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  max-width: 70%;
`;
