import React from "react";

export default function NavBar() {
  return (
    <>
      <ul>
        <a href="/login">
          <li>Login</li>
        </a>
        <a href="/register">
          <li>Register</li>
        </a>
        <a href="/dashboard">
          <li>Dashboard</li>
        </a>
      </ul>
    </>
  );
}
