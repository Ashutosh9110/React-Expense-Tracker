import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { toggleTheme } from "../store/slices/themeSlice";


const Header = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const premiumActive = useSelector((state) => state.expenses.premiumActive);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { logout } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="p-4 bg-gray-200 text-indigo-600 flex justify-between items-center">
      <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
        <NavLink to="/" className="hover:underline">
          Expense Tracker
        </NavLink>
      </div>

      <div className="ml-auto flex items-center space-x-4">
        {premiumActive && (
          <button
            onClick={() => dispatch(toggleTheme())}
            className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        )}
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
