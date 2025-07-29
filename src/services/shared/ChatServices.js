import axios from "axios";

export const getChat = async (accessToken) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/shared/chats`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log("Error fetching chat:", error);
    throw error; // nếu cần xử lý bên ngoài
  }
};

export const sendMessage = async (accessToken, payload) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/shared/chats`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log("Error fetching chat:", error);
    throw error; // nếu cần xử lý bên ngoài
  }
};

export const getMessagesHistory = async (accessToken, receiverId) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/shared/messages/history`,
      {
        params: { receiverId }, // 👈 phải nằm trong `params`
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log("Error fetching chat:", error);
    throw error;
  }
};
