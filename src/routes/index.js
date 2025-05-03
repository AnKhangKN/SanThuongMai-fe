import DashboardPage from "../pages/Admin/DashboardPage/DashboardPage";
import UserManagementPage from "../pages/Admin/UserManagementPage/UserManagementPage";
import HomePage from "../pages/Customer/HomePage/HomePage";
import ProductManagementPage from "../pages/Admin/ProductManagementPage/ProductManagementPage";
import ProductReportPage from "../pages/Admin/ProductReportPage/ProductReportPage";
import ShopReportPage from "../pages/Admin/ShopReportPage/ShopReportPage";
import OrderReportPage from "../pages/Admin/OderReportPage/OrderReportPage";
import StatisticsManagementPage from "../pages/Admin/StatisticsManagementPage/StatisticsManagementPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

import Register from "../pages/Vendor/register/Register";
import RegisterForm from "../pages/Vendor/register/RegisterForm";
import RegisterTransport from "../pages/Vendor/register/RegisterTransport";
import RegisterTax from "../pages/Vendor/register/RegisterTax";
import SuccessRegister from "../pages/Vendor/register/SuccessRegister";

import VendorMain from "../pages/Vendor/VendorMain/VendorMain";
import AddProduct from "../pages/Vendor/ProductManagement/AddProduct";
import SeeAllProduct from "../pages/Vendor/ProductManagement/SeeAllProduct";
import OrderReview from "../pages/Vendor/OrderManagement/OrderReview";
import UpdateStatus from "../pages/Vendor/OrderManagement/UpdateStatus";
import IncomeStatisics from "../pages/Vendor/FinancialManagement/IncomeStatistics";
import AddPaymentGateway from "../pages/Vendor/FinancialManagement/AddPaymentGateway";
import ReplyToComment from "../pages/Vendor/CustomerInteraction/ReplyToComment";
import CommentResponse from "../pages/Vendor/CustomerInteraction/CommentResponse";

import SearchPage from "../pages/Customer/SearchPage/SearchPage";
import ProductDetailPage from "../pages/Customer/ProductDetailPage/ProductDetailPage";
import ProFileShop from "../pages/Vendor/ProFileShop/ProFileShop";
import ProfilePage from "../pages/Customer/AccountPage/ProfilePage/ProfilePage";
import CartPage from "../pages/Customer/CartPage/CartPage";
import CategoryPage from "../pages/Customer/CategoryPage/CategoryPage";
import NotificationPage from "../pages/Customer/AccountPage/NotificationPage/NotificationPage";

import CompleteComponent from "../components/CustomerComponents/AccountPageComponent/OrderComponent/CompleteComponent/CompleteComponent";
import CancelComponent from "../components/CustomerComponents/AccountPageComponent/OrderComponent/CancelComponent/CancelComponent";
import TransportComponent from "../components/CustomerComponents/AccountPageComponent/OrderComponent/TransportComponent/TransportComponent";
import WaitingForDelivery from "../components/CustomerComponents/AccountPageComponent/OrderComponent/WaitingForDelivery/WaitingForDelivery";
import WaitingForPayment from "../components/CustomerComponents/AccountPageComponent/OrderComponent/WaitingForPayment/WaitingForPayment";
import SignupPage from "../pages/Auth/SignupPage/SignupPage";
import LoginPage from "../pages/Auth/LoginPage/LoginPage";
import AdminProfilePage from "../pages/Admin/AdminProfilePage/AdminProfilePage";
import VendorManagementPage from "../pages/Admin/VendorManagementPage/VendorManagementpage";
import PaymentPage from "../pages/Customer/PaymentPage/PaymentPage";

export const routes = [
  //auth
  {
    path: "/sign-up",
    page: SignupPage,
    isShowHeader: false,
  },
  {
    path: "/login",
    page: LoginPage,
    isShowHeader: false,
  },

  // customer
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/category/:name",
    page: CategoryPage,
    isShowHeader: true,
  },
  {
    path: "/search/:name-product",
    page: SearchPage,
    isShowHeader: true,
  },
  {
    path: "/product/:id",
    page: ProductDetailPage,
    isShowHeader: true,
  },
  {
    path: "/cart",
    page: CartPage,
    isShowHeader: true,
  },
  {
    path: "/checkout",
    page: PaymentPage,
    isShowHeader: true,
  },
  {
    path: "/user/account/profile",
    page: ProfilePage,
    isShowHeader: true,
  },
  {
    path: "/user/notification",
    page: NotificationPage,
    isShowHeader: true,
  },
  {
    path: "/user/purchase/complete",
    page: CompleteComponent,
    isShowHeader: true,
  },
  {
    path: "/user/purchase/cancel",
    page: CancelComponent,
    isShowHeader: true,
  },
  {
    path: "/user/purchase/transport",
    page: TransportComponent,
    isShowHeader: true,
  },
  {
    path: "/user/purchase/waiting-delivery",
    page: WaitingForDelivery,
    isShowHeader: true,
  },
  {
    path: "/user/purchase/waiting-payment",
    page: WaitingForPayment,
    isShowHeader: true,
  },

  // vendor
  {
    path: "/vendor",
    page: VendorMain,
    isShowHeaderVendor: true,
  },
  {
    path: "/vendor/profile-shop",
    page: ProFileShop,
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
    path: "/vendor/approve-order",
    page: OrderReview,
    isShowHeaderVendor: true,
  },
  {
    path: "/vendor/update-status",
    page: UpdateStatus,
    isShowHeaderVendor: true,
  },
  {
    path: "/vendor/revenue-report",
    page: IncomeStatisics,
    isShowHeaderVendor: true,
  },
  {
    path: "/vendor/add-payment",
    page: AddPaymentGateway,
    isShowHeaderVendor: true,
  },
  {
    path: "/vendor/reply-comment",
    page: ReplyToComment,
    isShowHeaderVendor: true,
  },
  {
    path: "/vendor/feedback-comment",
    page: CommentResponse,
    isShowHeaderVendor: true,
  },

  // vendor register
  {
    path: "/vendor/register",
    page: Register,
    isShowHeaderVendor: false,
  },
  {
    path: "/vendor/register-form",
    page: RegisterForm,
    isShowHeaderVendor: false,
  },
  {
    path: "/vendor/register-transport",
    page: RegisterTransport,
    isShowHeaderVendor: false,
  },
  {
    path: "/vendor/register-tax",
    page: RegisterTax,
    isShowHeaderVendor: false,
  },
  {
    path: "/vendor/register-success",
    page: SuccessRegister,
    isShowHeaderVendor: false,
  },

  // admin
  {
    path: "/admin",
    page: DashboardPage,
    isShowHeaderAdmin: true,
    isShowSidebarAdmin: true,
  },
  {
    path: "/admin/users",
    page: UserManagementPage,
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
  {
    path: "/admin/profile",
    page: AdminProfilePage,
    isShowHeaderAdmin: true,
    isShowSidebarAdmin: true,
  },

  // not found
  {
    path: "*",
    page: NotFoundPage,
  },
];
