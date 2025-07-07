import * as AuthServices from "../services/shared/AuthServices";
import { jwtDecode } from "jwt-decode";

export const getValidAccessToken = async () => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) return null;

    const decoded = jwtDecode(token);

    if (decoded?.exp < Date.now() / 1000) {
      const res = await AuthServices.refreshToken();
      const newToken = res?.access_token;

      if (newToken) {
        localStorage.setItem("access_token", newToken);
        return newToken;
      } else {
        AuthServices.logoutUser(); // Nếu không có new token thì logout
        return null;
      }
    }

    return token;
  } catch (error) {
    console.log(error);
    AuthServices.logoutUser(); // Xử lý logout nếu lỗi
    return null;
  }
};
