import React from "react";
import cardImage1 from "../media/images/card-image-1.jpeg";
import cardImage2 from "../media/images/card-image-2.jpeg";
import cardImage3 from "../media/images/card-image-3.jpeg";
import Image from "next/image";
import Link from "next/link";
import sectionImage from "../media/images/banner-2.jpeg";
type Props = {};

const GamesSections = (props: Props) => {
  return (
    <div
      className="flex w-full justify-center p-9 box-border "
      style={{
        backgroundImage: `url("https://goalplusaz1.odoo.com/web/image/483-4e11a214/DSC05401.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-[1360px] w-full h-full flex flex-wrap justify-center gap-5">
        {/* <div className="flex flex-col max-w-[320px] lg:max-w-[410px] w-full bg-white rounded-md overflow-hidden relative">
          <Image
            src={cardImage1}
            alt="card-image"
            className="w-full h-full object-cover"
          />
          <div
            className="w-full p-4 text-black flex items-center flex-col gap-2 absolute bottom-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(238,238,238,1) 0%, rgba(245,245,245,0) 100%)",
            }}
          >
            <h2 className="text-4xl text-center">Soccer</h2>
            <Link
              href="/sports-leagues"
              className="bg-[#032974] text-white rounded-md px-4 py-2 hover:bg-[#0a3b9d] transition duration-300 ease-in-out w-max"
            >
              Discover
            </Link>
          </div>
        </div> */}
        <div className="flex flex-col max-w-[320px] lg:max-w-[410px] w-full bg-white rounded-md overflow-hidden relative">
          <Image
            src={cardImage1}
            alt="card-image"
            className="w-full h-full object-cover"
          />
          <div
            className="p-4 text-black flex items-center flex-col gap-2 absolute bottom-0 "
            style={{
              background:
                "linear-gradient(90deg, rgba(238,238,238,1) 0%, rgba(245,245,245,0) 100%)",
            }}
          >
            <Link
              href="/sports-leagues"
              className="mt-5 bg-[#032974] w-max  rounded-md px-4 py-2 hover:bg-[#0a3b9d] transition duration-300 ease-in-out md:text-2xl text-[#cdf000]"
            >
              Discover Football
            </Link>
          </div>
        </div>
        <div className="flex flex-col max-w-[320px] lg:max-w-[410px] w-full bg-white rounded-md overflow-hidden relative">
          <Image
            src={cardImage2}
            alt="card-image"
            className="w-full h-full object-cover"
          />
          <div
            className="p-4 text-black flex items-center flex-col gap-2 absolute bottom-0 "
            style={{
              background:
                "linear-gradient(90deg, rgba(238,238,238,1) 0%, rgba(245,245,245,0) 100%)",
            }}
          >
            <Link
              href="/sports-leagues"
              className="mt-5 bg-[#032974] w-max  rounded-md px-4 py-2 hover:bg-[#0a3b9d] transition duration-300 ease-in-out md:text-2xl text-[#cdf000]"
            >
              Discover Volleyball
            </Link>
          </div>
        </div>
        <div className="flex flex-col max-w-[320px] lg:max-w-[410px] w-full bg-white rounded-md overflow-hidden relative">
          <Image
            src={cardImage3}
            alt="card-image"
            className="w-full h-full object-cover"
          />
          <div
            className="p-4 text-black flex items-center flex-col gap-2 absolute bottom-0 "
            style={{
              background:
                "linear-gradient(90deg, rgba(238,238,238,1) 22%, rgba(245,245,245,0) 100%)",
            }}
          >
            <Link
              href="/sports-leagues"
              className="mt-5 bg-[#032974] w-max  rounded-md px-4 py-2 hover:bg-[#0a3b9d] transition duration-300 ease-in-out md:text-2xl text-[#cdf000]"
            >
              Discover Basketball
            </Link>
          </div>
        </div>
        {/* <div className="flex flex-col max-w-[320px] lg:max-w-[410px] w-full bg-white rounded-md overflow-hidden">
          <Image
            src={cardImage3}
            alt="card-image"
            className="w-full h-[273px] object-cover"
          />
          <div className="p-4 text-black items-center flex flex-col gap-2">
            <h2 className="text-4xl text-center">Basketball</h2>
            <Link
              href="/sports-leagues"
              className="bg-[#032974]  text-white rounded-md px-4 py-2 hover:bg-[#0a3b9d] transition duration-300 ease-in-out w-max"
            >
              Discover
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default GamesSections;
