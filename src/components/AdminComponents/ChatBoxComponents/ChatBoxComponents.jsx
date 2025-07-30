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
  const [refreshChatList, setRefreshChatList] = useState(0);
  const { chatList = [], loading, error } = useChatList(refreshChatList);

  const user = useSelector((state) => state.user);
  const userId = user?.id;
  const chatEndRef = useRef(null);

  const [chatRoomId, setChatRoomId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState({});
  const [receiverUserId, setReceiverUserId] = useState(null);

  const {
    messages: historyMessages,
    loading: loadingMessages,
    error: errorMessages,
  } = useMessageHistory({ chatId: chatRoomId });

  // Load lịch sử tin nhắn khi đổi chatRoomId
  useEffect(() => {
    if (!chatRoomId || !historyMessages) return;

    setMessages((prev) => ({
      ...prev,
      [chatRoomId]: historyMessages.map((msg) => ({
        text: msg.text,
        senderId: msg.senderId, // giữ lại
      })),
    }));
  }, [chatRoomId, historyMessages]);

  // Scroll to latest message
  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatRoomId]);

  // Join user-specific room
  useEffect(() => {
    if (socket && userId && chatList.length > 0) {
      const chatIds = chatList.map((chat) => chat.chatId).filter(Boolean);
      socket.emit("joinRooms", { userId, chatIds });
    }
  }, [socket, userId, chatList]);

  // Receive message handler
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      console.log("📥 [socket] receiveMessage:", data);

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

  useEffect(() => {
    const handleMessageSent = ({ senderId, receiverId }) => {
      console.log("📩 messageSent received:", {
        senderId,
        receiverId,
      });

      // Trigger reload danh sách chat
      setRefreshChatList((prev) => prev + 1);
    };

    socket.on("messageSent", handleMessageSent);

    return () => {
      socket.off("messageSent", handleMessageSent);
    };
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const text = inputValue.trim();
    const senderId = userId;
    const receiverId = receiverUserId;
    const chatId = chatRoomId;

    try {
      const accessToken = await ValidateToken.getValidAccessToken();
      if (!accessToken) throw new Error("No access token");

      const payload = {
        senderId,
        receiverId,
        chatId,
        text,
      };

      // Nếu có chatId thì thêm vào payload
      if (chatId) {
        payload.chatId = chatId;
      }

      await ChatServices.sendMessage(accessToken, payload); // Gửi tin nhắn
      setRefreshChatList((prev) => prev + 1);

      socket.emit("sendMessage", { senderId, receiverId, chatId, text });

      socket.emit("messageSent", { senderId, receiverId });

      setMessages((prev) => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), { text, senderId, chatId }],
      }));

      scrollToBottom();

      setInputValue("");
    } catch (err) {
      console.error("❌ Gửi tin nhắn thất bại:", err);
    }
  };

  const handleSelectChatRoom = (chatId, receiverId) => {
    setReceiverUserId(receiverId);
    setChatRoomId(chatId);
  };

  const getDisplayName = (user) => {
    return user.fullName?.trim() || user.email;
  };

  const selectChatRoom = chatList.find((u) => u.chatId === chatRoomId);

  console.log(chatList);

  return (
    <ChatBoxWrapper>
      {/* Sidebar: User List */}
      <Sidebar>
        {chatList.map((u) => (
          <UserItem
            key={u.chatId}
            active={u.chatId === selectChatRoom}
            onClick={() => handleSelectChatRoom(u.chatId, u._id)}
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
          <span>
            {selectChatRoom ? getDisplayName(selectChatRoom) : "Chat"}
          </span>
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
