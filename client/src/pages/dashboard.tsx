import React, { useEffect } from "react";
import { readToken } from "../../lib/authenticate";
import { useRouter } from "next/router";

export default function Dashboard() {
  let token: any = readToken();
  const router = useRouter();
  useEffect(() => {
    if (!token) router.push("/authentication");
  });
  if (!token) return null;
  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome back {token.userName}!</p>
    </>
  );
}
