import axios from "axios";

export const createProduct = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/shared/sign-up`,
    data
  );
  return res.data;
};
