// src/utils/firebaseApi.js
export async function getCurrentUserData(idToken) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    }
  );

  const data = await res.json();
  if (res.ok) {
    return data.users?.[0];
  } else {
    throw new Error(data.error?.message || "Failed to fetch user data");
  }
}

export async function sendVerificationEmail(idToken) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken,
      }),
    }
  );

  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw new Error(
      data.error?.message || "Failed to send verification email"
    );
  }
}


export async function verifyEmailOobCode(oobCode) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        oobCode, // code from the verification link
      }),
    }
  );

  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw new Error(data.error?.message || "Failed to verify email");
  }
}





export async function sendPasswordResetEmail(email) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email,
      }),
    }
  );

  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw new Error(data.error?.message || "Failed to send password reset email");
  }
}