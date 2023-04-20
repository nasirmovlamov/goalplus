import Link from "next/link";
import React from "react";

type Props = {};

const StayInTouch = (props: Props) => {
  return (
    <div
      className="flex w-full justify-center px-10 py-[50px] box-border h-max bg-[#032974] lg:bg-inherit "
      style={{
        backgroundImage: `url("https://goalplusaz1.odoo.com/web_editor/shape/web_editor/Wavy/10.svg?c1=%23085294&c2=%23d1fb52")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "left -300px",
        position: "relative",
      }}
    >
      <div className="max-w-[1200px] w-full h-full flex flex-wrap justify-center gap-5">
        {/* <div className="flex flex-col gap-2 text-white">
          <h2 className="text-4xl">Stay in touch</h2>
          <h3>connect</h3>
        </div> */}

        <div className="flex flex-wrap gap-5 justify-end">
          {/* <Link
            href="#"
            className="text-lg bg-[#031F57] text-white rounded-md px-4 py-2 hover:bg-[#0a3b9d] transition duration-300 ease-in-out w-max h-max"
          >
            Apply as a crew member
          </Link> */}
          <Link
            target="_blank"
            href="https://t.me/goalpluscommunity"
            className="text-lg bg-[#031F57] text-white rounded-md px-4 py-2 hover:bg-[#0a3b9d] transition duration-300 ease-in-out w-max h-max"
          >
            Join our telegram community
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StayInTouch;
