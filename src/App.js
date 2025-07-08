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

<<<<<<< HEAD
  useAuth(); // Hook custom
=======
  useEffect(() => {
    const handleGetDetailUser = async () => {
      try {
        const token = await ValidateToken.getValidAccessToken();
        const res = await AuthServices.getDetailUser(token);
        dispatch(updateUser(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    handleGetDetailUser();
  }, []);
>>>>>>> a9b64692e104e7330767caf20bf7c1f7e1f39a55

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
