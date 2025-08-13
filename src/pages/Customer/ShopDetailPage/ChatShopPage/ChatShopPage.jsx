import React, { useEffect, useRef, useState } from "react";
import ShopDetailPage from "../ShopDetailPage";
import { useParams } from "react-router-dom";
import * as ShopServices from "../../../../services/customer/ShopServices";
import { message } from "antd";
import { useSelector } from "react-redux";
import socket from "../../../../utils/socket";
import * as ValidateToken from "../../../../utils/tokenUtils";
import * as ChatServices from "../../../../services/shared/ChatServices";

const ChatShopPage = () => {
  const [input, setInput] = useState("");
  const [owner, setOwner] = useState({});
  const [chatRoomId, setChatRoomId] = useState(null);
  const [receiverUserId, setReceiverUserId] = useState(null);
  const [messages, setMessages] = useState([]); // Đổi thành array vì chat 1-1

  const user = useSelector((state) => state.user);
  const userId = user?.id;
  const chatEndRef = useRef(null);

  const { id } = useParams();

  // Khi đã có owner và userId -> join room luôn
  useEffect(() => {
    if (owner._id && userId) {
      setReceiverUserId(owner._id);
      socket.emit("joinRoom", { senderId: userId, receiverId: owner._id });
    }
  }, [owner, userId]);

  // Lắng nghe server confirm đã join room
  useEffect(() => {
    const handleJoinedRoom = async ({ chatId }) => {
      setChatRoomId(chatId);
      await fetchMessages(chatId);
    };

    socket.on("joinedRoom", handleJoinedRoom);
    return () => socket.off("joinedRoom", handleJoinedRoom);
  }, []);

  // Lấy lịch sử tin nhắn
  const fetchMessages = async (chatId) => {
    try {
      const token = await ValidateToken.getValidAccessToken();
      if (!token) return;
      const res = await ChatServices.getMessagesHistory(token, { chatId });
      setMessages(res || []); // Lưu array
      scrollToBottom();
    } catch (err) {
      console.error("❌ fetchMessages:", err);
    }
  };

  // Lắng nghe tin nhắn mới
  useEffect(() => {
    const handleReceiveMessage = ({ chatId, text, senderId }) => {
      // Nếu chatId trùng với phòng hiện tại thì mới append
      if (chatId === chatRoomId) {
        setMessages((prev) => [...prev, { text, senderId }]);
        scrollToBottom();
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);
    return () => socket.off("receiveMessage", handleReceiveMessage);
  }, [chatRoomId]);

  // Gửi tin nhắn
  const handleSend = async () => {
    if (!input.trim() || !chatRoomId) return;

    const text = input.trim();
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

      // setMessages((prev) => [...prev, { text, senderId: userId }]);
      setInput("");
      scrollToBottom();
    } catch (err) {
      console.error("❌ Gửi tin nhắn thất bại:", err);
    }
  };

  // Scroll xuống cuối khi có tin nhắn mới
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Lấy thông tin shop
  const fetchDetailShop = async (id) => {
    try {
      const data = await ShopServices.getDetailShop(id);
      const ownerData = data?.data?.data?.owner;
      setOwner(ownerData);
    } catch (error) {
      console.error("Error fetching shop details:", error);
      message.error(
        error?.response?.data?.message || "Failed to fetch shop details."
      );
    }
  };

  useEffect(() => {
    fetchDetailShop(id);
  }, [id]);

  return (
    <ShopDetailPage>
      <div
        style={{
          display: "flex",
          fontSize: "14px",
          flexDirection: "column",
          height: "80vh",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "10px",
            backgroundColor: "#f5f5f5",
            borderBottom: "1px solid #ddd",
            fontWeight: "bold",
          }}
        >
          Chat với {owner.fullName || owner.email}
        </div>

        {/* Danh sách tin nhắn */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {messages.map((msg, index) => {
            const isMe = msg.senderId === userId;
            return (
              <div
                key={index}
                style={{
                  alignSelf: isMe ? "flex-end" : "flex-start",
                  backgroundColor: isMe ? "#4cafef" : "#eee",
                  color: isMe ? "#fff" : "#000",
                  padding: "8px 12px",
                  borderRadius: "16px",
                  maxWidth: "60%",
                  wordBreak: "break-word",
                }}
              >
                {msg.text}
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Ô nhập */}
        <div
          style={{
            display: "flex",
            padding: "10px",
            borderTop: "1px solid #ddd",
            gap: "8px",
          }}
        >
          <input
            style={{
              flex: 1,

              padding: "8px 20px",
              border: "1px solid #ccc",
              borderRadius: "20px",
            }}
            placeholder="Nhập tin nhắn..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "#4cafef",
              color: "#fff",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
            }}
            onClick={handleSend}
          >
            Gửi
          </button>
        </div>
      </div>
    </ShopDetailPage>
  );
};

export default ChatShopPage;
