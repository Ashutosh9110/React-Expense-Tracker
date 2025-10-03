import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getEnv } from "../utils/env";

const firebaseConfig = {
  apiKey: getEnv("VITE_API_KEY"),
  authDomain: getEnv("VITE_AUTH_DOMAIN"),
  projectId: getEnv("VITE_PROJECT_ID"),
  storageBucket: getEnv("VITE_STORAGE_BUCKET"),
  messagingSenderId: getEnv("VITE_MESSAGING_SENDER_ID"),
  appId: getEnv("VITE_APP_ID"),
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
