import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "expense-tracker-react-9037d.firebaseapp.com",
  projectId: "expense-tracker-react-9037d",
  storageBucket: "expense-tracker-react-9037d.appspot.com",
  messagingSenderId: "794207291919",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
