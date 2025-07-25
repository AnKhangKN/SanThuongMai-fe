import axios from "axios";

export const getAllAddress = async (accessToken) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/customer/get-all-shipping-address`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data; // Trả về dữ liệu phản hồi khi thành công
  } catch (error) {
    // Ném lỗi từ phản hồi hoặc một thông báo lỗi mặc định nếu yêu cầu thất bại
    throw (
      error.response?.data || { status: "ERROR", message: "Request failed" }
    );
  }
};

export const addAddress = async (accessToken, payload) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/customer/add-shipping-addresses`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data; // Trả về dữ liệu phản hồi khi thành công
  } catch (error) {
    // Ném lỗi từ phản hồi hoặc một thông báo lỗi mặc định nếu yêu cầu thất bại
    throw (
      error.response?.data || { status: "ERROR", message: "Request failed" }
    );
  }
};

export const addPayment = async (accessToken, payload) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/customer/order-product`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data; // Trả về dữ liệu phản hồi khi thành công
  } catch (error) {
    // Ném lỗi từ phản hồi hoặc một thông báo lỗi mặc định nếu yêu cầu thất bại
    throw (
      error.response?.data || { status: "ERROR", message: "Request failed" }
    );
  }
};

export const getAllOrderByStatus = async (accessToken, keyword) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/customer/get-all-order`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Đảm bảo có header Authorization
        },
        params: { keyword }, // Truyền `keyword` dưới dạng query string
      }
    );
    return res.data;
  } catch (error) {
    console.error("Failed to fetch search products:", error);
    throw error;
  }
};

export const successfulDelivered = async (accessToken, data) => {
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/customer/successful-delivered`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Đảm bảo có header Authorization
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Failed to fetch search products:", error);
    throw error;
  }
};

export const cancelledOrder = async (accessToken, data) => {
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/customer/cancel-order`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Đảm bảo có header Authorization
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Failed to fetch search products:", error);
    throw error;
  }
};

export const removeShippingAddress = async (accessToken, data) => {
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/customer/remove-shipping-address`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Đảm bảo có header Authorization
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Failed to fetch search products:", error);
    throw error;
  }
};
