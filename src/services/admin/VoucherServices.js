import axios from "axios";

export const getVouchers = async (accessToken) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/vouchers`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createVoucher = async (accessToken, data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/admin/vouchers`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
