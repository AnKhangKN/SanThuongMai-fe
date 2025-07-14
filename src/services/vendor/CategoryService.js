import axios from "axios";

export const getAllCategory = async (accessToken) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/vendor/get-all-category`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
