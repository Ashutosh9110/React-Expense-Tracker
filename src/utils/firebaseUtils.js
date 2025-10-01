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



export async function addExpenseToDB(userId, expense) {
  const dbUrl = import.meta.env.VITE_FIREBASE_DATABASE; // from .env
  const res = await fetch(`${dbUrl}/expenses/${userId}.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });

  if (!res.ok) throw new Error("Failed to add expense");
  return await res.json();
}

export async function getExpensesFromDB(userId) {
  const dbUrl = import.meta.env.VITE_FIREBASE_DATABASE;
  const res = await fetch(`${dbUrl}/expenses/${userId}.json`);

  if (!res.ok) throw new Error("Failed to fetch expenses");
  const data = await res.json();

  // Convert Firebase object to array
  return data
    ? Object.entries(data).map(([key, value]) => ({
        firebaseId: key,
        ...value,
      }))
    : [];
}