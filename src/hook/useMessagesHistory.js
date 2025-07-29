import { useEffect, useState } from "react";
import * as ChatServices from "../services/shared/ChatServices";
import * as ValidateToken from "../utils/tokenUtils";

const useMessageHistory = ({ receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!receiverId) return;

      try {
        const accessToken = await ValidateToken.getValidAccessToken();
        const res = await ChatServices.getMessagesHistory(accessToken, {
          receiverId,
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
  }, [receiverId]);

  return { messages, loading, error };
};

export default useMessageHistory;
