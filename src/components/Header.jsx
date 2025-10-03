import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { toggleTheme } from "../store/slices/themeSlice";
import { toggleCart } from "../store/slices/cartSlice";



const Header = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const premiumActive = useSelector((state) => state.expenses.premiumActive);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const cartVisible = useSelector((state) => state.cart.visible);
  const { logout } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="p-4 bg-gray-200 text-indigo-600 dark:bg-gray-800 dark:text-indigo-300 transition-colors">
      <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
        <NavLink to="/" className="hover:underline">
          Expense Tracker
        </NavLink>
      </div>

      <div className="ml-auto flex items-center space-x-4">
        
            {/* My Cart Button */}
        {isLoggedIn && (
          <button
            onClick={() => dispatch(toggleCart())}
            className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            🛒 {cartVisible ? "Hide Cart" : "My Cart"}
          </button>
        )}
            {/* Theme Toggle */}
        {premiumActive && (
          <button
            onClick={() => dispatch(toggleTheme())}
            className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-yellow-500 dark:hover:bg-yellow-600"
            >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        )}
         {/* Logout */}
        {isLoggedIn && (
          <button onClick={handleLogout} className="text-indigo-600 font-semibold dark:text-white">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
