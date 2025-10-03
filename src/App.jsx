import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppContent from "./AppContent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listenToAuthChanges } from "./store/authThunks";
import { loadCart, saveCart } from "./store/cartThunks";

export default function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { userId } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);

  // Listen for Firebase auth changes
  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Load cart when user logs in
  useEffect(() => {
    if (userId) {
      dispatch(loadCart(userId));
    }
  }, [dispatch, userId]);

  // Save cart when items change
  useEffect(() => {
    if (userId && cartItems.length >= 0) {
      dispatch(saveCart(userId, cartItems));
    }
  }, [dispatch, userId, cartItems]);

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors">
          <AppContent />
        </div>
      </AuthProvider>
    </Router>
  );
}
