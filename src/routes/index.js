import DashboardPage from "../pages/Admin/DashboardPage/DashboardPage";
import VendorManagementPage from "../pages/Admin/VendorManagementPage/VendorManagementPage";
import HomePage from "../pages/Customer/HomePage/HomePage";
import OrderPage from "../pages/Customer/OrderPage/OrderPage";
import ProductsPage from "../pages/Customer/ProductsPage/ProductsPage";
import CustomerManagementPage from "../pages/Admin/CustomerManagementPage/CustomerManagementPage";
import ProductManagementPage from "../pages/Admin/ProductManagementPage/ProductManagementPage";
import OrderManagementPage from "../pages/Admin/OrderManagementPage/OrderManagementPage";
import ReportManagementPage from "../pages/Admin/ReportManagementPage/ReportManagementPage";
import StatisticsManagementPage from "../pages/Admin/StatisticsManagementPage/StatisticsManagementPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import register from "../pages/Vendor/register/register";
import registerForm from "../pages/Vendor/register/registerForm";
import registerTransport from "../pages/Vendor/register/registerTransport";
import registerTax from "../pages/Vendor/register/registerTax";
import VendorMain from "../pages/Vendor/VendorMain/VendorMain";

export const routes = [
  // customer
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/products",
    page: ProductsPage,
    isShowHeader: true,
  },
  {
    path: "/order",
    page: OrderPage,
    isShowHeader: true,
  },
  // vendor
  {
    path: "/vendor",
    page: VendorMain,
    isShowHeaderVendor: true,
  },

  {
    path: "/vendor/register",
    page: register,
    isShowHeaderVendor: true,
  },

  {
    path: "/vendor/register-form",
    page: registerForm,
    isShowHeaderVendor: true,
  },

  {
    path: "/vendor/register-transport",
    page: registerTransport,
    isShowHeaderVendor: true,
  },

  {
    path: "/vendor/register-tax",
    page: registerTax,
    isShowHeaderVendor: true,
  },
  // admin
  {
    path: "/admin",
    page: DashboardPage,
    isShowHeaderAdmin: true,
    isShowSidebarAdmin: true,
  },
  {
    path: "/admin/vendors",
    page: VendorManagementPage,
    isShowHeaderAdmin: true,
    isShowSidebarAdmin: true,
  },
  {
    path: "/admin/customers",
    page: CustomerManagementPage,
    isShowHeaderAdmin: true,
    isShowSidebarAdmin: true,
  },

  {
    path: "/admin/products",
    page: ProductManagementPage,
    isShowHeaderAdmin: true,
    isShowSidebarAdmin: true,
  },
  {
    path: "/admin/orders",
    page: OrderManagementPage,
    isShowHeaderAdmin: true,
    isShowSidebarAdmin: true,
  },
  {
    path: "/admin/reports",
    page: ReportManagementPage,
    isShowHeaderAdmin: true,
    isShowSidebarAdmin: true,
  },
  {
    path: "/admin/statistics",
    page: StatisticsManagementPage,
    isShowHeaderAdmin: true,
    isShowSidebarAdmin: true,
  },
  // not found page
  {
    path: "*",
    page: NotFoundPage,
  },
];
