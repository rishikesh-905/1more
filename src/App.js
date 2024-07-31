import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Tracking from './pages/Tracking';
import ProductInfoManagement from './pages/ProductInfoManagement';
import OrderManage from './pages/OrderManage';
import StockInMovement from './pages/StockInMovement';
import ReorderManagement from './pages/ReorderManagement';
import ReportingAnalytics from './pages/ReportingAnalytics';
import OrderConfirmation from './pages/OrderConfirmation';
import PaymentPage from './pages/Payment'; // Ensure this matches the actual file name
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import SiteStatistics from './pages/SiteStatistics';
import Settings from './pages/Settings';
import AdminLoginPage from './pages/AdminLoginPage'; // Import the AdminLoginPage
import ProfilePage from './pages/ProfilePage'; // Import the ProfilePage

const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/register'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} /> {/* Added Profile route */}
        <Route path="/product-info-management" element={<ProductInfoManagement />} />
        <Route path="/order-manage" element={<OrderManage />} />
        <Route path="/stock-in-movement" element={<StockInMovement />} />
        <Route path="/reorder-management" element={<ReorderManagement />} />
        <Route path="/reporting-analytics" element={<ReportingAnalytics />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/payment" element={<PaymentPage />} />
        
        {/* Admin Panel Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} /> {/* Admin login route */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="statistics" element={<SiteStatistics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="product-management" element={<ProductInfoManagement />} />
          <Route path="order-manage" element={<OrderManage />} />
          <Route path="stock-in-movement" element={<StockInMovement />} />
        </Route>
      </Routes>
      {!shouldHideNavbar && <Footer />}
    </>
  );
};

export default App;
