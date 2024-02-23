import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { readToken } from "../../lib/authenticate";
import { Button } from "react-bootstrap";

export default function Dashboard() {
  let authenticated: any = readToken();
  const router = useRouter();
  useEffect(() => {
    if (!authenticated) router.push("/login");
  });
  if (!authenticated) return null;
  return (
    <>
      <h1 className="page-title">CovGen!</h1>
      <p style={{ textAlign: "center", fontSize: "larger" }}>
        Welcome back {authenticated.userName}!
      </p>
    </>
  );
}
