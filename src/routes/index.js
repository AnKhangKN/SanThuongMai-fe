import DashboardPage from "../pages/Admin/DashboardPage/DashboardPage";
import UserManagementPage from "../pages/Admin/UserManagementPage/UserManagementPage";
import HomePage from "../pages/Customer/HomePage/HomePage";
import OrderPage from "../pages/Customer/OrderPage/OrderPage";
import ProductsPage from "../pages/Customer/ProductsPage/ProductsPage";
import ProductManagementPage from "../pages/Admin/ProductManagementPage/ProductManagementPage";
import ProductReportPage from "../pages/Admin/ProductReportPage/ProductReportPage";
import ShopReportPage from "../pages/Admin/ShopReportPage/ShopReportPage";
import OrderReportPage from "../pages/Admin/OrderReportPage/OrderReportPage";
import StatisticsManagementPage from "../pages/Admin/StatisticsManagementPage/StatisticsManagementPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import register from "../pages/Vendor/register/register";
import registerForm from "../pages/Vendor/register/registerForm";
import registerTransport from "../pages/Vendor/register/registerTransport";
import registerTax from "../pages/Vendor/register/registerTax";
import VendorMain from "../pages/Vendor/VendorMain/VendorMain";
import AddProduct from "../pages/Vendor/ProductManegement/AddProduct";
import SeeAllProduct from "../pages/Vendor/ProductManegement/SeeAllProduct";
import ProductDetailPage from "../pages/Customer/ProductDetailPage/ProductDetailPage";
import SearchPage from "../pages/Customer/SearchPage/SearchPage";

export const routes = [
  // customer
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/search/:category",
    page: SearchPage,
    isShowHeader: true,
  },
  {
    path: "/products",
    page: ProductsPage,
    isShowHeader: true,
  },
  {
    path: "/products/:id",
    page: ProductDetailPage,
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
    path: "/vendor/add-product",
    page: AddProduct,
    isShowHeaderVendor: true,
  },

  {
    path: "/vendor/see-all-product",
    page: SeeAllProduct,
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
    page: UserManagementPage,
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
    path: "/admin/report/shops",
    page: ShopReportPage,
    isShowHeaderAdmin: true,
    isShowSidebarAdmin: true,
  },
  {
    path: "/admin/report/products",
    page: ProductReportPage,
    isShowHeaderAdmin: true,
    isShowSidebarAdmin: true,
  },
  {
    path: "/admin/report/orders",
    page: OrderReportPage,
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
