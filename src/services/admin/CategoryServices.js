import axios from "axios";

export const getAllCategory = async (accessToken) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/categories`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(
      "Lỗi khi gọi API get All Category",
      error.response?.data || error.message
    );
    throw error;
  }
};
