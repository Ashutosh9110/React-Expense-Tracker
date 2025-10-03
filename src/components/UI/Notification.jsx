import React from "react";

export default function Notification({ status, title, message }) {
  let classes = "w-full text-center py-3 font-bold";

  if (status === "error") {
    classes += " bg-red-600 text-white";
  }
  if (status === "success") {
    classes += " bg-green-600 text-white";
  }
  if (status === "pending") {
    classes += " bg-blue-600 text-white";
  }

  return (
    <div className={classes}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
