import axios from "axios";

export const getAllCategory = async (accessToken) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/get-all-categories`,
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

export const createCategory = async (accessToken, payload) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/admin/categories`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(
      "Lỗi khi gọi API Category",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateCategory = async (accessToken, payload) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/admin/categories`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(
      "Lỗi khi gọi API Category",
      error.response?.data || error.message
    );
    throw error;
  }
};
