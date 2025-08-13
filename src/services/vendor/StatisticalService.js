import axios from "axios";

export const getVendorStatistics = async (token) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/vendor/statistics`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.data;
};
