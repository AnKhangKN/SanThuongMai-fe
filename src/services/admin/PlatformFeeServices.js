import axios from "axios";

// Lấy tất của chi phí nền tảng
export const getAllFees = async (accessToken) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/admin/get-all-fees`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

// Tạo chi phí nền tảng mới
export const createFee = async (accessToken, data) => {
  console.log(data);
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/admin/create-fee`,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};
