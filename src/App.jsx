import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login';
import CompleteProfile from './components/CompleteProfile';
import Welcome from './components/Welcome';
import VerifyEmail from './components/VerifyEmail';
import DailyExpenses from './components/DailyExpenses';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listenToAuthChanges } from "./store/authThunks";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) return <Login />;
  return children;
}

function AppContent() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/verify-email" element={<VerifyEmail />} /> 
        <Route path="/expenses" element={
            <ProtectedRoute><DailyExpenses /></ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);


  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

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
