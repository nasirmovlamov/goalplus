import React, { useEffect } from "react";

export default function () {
  useEffect(() => {
    window.location.href = "http://www.goalplus.az";
  }, []);

  return (
    <div className="flex justify-center items-center h-[400px]">
      <div className="text-7xl font-bold mt-3">401</div>
    </div>
  );
}
