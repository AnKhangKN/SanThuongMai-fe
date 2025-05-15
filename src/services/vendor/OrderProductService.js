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
