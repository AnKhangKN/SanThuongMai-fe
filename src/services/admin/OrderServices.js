import axios from "axios";

export const getAllOrder = async (accessToken) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/admin/get-all-order`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

export const setStatusOrder = async (accessToken, data) => {
  const res = await axios.patch(
    `${process.env.REACT_APP_API_URL}/admin/set-status-order`,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};
