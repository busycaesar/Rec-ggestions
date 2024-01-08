import React from "react";

type Component = {
  children: React.ReactNode;
};

export default function Layout({ children }: Component) {
  return <div style={{ marginTop: "3em" }}>{children}</div>;
}
