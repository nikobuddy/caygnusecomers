// src/routes.tsx
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

// Import your page components
import ContactUsPage from "./pages/aboutus/ContactUsPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import CheckoutPage from "./pages/users/checkout/CheckoutPage";
import NotFoundPage from "./pages/error/error_page";
import Homepage from "./pages/home/page/home_page";
import OrderConfirmationPage from "./pages/users/order/OrderConfirmationPage";
import {
  default as PrivacyPolicyPage,
  default as TermsOfServicePage,
} from "./pages/users/tac/TermsOfServicePage";
import CategoryPage from "./pages/users/product/CategoryPage";
import ProductPage from "./pages/users/product/ProductDetailsPage.tsx";
import ProductReviewsPage from "./pages/users/product/ProductReviewsPage";
import WishlistPage from "./pages/users/product/WishlistPage";
import CartPage from "./pages/users/profile/CartPage";
import ProfilePage from "./pages/users/profile/ProfilePage";
import ReturnPolicyPage from "./pages/users/shipping/ReturnPolicyPage";
import ShippingInformationPage from "./pages/users/shipping/ShippingInformationPage";
import SubscriptionManagementPage from "./pages/users/SubscriptionManagementPage";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/product/:id/reviews" element={<ProductReviewsPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route
          path="/shipping-information"
          element={<ShippingInformationPage />}
        />
        <Route path="/return-policy" element={<ReturnPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route
          path="/manage-subscriptions"
          element={<SubscriptionManagementPage />}
        />

        {/* Protected Routes */}
        <PrivateRoute path="/profile" element={<ProfilePage />} />
        <PrivateRoute path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Catch-all Route for 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
