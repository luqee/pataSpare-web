import { Route, Routes } from "react-router-dom";
import Activate from "./Activate";
import BrowseParts from "./BrowseParts";
import ContactPage from "./ContactPage";
import Account from "./customer/Account";
import CustomerPage from "./customer/CustomerPage";
import Dash from "./customer/Dash";
import Inquiries from "./customer/Inquiries";
import OrderCreate from "./customer/OrderCreate";
import Orders from "./customer/Orders";
import ViewInquiry from "./customer/ViewInquiry";
import ViewOrder from "./customer/ViewOrder";
import CustomerRegister from "./CustomerRegister";
import EmailSent from "./EmailSent";
import LandingPage from "./LandingPage";
import Layout from "./Layout";
import PartCategory from "./PartCategory";
import PartDetails from "./PartDetails";
import PasswordReset from "./PasswordReset";
import Privacy from "./Privacy"
import Recovery from "./Recovery";
import RequireAuth from "./RequireAuth";
import Stores from "./Stores";
import StoreView from "./StoreView";
import Terms from "./Terms"
import UserCart from "./UserCart";
import UserLogin from "./UserLogin";

export default function Main() {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<LandingPage />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="terms" element={<Terms />} />
                <Route path="auth/register" element={<CustomerRegister />} />
                <Route path="auth/email" element={<EmailSent />} />
                <Route path="auth/activate" element={<Activate />} />
                <Route path="auth/login" element={<UserLogin />} />
                <Route path="auth/recovery" element={<Recovery />} />
                <Route path="auth/reset/:token/:email" element={<PasswordReset />} />
                <Route path="search" element={<SearchResults />} />
                <Route path="part-category/:categoryId" element={<PartCategory />} />
                <Route path="part/:partId" element={<PartDetails />} />
                <Route path="parts" element={<BrowseParts />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="stores" element={<Stores />} />
                <Route path="stores/:shopId" element={<StoreView />} />
                <Route path="cart" element={<UserCart />} />
            </Route>
            <Route path="/customer" element={
                <RequireAuth>
                    <CustomerPage />
                </RequireAuth>
            } >
                <Route index element={<Dash />} />
                <Route path="account" element={<Account />} />
                <Route path="orders/create" element={<OrderCreate />} />
                <Route path="orders" element={<Orders />} />
                <Route path="orders/:orderId" element={<ViewOrder />} />
                <Route path="inquiries" element={<Inquiries />} />
                <Route path="inquiries/:inquiryId" element={<ViewInquiry />} />
            </Route>
        </Routes>
    )
}