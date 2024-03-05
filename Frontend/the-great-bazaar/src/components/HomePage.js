import React from "react";

export default function Login() {
  return (
    <div>
      <h1>The Great Bazar</h1>
      <div>
        <button onClick={() => alert("Login clicked")}>Login</button>
        <button onClick={() => alert("Sign Up clicked")}>Sign Up</button>
      </div>
    </div>
  );
}
