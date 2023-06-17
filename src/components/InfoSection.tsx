import React from "react";

type Props = {};
import festival from "../media/images/festival.png";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinkStyled2 } from "./LinkStyled2";
import { ALinkStyled2 } from "./AlinkStyled2";
import calendarIcon from "@/media/images/cil_calendar.png";
import sportIcon from "@/media/images/sportIcon.png";
import humanRunningIcon from "@/media/images/humanRunningIcon.png";
import visitorBadgeIcon from "@/media/images/visitorBadgeIcon.png";
import mediaIcon from "@/media/images/mediaIcon.png";

const InfoSection = (props: Props) => {
  return (
    <div
      className="flex w-full justify-center py-[30px] md:py-[56px] pb-[20px]  box-border"
      style={{
        backgroundColor: "#05055B",
      }}
    >
      <div className="flex justify-center mx-auto flex-col gap-4 items-center">
        <div className="max-w-[1320px] w-full h-full flex flex-wrap flex-col md:flex-row justify-center gap-10 md:gap-[30px] lg:gap-[60px] 2xl:gap-[70px]  pb-[20px] ">
          {/* <div className="flex flex-col">
          <h2 className="text-[30px] text-white">60</h2>
          <h3 className="text-white">days</h3>
        </div> */}
          {/*  <div className="flex flex-col w-[300px]">
          <Image
            src={festival}
            alt="image"
            width={100}
            className="w-[300px] h-auto"
          />
        </div> */}

          <div className="flex gap-3">
            <img src={calendarIcon.src} className="w-[80px] h-[80px]" alt="" />
            <div className="flex flex-col justify-start">
              <h2 className="text-[30px] text-white">60</h2>
              <h3 className="text-[30px] text-white">days</h3>
            </div>
          </div>
          <div className="flex gap-4">
            <img src={sportIcon.src} className="w-[80px] h-[80px]" alt="" />
            <div>
              <h2 className="text-[30px] text-white">6</h2>
              <h3 className="text-[30px] text-white">sports</h3>
            </div>
          </div>
          <div className="flex gap-3">
            <img
              src={humanRunningIcon.src}
              className="w-[80px] h-[80px]"
              alt=""
            />
            <div>
              <h2 className="text-[30px] text-white">1000</h2>
              <h3 className="text-[30px] text-white">athletes</h3>
            </div>
          </div>
          <div className="flex gap-3">
            <img
              src={visitorBadgeIcon.src}
              className="w-[60px] h-[80px]"
              alt=""
            />
            <div>
              <h2 className="text-[30px] text-white">10K</h2>
              <h3 className="text-[30px] text-white">visitors</h3>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <img src={mediaIcon.src} className="w-[80px] h-[80px]" alt="" />
            <div>
              <h3 className="text-[30px] text-white">Infinite</h3>

              <h2 className="text-[30px] text-white">memories</h2>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-5 justify-end">
          {/* <Link
            href="#"
            className="text-lg bg-[#031F57] text-white rounded-md px-4 py-2 hover:bg-[#0a3b9d] transition duration-300 ease-in-out w-max h-max"
          >
            Apply as a crew member
          </Link> */}
          <ALinkStyled2
            className=" max-w-[458px] "
            href="https://t.me/goalpluscommunity"
          >
            Join our telegram community
          </ALinkStyled2>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
