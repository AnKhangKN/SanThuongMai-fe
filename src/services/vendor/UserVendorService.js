import axios from "axios";

export const createUserVendor = async (accessToken, formData) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/vendor/add-vendor`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
