// src/components/CompleteProfile.jsx
import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { updateProfile, updateEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getCurrentUserData } from "../utils/firebaseUtils";


export default function CompleteProfile() {
  const [fullName, setFullName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(auth.currentUser?.email || "");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
  
    if (savedProfile) {
      const user = JSON.parse(savedProfile);
      setFullName(user.fullName || "");
      setPhotoURL(user.photoURL || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setGithub(user.github || "");
      setPortfolio(user.portfolio || "");
      setLinkedin(user.linkedin || "");
    } else {
      // fallback: fetch from Firebase if no local copy
      const token = localStorage.getItem("token");
      if (!token) return;
  
      getCurrentUserData(token)
        .then((user) => {
          setFullName(user.displayName || "");
          setPhotoURL(user.photoUrl || "");
          setEmail(user.email || "");
          localStorage.setItem("profile", JSON.stringify(user)); // cache it
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, []);
  

  const handleUpdate = async () => {
    try {
      if (!fullName || !email) {
        setMessage("Full Name and Email are required.");
        return;
      }

      await updateProfile(auth.currentUser, {
        displayName: fullName,
        photoURL: photoURL,
      });

      if (email !== auth.currentUser.email) {
        await updateEmail(auth.currentUser, email);
      }


      localStorage.setItem("profile", JSON.stringify({
        fullName,
        photoURL,
        phone,
        email,
        github,
        portfolio,
        linkedin
      }));
  

      setMessage("Profile updated successfully ✅");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);
      setMessage(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Details</h2>

        {message && (
          <div className="mb-4 text-sm text-indigo-700 bg-indigo-100 border border-indigo-300 rounded-md p-2">
            {message}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full mt-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Photo URL</label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full mt-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mt-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">GitHub Profile URL</label>
            <input
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="w-full mt-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Portfolio URL (optional)</label>
            <input
              type="text"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              className="w-full mt-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">LinkedIn URL (optional)</label>
            <input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full mt-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-black"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-red-200 text-red-700 rounded-md hover:bg-red-300"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
