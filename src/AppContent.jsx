// src/AppContent.jsx
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Notification from "./components/UI/Notification";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CompleteProfile from "./components/CompleteProfile";
import Welcome from "./components/Welcome";
import VerifyEmail from "./components/VerifyEmail";
import DailyExpenses from "./components/DailyExpenses";
import Products from "./components/Products";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) return <Login />;
  return children;
}

export default function AppContent() {
  const notification = useSelector((state) => state.ui.notification);

  return (
    <div>
      {/* ✅ Notification bar */}
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}

      <Header />

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <DailyExpenses />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
