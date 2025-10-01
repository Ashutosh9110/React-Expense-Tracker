import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login';
import CompleteProfile from './components/CompleteProfile';
import Welcome from './components/Welcome';
import VerifyEmail from './components/VerifyEmail';

function AppContent() {
  return (
    <div>
      <Header />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Welcome />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/verify-email" element={<VerifyEmail />} /> {/* ✅ new */}
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
