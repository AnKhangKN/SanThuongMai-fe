// ImageServices.js
import axios from "axios";

// Hàm tải lên ảnh
export const uploadAvatar = async (token, formData) => {
  try {
    // Gửi yêu cầu POST để tải lên ảnh
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/customer/upload-avatar`, // Đường dẫn API tải ảnh
      formData, // Dữ liệu FormData
      {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
          "Content-Type": "multipart/form-data", // Đảm bảo gửi dưới dạng multipart
        },
      }
    );

    // Trả về kết quả từ server
    return response.data;
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw error; // Ném lỗi ra ngoài để xử lý ở nơi gọi
  }
};
