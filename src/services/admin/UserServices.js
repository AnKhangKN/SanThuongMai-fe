import axios from "axios";

// Cập nhật trạng thái khách hàng
export const partialUpdateUser = async (userId, dataUpdate, accessToken) => {

  // Chỉ cần truyền giá trị của dataUpdate vào trực tiếp
  const data = { account_status: dataUpdate };

  const res = await axios.patch(
    `${process.env.REACT_APP_API_URL}/admin/partial-update-user/${userId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

// Lấy tất của user
export const getAllUsers = async (accessToken) => {

  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/admin/get-all-users`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};
