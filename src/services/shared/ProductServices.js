import axios from "axios";

export const getAllProducts = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/shared/get-all-products`
  );
  return res.data;
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

export const getAllTopSearch = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/shared/top-search-product`
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

export const getSearchCategory = async (keyword) => {
  console.log(keyword);

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/shared/search-category`,
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
