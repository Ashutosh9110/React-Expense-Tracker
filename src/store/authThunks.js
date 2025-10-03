// src/store/authThunks.js
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { login, logout } from "./slices/authSlice";
import { getCurrentUserData } from "../utils/firebaseUtils";

export const listenToAuthChanges = () => (dispatch) => {
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const token = await firebaseUser.getIdToken();
      const userData = await getCurrentUserData(token);

      dispatch(
        login({
          user: { ...firebaseUser, ...userData },
          token,
          userId: firebaseUser.uid,
        })
      );

      localStorage.setItem("token", token);
    } else {
      dispatch(logout());
      localStorage.removeItem("token");
    }
  });
};

export const logoutUser = () => async (dispatch) => {
  await auth.signOut();
  dispatch(logout());
};
