import axios from "axios";

export const createUserVendor = async (accessToken, UserVendorData) => {
  const userId = UserVendorData.user_id; // Lấy user_id từ dữ liệu gửi lên

  return await axios.put(
    `${process.env.REACT_APP_API_URL}/vendor/add-vendor/${userId}`,
    UserVendorData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
