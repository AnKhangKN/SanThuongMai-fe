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
