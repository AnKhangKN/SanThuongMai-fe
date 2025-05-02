import axios from "axios";

export const createProduct = async (accessToken, productData) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/vendor/add-product`,
    productData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const getAllProduct = async (accessToken) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/vendor/getAll-product`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
