import axios from "axios";

export const getDetailShop = async (owner_id) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/customer/get-detail-shop/${owner_id}`
    );
    return res.data;
  } catch (error) {
    console.error("Failed to fetch search products:", error);
    throw error;
  }
};
