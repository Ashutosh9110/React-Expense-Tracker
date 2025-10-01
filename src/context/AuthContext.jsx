// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getCurrentUserData } from "../utils/firebaseUtils"; // <- import your helper

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // get idToken
          const idToken = await firebaseUser.getIdToken();
          // fetch extended user info
          const userData = await getCurrentUserData(idToken);

          // merge firebaseUser + userData
          setUser({
            ...firebaseUser,
            ...userData,
          });
        } catch (err) {
          console.error("Failed to fetch profile data:", err);
          setUser(firebaseUser); // fallback to default firebase user
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
