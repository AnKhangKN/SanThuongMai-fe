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

export const getVendorInfo = async (accessToken) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/vendor/get-vendor`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

export const updateUserVendor = async (accessToken, updatedData) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_URL}/vendor/update-vendor`,
    updatedData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};

export const updateVendorAvatar = async (accessToken, formData) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_URL}/vendor/update-avatar-vendor`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};
