import axios from "axios";

// Lấy tất của user
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

// Duyệt shops
export const partialUpdateShop = async (userId, dataUpdate, accessToken) => {
  const data = { shop: { status: dataUpdate } };

  const res = await axios.patch(
    `${process.env.REACT_APP_API_URL}/admin/partial-update-shop/${userId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};
