import Link from "next/link";
import React from "react";

type Props = {};

export default function PaymentSuccessPage() {
  return (
    <div className="mx-auto max-w-[1140px] flex flex-col items-center">
      <h1 className="text-4xl text-center text-green-500 mt-10">
        Payment has been successful!
      </h1>
      <p className="text-center">
        Thank you for purchasing a Goalpass! You can either download your ticket
        in a PDF form by returning to the previous page or checking you email.
        See you soon!
      </p>
      <Link
        href="/"
        className="text-center bg-[#1E40AF] text-white py-2 px-4 rounded-md mt-10 mx-auto"
      >
        Go to home
      </Link>
    </div>
  );
}
