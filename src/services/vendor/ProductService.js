import axios from "axios";

export const createProduct = async (accessToken, productData) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/vendor/add-product`,
    productData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
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

export const updateProduct = async (id, data, token) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/vendor/update-product`,
    { ...data, id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const searchProductByName = async (token, keyword) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/product/search-product?keyword=${keyword}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const filterProductsPrice = async (accessToken, minPrice, maxPrice) => {
  const params = new URLSearchParams();

  if (minPrice !== null && minPrice !== undefined)
    params.append("minPrice", minPrice);
  if (maxPrice !== null && maxPrice !== undefined)
    params.append("maxPrice", maxPrice);

  return await axios.get(
    `${
      process.env.REACT_APP_API_URL
    }/vendor/filter-by-price?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const updateProductImages = async (id, formData, token) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/vendor/update-product-image/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
