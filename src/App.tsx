import { BrowserRouter, Route, Routes } from "react-router-dom";

import CouponsAdminPage from "./pages/Admin/CouponsAdminPage";
import Dashboard from "./pages/Admin/Dashboard";
import OrderManagement from "./pages/Admin/OrderManagement";
import ProductManagement from "./pages/Admin/ProductManagement";
import UserManagement from "./pages/Admin/UserManagement";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ErrorPage from "./pages/error/error_page";
import Homepage from "./pages/home/page/home_page";
import ProductList from "./pages/users/product/Allproducts";
import CartPage from "./pages/users/product/CartContext";
import ProductDetailsPage from "./pages/users/product/ProductDetailsPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Dashboard" element={<Homepage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/products" element={<ProductManagement />} />
        <Route path="/orders" element={<OrderManagement />} />
        <Route path="/pdlist" element={<ProductList />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/ad" element={<CouponsAdminPage />} />

        <Route path="/product/:productId" Component={ProductDetailsPage} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
