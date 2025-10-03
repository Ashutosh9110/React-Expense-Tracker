const dbUrl = import.meta.env.VITE_FIREBASE_DATABASE;

export async function fetchCart(userId) {
  const res = await fetch(`${dbUrl}/cart/${userId}.json`);
  if (!res.ok) throw new Error("Failed to fetch cart");
  const data = await res.json();
  return data?.items || [];
}

export async function putCart(userId, items) {
  const res = await fetch(`${dbUrl}/cart/${userId}.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  if (!res.ok) throw new Error("Failed to store cart");
  return res.json();
}
