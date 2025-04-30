import axios from "axios";

export const getAllUsers = async (accessToken) => {
  console.log("accessToken", accessToken);

  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/admin/get-all-users`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};
