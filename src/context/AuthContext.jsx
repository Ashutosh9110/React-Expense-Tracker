// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getCurrentUserData } from "../utils/firebaseUtils"; 
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout as logoutAction } from "../store/slices/authSlice";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken();
          const userData = await getCurrentUserData(idToken);

          setUser({ ...firebaseUser, ...userData });

          dispatch(
            login({
              user: firebaseUser,
              token: idToken,
              userId: firebaseUser.uid,
            })
          );

          localStorage.setItem("token", idToken);
        } catch (err) {
          console.error("Failed to fetch profile data:", err);

          const fallbackToken = await firebaseUser.getIdToken();
          setUser(firebaseUser);

          dispatch(
            login({
              user: firebaseUser,
              token: fallbackToken,
              userId: firebaseUser.uid,
            })
          );

          localStorage.setItem("token", fallbackToken);
        }
      } else {
        setUser(null);
        dispatch(logoutAction());
        localStorage.removeItem("token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  // logout handler
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      localStorage.removeItem("profile");
      setUser(null);
      dispatch(logoutAction());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
