import axios from "axios";
export const axiosJWT = axios.create();

export const signupUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/shared/sign-up`,
    data
  );
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/shared/login`,
    data,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const refreshToken = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/shared/refresh-token`,
    {},
    {
      withCredentials: true,
    }
  );

  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/shared/logout`
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
