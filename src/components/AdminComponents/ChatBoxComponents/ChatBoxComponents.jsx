import React, { useEffect, useRef, useState } from "react";
import {
  ChatBody,
  ChatBoxWrapper,
  ChatContainer,
  ChatFooter,
  ChatHeader,
  MessageBubble,
  SendButton,
  Sidebar,
  UserItem,
} from "./style";
import { Input } from "antd";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import socket from "../../../utils/socket";
import { useSelector } from "react-redux";
import * as ValidateToken from "../../../utils/tokenUtils";
import * as ChatServices from "../../../services/shared/ChatServices";

const ChatBoxComponents = ({ onClose }) => {
  const [chatList, setChatList] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [receiverUserId, setReceiverUserId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState({});

  const user = useSelector((state) => state.user);
  const userId = user?.id;
  const chatEndRef = useRef(null);

  // Lấy danh sách chat
  const fetchChatList = async () => {
    try {
      const token = await ValidateToken.getValidAccessToken();
      if (!token) return;
      const res = await ChatServices.getChat(token);
      setChatList(res);
    } catch (err) {
      console.error("❌ fetchChatList:", err);
    }
  };

  // Gọi khi chọn user để chat
  const handleSelectChatRoom = (receiverId) => {
    setReceiverUserId(receiverId);
    socket.emit("joinRoom", { senderId: userId, receiverId });
  };

  // Khi đã join room (từ server trả về chatId)
  useEffect(() => {
    const handleJoinedRoom = async ({ chatId }) => {
      setChatRoomId(chatId);
      await fetchMessages(chatId);
    };

    socket.on("joinedRoom", handleJoinedRoom);
    return () => socket.off("joinedRoom", handleJoinedRoom);
  }, []);

  const fetchMessages = async (chatId) => {
    try {
      const token = await ValidateToken.getValidAccessToken();
      if (!token) return;
      const res = await ChatServices.getMessagesHistory(token, { chatId });
      setMessages((prev) => ({ ...prev, [chatId]: res || [] }));
      scrollToBottom();
    } catch (err) {
      console.error("❌ fetchMessages:", err);
    }
  };

  // Nhận tin nhắn
  useEffect(() => {
    const handleReceiveMessage = ({ chatId, text, senderId }) => {
      setMessages((prev) => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), { text, senderId }],
      }));
      scrollToBottom();
    };

    socket.on("receiveMessage", handleReceiveMessage);
    return () => socket.off("receiveMessage", handleReceiveMessage);
  }, []);

  // Cập nhật danh sách chat khi có refresh
  useEffect(() => {
    fetchChatList();
    const handleRefresh = () => fetchChatList();
    socket.on("refreshChatList", handleRefresh);
    return () => socket.off("refreshChatList", handleRefresh);
  }, []);

  // Room riêng
  useEffect(() => {
    if (socket) {
      socket.emit("setup", userId); // Join vào room riêng của mình
    }
  }, [socket, userId]);

  const handleSend = async () => {
    if (!inputValue.trim() || !chatRoomId) return;

    const text = inputValue.trim();
    const payload = {
      senderId: userId,
      receiverId: receiverUserId,
      chatId: chatRoomId,
      text,
    };

    try {
      const token = await ValidateToken.getValidAccessToken();
      if (!token) return;
      await ChatServices.sendMessage(token, payload);
      socket.emit("sendMessage", payload);

      setInputValue("");
      scrollToBottom();
    } catch (err) {
      console.error("❌ Gửi tin nhắn thất bại:", err);
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getDisplayName = (u) => u.fullName?.trim() || u.email;
  const currentMessages = messages[chatRoomId] || [];

  return (
    <ChatBoxWrapper>
      <Sidebar>
        {chatList.map((u) => (
          <UserItem
            key={u._id}
            active={u._id === receiverUserId}
            onClick={() => handleSelectChatRoom(u._id)}
          >
            <div>
              <strong>{getDisplayName(u)}</strong>
              <br />
              <small>{u.email}</small>
            </div>
          </UserItem>
        ))}
      </Sidebar>

      <ChatContainer>
        <ChatHeader>
          <span>
            {chatList.find((u) => u._id === receiverUserId)?.fullName || "Chat"}
          </span>
          <FaTimes style={{ cursor: "pointer" }} onClick={onClose} />
        </ChatHeader>

        <ChatBody>
          {currentMessages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent:
                  msg.senderId === userId ? "flex-end" : "flex-start",
              }}
            >
              <MessageBubble isSender={msg.senderId === userId}>
                {msg.text}
              </MessageBubble>
            </div>
          ))}
          <div ref={chatEndRef} />
        </ChatBody>

        <ChatFooter>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Nhập tin nhắn..."
            onPressEnter={handleSend}
          />
          <SendButton onClick={handleSend}>
            <FaPaperPlane />
          </SendButton>
        </ChatFooter>
      </ChatContainer>
    </ChatBoxWrapper>
  );
};

export default ChatBoxComponents;
