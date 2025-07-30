import axios from "axios";

export const getAllOrders = async (accessToken) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/vendor/get-all-order`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const changeStatusOrder = async (accessToken, itemId) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/vendor/change-status`,
    { itemId }, // gửi itemId thay vì orderId
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const getBuyers = async (accessToken) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/vendor/get-buyers`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
