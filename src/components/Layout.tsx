import { ScriptProps } from "next/script";
import React from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export default function Layout({ children }: ScriptProps) {
  return (
    <>
      {/* <Navbar /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
