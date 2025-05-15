import axios from "axios";

// Thêm một địa chỉ giao hàng mới cho khách hàng
export const addWishlist = async (accessToken, payload) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/customer/add-wish-list`,
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

export const updateUser = async (accessToken, payload) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/customer/partial-update`,
      { payload },
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

export const removeWishList = async (accessToken, payload) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/customer/remove-wish-list`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { status: "ERROR", message: "Request failed" }
    );
  }
};
