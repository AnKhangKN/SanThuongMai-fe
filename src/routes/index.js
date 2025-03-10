import HomePage from "../pages/Customer/HomePage/HomePage";
import OrderPage from "../pages/Customer/OrderPage/OrderPage";
import ProductsPage from "../pages/Customer/ProductsPage/ProductsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

export const routes = [
    // customer
    {
        
        path: '/',
        page: HomePage,
        isShowHeader: true
        
    },
    {
        
        path: '/products',
        page: ProductsPage,
        isShowHeader: true
        
    },
    {
        
        path: '/order',
        page: OrderPage,
        isShowHeader: true
        
    },
    // vendor
    // admin
    {
        
        path: '*',
        page: NotFoundPage
        
    },
]