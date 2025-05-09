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

// Cập nhật chi phí nên tảng
export const updateFee = async (accessToken, id, data) => {
  const res = await axios.patch(
    `${process.env.REACT_APP_API_URL}/admin/update-fee/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};
