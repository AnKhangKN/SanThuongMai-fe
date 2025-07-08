import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes/index";
import CustomerLayout from "./components/CustomerComponents/CustomerLayout/CustomerLayout";
import AdminLayout from "./components/AdminComponents/AdminLayout/AdminLayout";
import VendorLayout from "./components/VendorComponents/VendorLayout/VendorLayout";
import * as AuthServices from "./services/shared/AuthServices";
import { useSelector } from "react-redux";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import * as ValidateToken from "./utils/tokenUtils";
import useAuth from "./hook/useAuth";

function App() {
  const user = useSelector((state) => state.user);

  useAuth(); // Hook custom

  AuthServices.axiosJWT.interceptors.request.use(
    async (config) => {
      const token = await ValidateToken.getValidAccessToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
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
