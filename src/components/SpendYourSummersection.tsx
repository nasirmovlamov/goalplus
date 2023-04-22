import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const SpendYourSummersection = (props: Props) => {
  return (
    <div
      className="w-full flex justify-center items-center relative"
      style={{
        backgroundImage: `url("https://goalplusaz1.odoo.com/web/image/482-47981a8c/IMG_6478.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundColor: "#021F57",
        backgroundPosition: "0px -400px",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full h-full absolute top-0 left-0 bg-[#00000077]"></div>
      <div
        className="w-full h-full absolute top-0 bottom-0"
        style={{
          backgroundImage: `url("https://goalplusaz1.odoo.com/web_editor/shape/web_editor/Wavy/04.svg?c1=%23022974&c5=%23022974")`,
          backgroundRepeat: "no-repeat no-repeat",
          backgroundPosition: "0 -300px",
          backgroundSize: "100% auto",
          display: "block",
        }}
      ></div>

      <div className="max-w-[1230px] px-5 justify-center lg:justify-between w-full flex flex-wrap z-20 lg:h-[310px] h-full pt-2 gap-y-9">
        <div className="flex flex-col pt-2 lg:items-start gap-[10px] text-white lg:w-max w-full text-center lg:text-start">
          <h2 className="text-[36px] lg:text-[44px]">
            Spend your summer with Goalplus
          </h2>
          {/* <p>
            Grab your Pass and secure your place at Goalplus 2023 before prices
            go up
          </p> */}
          <Link
            href="/contactus"
            className=" bg-[#032974] w-max shadow-md  text-white rounded-md px-4 py-2 hover:bg-[#0a3b9d] transition duration-300 ease-in-out"
          >
            Get my GoalPlus
          </Link>
        </div>

        {/* <img
          alt="background"
          src={
            "https://goalplusaz1.odoo.com/web/image/476-f1e4cf6e/IMG_9894.svg"
          }
          className="lg:w-[390px] h-[246px] object-cover"
        /> */}
      </div>
    </div>
  );
};

export default SpendYourSummersection;
