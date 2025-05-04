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

export const getAllProducts = async (accessToken) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/vendor/get-all-product`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const updatedProduct = async (accessToken, productData) => {
  const userId = productData.user_id;
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/vendor/update-product/${userId}`,
    productData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
