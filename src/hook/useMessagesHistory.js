import { useEffect, useState } from "react";
import * as ChatServices from "../services/shared/ChatServices";
import * as ValidateToken from "../utils/tokenUtils";

const useMessageHistory = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!chatId) return;

      try {
        const accessToken = await ValidateToken.getValidAccessToken();
        const res = await ChatServices.getMessagesHistory(accessToken, {
          chatId,
        }); // 👈 truyền trực tiếp

        console.log("lịch sử trò chuyện: ", res);

        setMessages(res);
      } catch (err) {
        console.error("❌ Lỗi lấy lịch sử tin nhắn:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId]);

  return { messages, loading, error };
};

export default useMessageHistory;
