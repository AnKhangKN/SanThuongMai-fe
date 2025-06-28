import axios from "axios";

export const getAllHome = async (accessToken) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/get-all-home`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(
      "Lỗi khi gọi API getAllHome:",
      error.response?.data || error.message
    );
    throw error;
  }
};
