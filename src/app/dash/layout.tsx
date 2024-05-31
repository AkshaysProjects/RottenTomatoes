import { Navbar } from "@/components/nav/Navbar";
import React from "react";

export interface IDashLayoutProps {
  children: React.ReactNode;
}

export default function DashLayout({ children }: IDashLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
