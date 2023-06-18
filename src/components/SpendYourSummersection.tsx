import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ALinkStyled } from "./AlinkStyled";
import leftLogo from "@/media/images/infoSectionLeftLogo.svg";
import rightLogo from "@/media/images/infoSectionRightLogo.png";
type Props = {};

const SpendYourSummersection = (props: Props) => {
  return (
    <div
      className="px-10  w-full flex justify-center items-center relative"
      style={{
        // backgroundImage: `url("https://goalplusaz1.odoo.com/web/image/482-47981a8c/IMG_6478.jpg")`,
        // backgroundRepeat: "no-repeat",
        backgroundColor: "#05055B",
        // backgroundPosition: "0px -400px",
        // backgroundSize: "cover",
      }}
    >
      {/* <div className="w-full h-full absolute top-0 left-0 bg-[#00000077]"></div> */}
      {/* <div
        className="w-full h-full absolute top-0 bottom-0"
        style={
          {
            // backgroundImage: `url("https://goalplusaz1.odoo.com/web_editor/shape/web_editor/Wavy/04.svg?c1=%23022974&c5=%23022974")`,
            // backgroundRepeat: "no-repeat no-repeat",
            // backgroundPosition: "0 -300px",
            // backgroundSize: "100% auto",
            // display: "block",
          }
        }
      ></div> */}
      <div className="items-center hidden lg:flex">
        <img src={leftLogo.src} alt="" className="h-[100px]" />
      </div>
      <div className="max-w-[1230px] px-5 justify-center lg:justify-between w-full flex flex-wrap z-20  h-full py-[48px] ">
        <div className="flex flex-col  pt-2  items-center gap-[10px] text-white lg:w-max w-full text-center lg:text-start mx-auto">
          <h2 className="text-[36px] lg:text-[40px] font-integral">
            Join our wellness activities
          </h2>
          {/* <p>
            Grab your Pass and secure your place at Goalplus 2023 before prices
            go up
          </p> */}
          <ALinkStyled
            className="mt-[24px]"
            target="_blank"
            href="https://www.instagram.com/goalplusaz/"
          >
            Get my GoalPass
          </ALinkStyled>

          <p className="text-[24px] text-white mt-[24px]">
            Improve your mood and concentration with <br /> yoga, pilates, and
            other wellbeing activities
          </p>
        </div>

        {/* <img
          alt="background"
          src={
            "https://goalplusaz1.odoo.com/web/image/476-f1e4cf6e/IMG_9894.svg"
          }
          className="lg:w-[390px] h-[246px] object-cover"
        /> */}
      </div>
      <div className="hidden lg:flex items-center w-[150px] h-[300px]  overflow-hidden">
        <img
          src={rightLogo.src}
          alt=""
          className=" overflow-hidden block m-auto max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default SpendYourSummersection;
