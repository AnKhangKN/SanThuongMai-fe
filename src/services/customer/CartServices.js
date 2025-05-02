import axios from "axios";

export const addToCart = async (accessToken, payload, productId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/customer/add-to-cart/${productId}`,
      payload,
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

export const getAllItem = async (accessToken) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/customer/get-all-items`,
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

export const updateQuantity = async (accessToken, data) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/customer/update-quantity`,
      data,
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

export const deleteCartItem = async (accessToken, data) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/customer/delete-item`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: data,
      }
    );
    return response;
  } catch (error) {
    throw (
      error.response?.data || { status: "ERROR", message: "Request failed" }
    );
  }
};
