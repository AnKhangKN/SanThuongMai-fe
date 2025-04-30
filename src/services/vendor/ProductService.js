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
