import {
  faCube,
  faShield,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

import registerInfoSvg from "../media/images/registerinfo-svg.svg";
import Image from "next/image";
type Props = {};

const RegisterInfoSection = (props: Props) => {
  return (
    <div className="flex flex-wrap max-h-[674px] h-full box-border overflow-hidden">
      {/* Block1 */}
      <div
        className="w-full lg:w-[50%] flex justify-center items-center h-full relative p-5 "
        style={{
          backgroundImage: `url("https://goalplusaz1.odoo.com/web/image/509-17b1515e/DSC_0139.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundColor: "#021F57",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div
          className="flex justify-center items-center flex-col text-white gap-[15px] z-20 w-full h-full p-[5px] md:p-[50px] lg:p-[174px]"
          style={{
            backgroundImage: `url("https://goalplusaz1.odoo.com/web_editor/shape/web_editor/Wavy/27.svg?c1=%23021F57&c2=%23021F57")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <FontAwesomeIcon icon={faShieldHalved} size="5x" />
          <h3 className="w-max lg:text-[44px]">Athlete Registration</h3>
          <p className="w-max">
            Participate in sports, score goals on the field
          </p>
          <Link
            href="/contactus"
            className=" bg-[#ffffff] text-[#032974] rounded-md px-4 py-2 hover:bg-[#98a3b9] transition duration-300 ease-in-out"
          >
            More Details
          </Link>
        </div>
      </div>

      {/* Block 2 */}
      <div
        className="w-full lg:w-[50%] flex justify-center items-center h-full relative box-border p-3"
        style={{
          backgroundImage: `url("https://goalplusaz1.odoo.com/web/image/510-4e11a214/DSC05401.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundColor: "#021F57",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div
          className="flex justify-center items-center text-white flex-col text-center gap-[15px] z-20 p-[5px] md:p-[50px] lg:p-[174px]"
          style={{
            backgroundImage: `url("https://goalplusaz1.odoo.com/web_editor/shape/web_editor/Wavy/27.svg?c1=%23021F57&c2=%23021F57")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <FontAwesomeIcon icon={faCube} size="5x" />
          <h3 className=" lg:text-[44px] w-max">Community Pass</h3>
          <p className="w-max">
            Stay active, connected, score goals off the field
          </p>
          <Link
            href="/contactus"
            className=" bg-[#ffffff] text-[#032974] rounded-md px-4 py-2 hover:bg-[#98a3b9] transition duration-300 ease-in-out"
          >
            More Details
          </Link>
        </div>
        <Image
          src={registerInfoSvg}
          alt="logo"
          className="w-[310px] h-[150px] absolute "
        />
      </div>
    </div>
  );
};

export default RegisterInfoSection;
