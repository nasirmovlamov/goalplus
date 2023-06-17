import {
  faCube,
  faShield,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import workerImage from "@/media/images/worker.png";
import handImage from "@/media/images/handImage.png";
import registerInfoSvg from "../media/images/registerinfo-svg.svg";
import Image from "next/image";
import { LinkStyled } from "./LinkStyled";
type Props = {};

const RegisterInfoSection = (props: Props) => {
  return (
    <div className="flex gap-[32px]  justify-center flex-wrap  box-border overflow-hidden bg-white py-[128px]">
      {/* Block1 */}
      <div
        className="w-full max-w-[555px] flex justify-center items-center relative p-5 h-[433px] bg-[#E1E1E1] rounded-xl"
        // style={{
        //   backgroundImage: `url("https://goalplusaz1.odoo.com/web/image/509-17b1515e/DSC_0139.jpg")`,
        //   backgroundRepeat: "no-repeat",
        //   backgroundColor: "#021F57",
        //   backgroundPosition: "center",
        //   backgroundSize: "cover",
        // }}
      >
        <div
          className="flex justify-center items-center flex-col text-white z-20 w-full h-full p-[5px] py-[48px] lg:px-[114px]"
          // style={{
          //   backgroundImage: `url("https://goalplusaz1.odoo.com/web_editor/shape/web_editor/Wavy/27.svg?c1=%23021F57&c2=%23021F57")`,
          //   backgroundRepeat: "no-repeat",
          //   backgroundPosition: "center",
          //   backgroundSize: "cover",
          // }}
        >
          {/* <FontAwesomeIcon icon={faShieldHalved} size="5x" /> */}
          <img src={workerImage.src} alt="" className="w-[142px] h-[130px]" />
          <h3 className="w-max lg:text-[24px] mt-[24px] text-[#585858] font-integral">
            Athlete Registration
          </h3>
          <p className="w-max text-[#9B9B9B] text-[20px] mt-[8px]">
            Participate in sports leagues
          </p>
          <LinkStyled
            href="/sports-leagues"
            style={{
              boxShadow: "0px 0px 0px 2px rgba(255,255,255,0.5)",
            }}
            className=" mt-[48px] "
          >
            More Details
          </LinkStyled>
        </div>
      </div>

      {/* Block 2 */}
      <div
        className="w-full max-w-[555px] flex justify-center items-center relative p-5 h-[433px] bg-[#E1E1E1] rounded-xl"
        // style={{
        //   backgroundImage: `url("https://goalplusaz1.odoo.com/web/image/510-4e11a214/DSC05401.jpg")`,
        //   backgroundRepeat: "no-repeat",
        //   backgroundColor: "#021F57",
        //   backgroundPosition: "center",
        //   backgroundSize: "cover",
        // }}
      >
        <div
          className="flex justify-center items-center flex-col text-white z-20 w-full h-full p-[5px] py-[48px] lg:px-[114px]"
          // style={{
          //   backgroundImage: `url("https://goalplusaz1.odoo.com/web_editor/shape/web_editor/Wavy/27.svg?c1=%23021F57&c2=%23021F57")`,
          //   backgroundRepeat: "no-repeat",
          //   backgroundPosition: "center",
          //   backgroundSize: "cover",
          // }}
        >
          <img src={handImage.src} alt="" className="w-[142px] h-[130px]" />
          <h3 className="w-max lg:text-[24px] mt-[24px] text-[#585858] font-integral">
            Community Pass
          </h3>
          <p className="w-max text-[#9B9B9B] text-[20px] mt-[8px] text-center">
            Spent the most memorable <br /> summer with Goalplus
          </p>
          <LinkStyled
            href="/ticketing/goalplus"
            style={{
              boxShadow: "0px 0px 0px 2px rgba(255,255,255,0.5)",
            }}
            className=" mt-[20px] "
          >
            More Details
          </LinkStyled>
        </div>
      </div>
    </div>
  );
};

export default RegisterInfoSection;
