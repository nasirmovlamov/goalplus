import { ScriptProps } from "next/script";
import React from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import TopBanner from "./TopBanner";
import Copyright from "./Copyright";

export default function Layout({ children }: ScriptProps) {
  return (
    <div className="min-h-screen">
      <div className="min-h-[calc(100vh-340px)]">
        <TopBanner />
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
