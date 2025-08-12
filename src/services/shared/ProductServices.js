import axios from "axios";

export const getAllProducts = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/shared/get-all-products`
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDetailProduct = async (idProduct) => {
  const id = idProduct.id;

  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/shared/get-detail-product/${id}`
  );
  return res.data;
};

export const getSearchProducts = async (keyword) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/shared/search-products`,
      {
        params: { keyword }, // truyền keyword dưới dạng query string
      }
    );
    return res.data;
  } catch (error) {
    console.error("Failed to fetch search products:", error);
    throw error;
  }
};

export const getAllTopSearch = async (accessToken) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/shared/top-search-product`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Failed to fetch search products:", error);
    throw error;
  }
};

export const getAllCategoryHome = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/shared/get-all-categories-home`
    );
    return res.data;
  } catch (error) {
    console.error("Failed to fetch search products:", error);
    throw error;
  }
};

export const getSearchCategory = async (categoryId) => {
  console.log(categoryId);
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/shared/search-category/${categoryId}`
    );
    return res.data;
  } catch (error) {
    console.error("Failed to fetch search products:", error);
    throw error;
  }
};

export const getTopCartProducts = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/shared/get-top-cart`
    );
    return res.data;
  } catch (error) {
    console.error("Failed to fetch search products:", error);
    throw error;
  }
};

export const getSuggestProduct = async (productId) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/ai/products/suggest/${productId}`
    );
    return res.data;
  } catch (error) {
    console.error("Failed to fetch search products:", error);
    throw error;
  }
};

export const getSuggestSearchKeyWord = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/shared/suggest/search`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
