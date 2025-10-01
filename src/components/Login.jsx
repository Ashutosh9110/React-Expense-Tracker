import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { sendPasswordResetEmail, sendVerificationEmail } from "../utils/firebaseUtils";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [message, setMessage] = useState("");

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email || !password) {
      alert("Both fields are required");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        setIsLoggedIn(true);
        navigate("/")
      } else {
        navigate("/verify-email")
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      const idToken = await auth.currentUser.getIdToken();
      await sendVerificationEmail(idToken);
      setMessage("Verification email sent! Please check your inbox.");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Welcome to Expense Tracker 🎉
        </h1>
        <div className="p-4 bg-red-100 text-red-700 rounded-md shadow-md">
          Your profile is Incomplete.
          <button
            onClick={() => navigate("/complete-profile")}
            className="ml-2 text-indigo-600 font-semibold hover:underline"
          >
            Complete now
          </button>
        </div>
      </div>
    );
  }

  if (showVerify) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <h2 className="text-2xl font-bold mb-4">Verify your Email</h2>
        <p className="mb-4">Please verify your email to continue.</p>
        <button
          onClick={handleVerifyEmail}
          className="px-6 py-2 bg-white text-indigo-600 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Send Verification Email
        </button>
        {message && <p className="mt-4 text-green-200">{message}</p>}
        {error && <p className="mt-4 text-red-200">{error}</p>}
      </div>
    );
  }


  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setResetMessage("");
    setResetError("");
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(resetEmail);
      setResetMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setResetError(err.message);
    } finally {
      setIsLoading(false);
    }
  };




  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-12">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 border border-red-400 rounded-md p-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>






        <div className="text-center mt-4">
          <button
            onClick={() => setShowForgotModal(true)}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {/* Forgot Password Modal */}
        {showForgotModal && (
          <div className="fixed inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-8 w-full max-w-sm shadow-lg relative">
              <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
              <form onSubmit={handlePasswordReset}>
                <label className="block mb-2 text-lg font-medium text-gray-700">Enter your email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-black mb-6"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />

                {isLoading ? (
                  <div className="text-center text-indigo-600 font-semibold">Sending email...</div>
                ) : (
                  <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Send Reset Email
                  </button>
                )}

                {resetMessage && <p className="text-green-600 mt-2">{resetMessage}</p>}
                {resetError && <p className="text-red-600 mt-2">{resetError}</p>}
              </form>

              <button
                onClick={() => setShowForgotModal(false)}
                className="absolute top-3 right-4 text-gray-600 hover:text-black"
              >
                ✖
              </button>
            </div>
          </div>
        )}


      </div>
    </div>
  );
}
