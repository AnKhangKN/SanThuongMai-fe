import axios from "axios";

// Lấy tất cả địa chỉ giao hàng của khách hàng
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

// Thêm một địa chỉ giao hàng mới cho khách hàng
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

export const addPayment = async (
  accessToken,
  shippingInfo,
  items,
  totalBill,
  paymentMethod
) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/customer/order-product`,
      { shippingInfo, items, totalBill, paymentMethod },
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
