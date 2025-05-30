import React, { useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes/index";
import CustomerLayout from "./components/CustomerComponents/CustomerLayout/CustomerLayout";
import AdminLayout from "./components/AdminComponents/AdminLayout/AdminLayout";
import VendorLayout from "./components/VendorComponents/VendorLayout/VendorLayout";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import * as AuthServices from "./services/shared/AuthServices";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/slices/userSlice";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // Chú ý: Các hàm phải gọi trước hi sử dụng trong useEffect
  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  const handleGetDetailUser = useCallback(
    async (id, accessToken) => {
      const res = await AuthServices.getDetailUser(id, accessToken);
      dispatch(updateUser({ ...res?.data, access_token: accessToken }));
    },
    [dispatch]
  );

  useEffect(() => {
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData);
    }
  }, [handleGetDetailUser]);

  // Setup Interceptor
  AuthServices.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await AuthServices.refreshToken();

        config.headers["Authorization"] = `Bearer ${data?.access_token}`;

        localStorage.setItem(
          "access_token",
          JSON.stringify(data?.access_token)
        );
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          const Page = route.page;
          let Layout = React.Fragment;

          if (route.isShowHeader) Layout = CustomerLayout;
          if (route.isShowHeaderAdmin || route.isShowSidebarAdmin)
            Layout = AdminLayout;
          if (route.isShowHeaderVendor) Layout = VendorLayout;

          const checkAuth =
            (!route.isShowHeaderAdmin &&
              !route.isShowSidebarAdmin &&
              !route.isShowHeaderVendor) ||
            (route.isShowHeaderAdmin && user.isAdmin) ||
            (route.isShowHeaderVendor && user.isVendor);

          return (
            <Route
              key={index}
              path={route.path}
              element={
                checkAuth ? (
                  <Layout>
                    <Page />
                  </Layout>
                ) : (
                  <NotFoundPage />
                )
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
