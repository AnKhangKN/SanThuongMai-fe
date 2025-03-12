import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './routes/index';
import CustomerLayout from './components/CustomerComponents/CustomerLayout/CustomerLayout';
import AdminLayout from './components/AdminComponents/AdminLayout/AdminLayout';
import VendorLayout from './components/VendorComponents/VendorLayout/VendorLayout';


function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          const Page = route.page;

          // Xác định layout phù hợp
          let Layout = React.Fragment; // Mặc định không có layout
          // Customer layout
          if (route.isShowHeader) Layout = CustomerLayout;
          
          // Admin layout
          if (route.isShowHeaderAdmin) Layout = AdminLayout;
          if (route.isShowSidebarAdmin) Layout = AdminLayout;

          // Vendor lay out
          if (route.isShowHeaderVendor) Layout = VendorLayout;
          
          return (
            <Route 
              key={index} 
              path={route.path} 
              element={
                <Layout>
                  <Page />
                </Layout>
              } 
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
