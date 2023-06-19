import Link from "next/link";
import React from "react";

export default function PaymentFailPage() {
  return (
    <div className="mx-auto max-w-[1140px] flex flex-col items-center">
      <h1 className="text-4xl text-center text-red-500 mt-10">
        Payment has been failed!
          </h1>
          <p>
            Please try again later.
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
