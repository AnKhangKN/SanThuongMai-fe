import axios from "axios";
export const axiosJWT = axios.create();

export const signupUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/shared/auth/signup`,
    data
  );
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/shared/auth/login`,
    data,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const refreshToken = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/shared/auth/token/refresh`,
    {},
    {
      withCredentials: true,
    }
  );

  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/shared/auth/logout`
  );
  return res.data;
};

export const getDetailUser = async (id, accessToken) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/customer/get-detail-account/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

export const forgetPassword = async (email) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/shared/forget-password`,
      { email } // Đúng định dạng gửi email trong đối tượng
    );

    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Error in forgetPassword:", error);
    throw error; // Ném lại lỗi để xử lý bên ngoài
  }
};
