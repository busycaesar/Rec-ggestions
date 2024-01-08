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
      <h1 className="page-title">Dashboard</h1>
      <p>Welcome back {authenticated.userName}!</p>
      <Button>Add Experience</Button>
    </>
  );
}
