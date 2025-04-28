import axios from "axios";

export const getAllUsers = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/admin/get-all-users`
  );
  return res.data;
};
