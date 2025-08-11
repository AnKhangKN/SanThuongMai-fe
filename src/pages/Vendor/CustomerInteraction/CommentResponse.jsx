import React, { useState, useEffect, useRef } from "react";
import { Input, Button, Avatar, Typography, Card, List } from "antd";
import socket from "../../../utils/socket";
import { useSelector } from "react-redux";
import * as ValidateToken from "../../../utils/tokenUtils";
import * as ChatServices from "../../../services/shared/ChatServices";

const { Text } = Typography;
const { TextArea } = Input;

const CommentResponse = () => {
  const [chatList, setChatList] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [receiverUserId, setReceiverUserId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState({});
  const [selectedChat, setSelectedChat] = useState(null);

  const chatEndRef = useRef(null);
  const user = useSelector((state) => state.user);
  const userId = user?.id;

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

  // Chọn cuộc trò chuyện
  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setReceiverUserId(chat._id);

    console.log(chat);
    socket.emit("joinRoom", { senderId: userId, receiverId: chat._id });
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
    socket.on("refreshChatList", fetchChatList);
    return () => socket.off("refreshChatList", fetchChatList);
  }, []);

  // Room riêng của mình
  useEffect(() => {
    if (socket) {
      socket.emit("setup", userId);
    }
  }, [userId]);

  // Gửi tin nhắn
  const handleSend = async () => {
    if (!newMessage.trim() || !chatRoomId) return;

    const text = newMessage.trim();
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

      setNewMessage("");
      scrollToBottom();
    } catch (err) {
      console.error("❌ Gửi tin nhắn thất bại:", err);
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const currentMessages = chatRoomId ? messages[chatRoomId] || [] : [];

  return (
    <div
      style={{ display: "flex", height: "80vh", maxWidth: 900, margin: "auto" }}
    >
      {/* Danh sách chat bên trái */}
      <Card style={{ width: 250, padding: 0, overflowY: "auto" }}>
        <List
          itemLayout="horizontal"
          dataSource={chatList}
          renderItem={(chat) => (
            <List.Item
              style={{
                cursor: "pointer",
                background:
                  selectedChat?._id === chat._id ? "#e6f7ff" : "transparent",
                padding: "8px 12px",
              }}
              onClick={() => handleSelectChat(chat)}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={chat.avatar || "https://joeschmoe.io/api/v1/random"}
                  />
                }
                title={chat.fullName}
                description={chat.lastMessage || "Chưa có tin nhắn"}
              />
            </List.Item>
          )}
        />
      </Card>

      {/* Khung chat bên phải */}
      <Card
        title={selectedChat ? selectedChat.fullName : "Chọn cuộc trò chuyện"}
        style={{
          flex: 1,
          marginLeft: 10,
          display: "flex",
          flexDirection: "column",
        }}
        bodyStyle={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: 0,
        }}
      >
        {/* Nội dung tin nhắn */}
        <div
          style={{
            flex: 1,
            padding: 10,
            overflowY: "auto",
            background: "#f0f2f5",
          }}
        >
          {currentMessages.length > 0 ? (
            currentMessages.map((msg, index) => {
              const isMine =
                msg.senderId?._id === userId || msg.senderId === userId;
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: isMine ? "row-reverse" : "row",
                    marginBottom: 10,
                  }}
                >
                  <Avatar
                    src={
                      msg.senderId?.avatar ||
                      "https://joeschmoe.io/api/v1/random"
                    }
                  />
                  <div
                    style={{
                      background: isMine ? "#0084ff" : "#e4e6eb",
                      color: isMine ? "#fff" : "#000",
                      padding: "8px 12px",
                      borderRadius: 18,
                      maxWidth: "70%",
                      margin: isMine ? "0 10px 0 0" : "0 0 0 10px",
                    }}
                  >
                    <div>{msg.text}</div>
                    <Text
                      style={{ fontSize: 10, opacity: 0.7, display: "block" }}
                    >
                      {msg.createdAt
                        ? new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </Text>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: "center", marginTop: 20, color: "#888" }}>
              {selectedChat ? "Chưa có tin nhắn" : "Chọn một cuộc trò chuyện"}
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Khung nhập tin nhắn */}
        {selectedChat && (
          <div
            style={{
              display: "flex",
              padding: 10,
              background: "#fff",
              borderTop: "1px solid #ddd",
            }}
          >
            <TextArea
              rows={1}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Nhập tin nhắn..."
              style={{ resize: "none" }}
              onPressEnter={(e) => {
                if (!e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button
              type="primary"
              onClick={handleSend}
              style={{ marginLeft: 8 }}
            >
              Gửi
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CommentResponse;
