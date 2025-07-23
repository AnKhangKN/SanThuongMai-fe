import axios from "axios";

// Lấy tất cả các shops
export const getAllShops = async (accessToken) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/admin/get-all-shops`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

// Duyệt trạng thái shops
export const activateShop = async (payload, accessToken) => {
  const res = await axios.patch(
    `${process.env.REACT_APP_API_URL}/admin/shops`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};
