// src/components/VerifyEmail.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendVerificationEmail, verifyEmailOobCode } from "../utils/firebaseUtils";
import { auth } from "../firebase/config";

export default function VerifyEmail() {
  const [message, setMessage] = useState("Verifying your email...");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const oobCode = query.get("oobCode");

    if (!oobCode) {
      setMessage("Please verify your email to continue.");
      return;
    }

    (async () => {
      try {
        await verifyEmailOobCode(oobCode);
        setMessage("Email has been verified! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, [navigate]);

  const handleSendVerification = async () => {
    try {
      const idToken = await auth.currentUser.getIdToken();
      await sendVerificationEmail(idToken);
      setMessage("Verification email sent! Please check your inbox.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      {error ? (
        <div className="p-4 bg-red-500 rounded">{error}</div>
      ) : (
        <div className="p-4 bg-green-600 rounded">{message}</div>
      )}

      {!window.location.search.includes("oobCode") && (
        <button
          onClick={handleSendVerification}
          className="mt-4 px-6 py-2 bg-white text-indigo-600 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Resend Verification Email
        </button>
      )}

    </div>
  );
}
