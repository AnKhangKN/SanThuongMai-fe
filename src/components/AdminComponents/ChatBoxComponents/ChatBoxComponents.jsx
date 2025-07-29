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
import useChatList from "../../../hook/useChatList";
import { useSelector } from "react-redux";
import useMessageHistory from "../../../hook/useMessagesHistory";
import * as ValidateToken from "../../../utils/tokenUtils";
import * as ChatServices from "../../../services/shared/ChatServices";

const ChatBoxComponents = ({ onClose }) => {
  const { chatList = [], loading, error } = useChatList();
  const user = useSelector((state) => state.user);
  const userId = user?.id;
  const chatEndRef = useRef(null);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState({});

  const {
    messages: historyMessages,
    loading: loadingMessages,
    error: errorMessages,
  } = useMessageHistory({ receiverId: selectedUserId });

  // Load lịch sử tin nhắn khi đổi selectedUserId
  useEffect(() => {
    if (!selectedUserId || !historyMessages) return;

    setMessages((prev) => ({
      ...prev,
      [selectedUserId]: historyMessages.map((msg) => ({
        text: msg.text,
        senderId: msg.senderId, // giữ lại
      })),
    }));
  }, [historyMessages, selectedUserId]);

  // Scroll to latest message
  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages[selectedUserId]]);

  // Set default selected chat
  useEffect(() => {
    if (chatList.length > 0 && !selectedUserId) {
      setSelectedUserId(chatList[0]._id);
    }
  }, [chatList]);

  console.log(chatList);

  // Join user-specific room
  useEffect(() => {
    if (socket && userId) {
      socket.emit("joinRoom", userId);
      console.log("🟢 Joined room:", userId);
    }
  }, [userId]);

  // Receive message handler
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      console.log("📥 [socket] receiveMessage:", data);

      // setMessages((prev) => ({
      //   ...prev,
      //   [data.senderId]: [...(prev[data.senderId] || []), data],
      // }));

      setMessages((prev) => ({
        ...prev,
        [data.chatId]: [...(prev[data.chatId] || []), data],
      }));
    };

    socket.on("receiveMessage", handleReceiveMessage);

    // 🧹 Cleanup để tránh gắn nhiều lần
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim() || !selectedUserId) return;

    const text = inputValue.trim();
    const senderId = userId;
    const receiverId = selectedUserId;

    try {
      const accessToken = await ValidateToken.getValidAccessToken();
      if (!accessToken) throw new Error("No access token");

      const payload = {
        senderId,
        receiverId,
        text,
      };

      // Nếu có chatId thì thêm vào payload
      if (historyMessages && historyMessages[0]?.chatId) {
        payload.chatId = historyMessages[0].chatId;
      }

      await ChatServices.sendMessage(accessToken, payload); // Gửi tin nhắn

      socket.emit("sendMessage", { senderId, receiverId, text }); // socket vẫn như cũ

      // setMessages((prev) => ({
      //   ...prev,
      //   [selectedUserId]: [...(prev[selectedUserId] || []), { text, senderId }],
      // }));

      setInputValue("");
    } catch (err) {
      console.error("❌ Gửi tin nhắn thất bại:", err);
    }
  };

  const handleSelectUser = (id) => {
    setSelectedUserId(id);
  };

  const getDisplayName = (user) => {
    return user.fullName?.trim() || user.email;
  };

  const selectedUser = chatList.find((u) => u._id === selectedUserId);

  return (
    <ChatBoxWrapper>
      {/* Sidebar: User List */}
      <Sidebar>
        {chatList.map((u) => (
          <UserItem
            key={u._id}
            active={u._id === selectedUserId}
            onClick={() => handleSelectUser(u._id)}
          >
            <div>
              <strong>{getDisplayName(u)}</strong>
              <br />
              <small>{u.email}</small>
            </div>
          </UserItem>
        ))}
      </Sidebar>

      {/* Chat Area */}
      <ChatContainer>
        <ChatHeader>
          <span>{selectedUser ? getDisplayName(selectedUser) : "Chat"}</span>
          <FaTimes style={{ cursor: "pointer" }} onClick={onClose} />
        </ChatHeader>
        {/*   (messages[selectedUserId] || []) */}
        <ChatBody>
          {(messages[historyMessages?.[0]?.chatId] || []).map((msg, index) => (
            <MessageBubble key={index} isSender={msg.senderId === userId}>
              {msg.text}
            </MessageBubble>
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
