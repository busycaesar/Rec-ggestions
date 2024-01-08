import React from "react";

type Component = {
  children: React.ReactNode;
};

export default function Layout({ children }: Component) {
  return <div className="mainContent">{children}</div>;
}
