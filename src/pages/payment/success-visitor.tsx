import Link from "next/link";
import React from "react";

type Props = {};

export default function PaymentSuccessPage() {
  return (
    <div className="mx-auto max-w-[1140px] flex flex-col items-center">
      <h1 className="text-4xl text-center text-green-500 mt-10">
        Payment has been successful!
      </h1>
      <Link
        href="/"
        className="text-center bg-[#1E40AF] text-white py-2 px-4 rounded-md mt-10 mx-auto"
      >
        Go to home
      </Link>
    </div>
  );
}
