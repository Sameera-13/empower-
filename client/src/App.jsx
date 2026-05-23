import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ResourceHub from './pages/ResourceHub';
import PostFeed from './pages/PostFeed';
import PostDetail from './pages/PostDetail';
import OpportunityBoard from './pages/OpportunityBoard';
import OpportunityDetail from './pages/OpportunityDetail';
import SafetyHub from './pages/SafetyHub';
import Profile from './pages/Profile';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import MyOrders from './pages/MyOrders';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ReturnPolicy from './pages/ReturnPolicy';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import PostManagement from './pages/admin/PostManagement';
import ResourceManagement from './pages/admin/ResourceManagement';
import OpportunityManagement from './pages/admin/OpportunityManagement';
import ProductManagement from './pages/admin/ProductManagement';
import OrderManagement from './pages/admin/OrderManagement';
import BlogManagement from './pages/admin/BlogManagement';
import HeroSlideManagement from './pages/admin/HeroSlideManagement';
import MediaCoverageManagement from './pages/admin/MediaCoverageManagement';
import PartnerManagement from './pages/admin/PartnerManagement';
import ContactMessages from './pages/admin/ContactMessages';
import NewsletterSubscribers from './pages/admin/NewsletterSubscribers';
import Wishlist from './pages/Wishlist';
import Notifications from './pages/Notifications';
import CouponManagement from './pages/admin/CouponManagement';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const { isAdmin, loading } = useAuth();
  if (loading) return null;
  return isAdmin ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/resources" element={<ResourceHub />} />
      <Route path="/community" element={<PostFeed />} />
      <Route path="/community/:id" element={<PostDetail />} />
      <Route path="/opportunities" element={<OpportunityBoard />} />
      <Route path="/opportunities/:id" element={<OpportunityDetail />} />
      <Route path="/safety" element={<SafetyHub />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/return-policy" element={<ReturnPolicy />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/order-success/:id" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
      <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><UserManagement /></AdminRoute>} />
      <Route path="/admin/posts" element={<AdminRoute><PostManagement /></AdminRoute>} />
      <Route path="/admin/resources" element={<AdminRoute><ResourceManagement /></AdminRoute>} />
      <Route path="/admin/opportunities" element={<AdminRoute><OpportunityManagement /></AdminRoute>} />
      <Route path="/admin/products" element={<AdminRoute><ProductManagement /></AdminRoute>} />
      <Route path="/admin/orders" element={<AdminRoute><OrderManagement /></AdminRoute>} />
      <Route path="/admin/coupons" element={<AdminRoute><CouponManagement /></AdminRoute>} />
      <Route path="/admin/blog" element={<AdminRoute><BlogManagement /></AdminRoute>} />
      <Route path="/admin/hero-slides" element={<AdminRoute><HeroSlideManagement /></AdminRoute>} />
      <Route path="/admin/media-coverage" element={<AdminRoute><MediaCoverageManagement /></AdminRoute>} />
      <Route path="/admin/partners" element={<AdminRoute><PartnerManagement /></AdminRoute>} />
      <Route path="/admin/messages" element={<AdminRoute><ContactMessages /></AdminRoute>} />
      <Route path="/admin/subscribers" element={<AdminRoute><NewsletterSubscribers /></AdminRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
