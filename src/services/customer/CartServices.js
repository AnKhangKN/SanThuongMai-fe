import axios from "axios";

export const addToCart = async (accessToken, itemData, quantity, productId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/customer/add-to-cart/${productId}`,
      { itemData, quantity },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { status: "ERROR", message: "Request failed" }
    );
  }
};
