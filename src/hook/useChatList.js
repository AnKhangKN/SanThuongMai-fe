// hooks/useChatList.ts
import { useEffect, useState } from "react";
import * as ChatServices from "../services/shared/ChatServices";
import * as ValidateToken from "../utils/tokenUtils";

const useChatList = (refreshTrigger) => {
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const accessToken = await ValidateToken.getValidAccessToken();
        if (!accessToken) throw new Error("No access token");

        const res = await ChatServices.getChat(accessToken);

        setChatList(res); // Chat đã populate thông tin user
      } catch (err) {
        console.error("Failed to fetch chats:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [refreshTrigger]); // thêm dependency ở đây

  return { chatList, loading, error };
};

export default useChatList;
