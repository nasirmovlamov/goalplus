import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";
import svgCarusel from "../media/images/svg-carusel.svg";
import sliderImage3 from "../media/images/home-slider-image-3.jpg";
import sliderImage2 from "../media/images/home-slider-image-2.jpg";
import mobileSliderImage from "../media/images/mobileSlider.jpeg";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { useWindowWidth } from "@react-hook/window-size";
import IframeBlockWrapper from "./IframeBlock";
import IframeBlock from "./IframeBlock";
import useWindowDimensions from "./useWindowDimension";
import Countdown from "./Countdown";
import { LinkStyled } from "./LinkStyled";
import { LinkStyled2 } from "./LinkStyled2";
import { LinkStyled3 } from "./LinkStyled3";
import ourCommunityImage from "@/media/images/ourCommunityText.svg";

export default function HomeMainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots: any) => (
      <div
        style={{
          backgroundColor: "transparent",
          bottom: "10px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <ul
          style={{
            margin: "2px",
            display: "flex",
            width: "max-content",
            gap: "5px",
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i: any) => (
      // if you want to render a custom dot, you can do it here
      <div className="text-white"></div>
    ),
  };

  // const { width: windowWidth } = useWindowDimensions();
  // const [widthWindow, setWidthWindow] = useState(0);
  // useEffect(() => {
  //   if (windowWidth) {
  //     setWidthWindow(windowWidth);
  //   }
  // }, [windowWidth]);
  // if (!windowWidth) {
  //   return <></>;
  // }

  return (
    <div className="bg-[#031F57] h-auto">
      <Slider {...settings}>
        <div className="w-full h-[700px]  md:h-[85vh] flex justify-center items-center text-white box-border p-10  2xl:p-[122px] relative">
          <div className="flex flex-col z-10   items-center">
            <h1 className="text-xl  lg:text-[56px] text-center font-integral  leading-normal">
              Become a member of <br /> our community
            </h1>
            {/* <h1>
              <img src={ourCommunityImage.src}
                className="p-1" alt="" />
            </h1> */}
            <p className="text-center mt-[28px] text-[20px]">
              Register as an athlete or get your membership <br /> for Goalplus
              Summer 2023
            </p>

            {/* <button className="mt-5 bg-[#032974] w-max text-white rounded-md px-4 py-2 hover:bg-[#0a3b9d] transition duration-300 ease-in-out text-2xl">
              Discover Now
            </button> */}
            {/* <FontAwesomeIcon icon={faAngleRight} /> */}

            {/* cool background frame */}
            <LinkStyled3 className="mt-[48px]" href="/ticketing/goalplus">
              Get a Goalpass
            </LinkStyled3>
            {/* <Countdown targetDate="2023-06-18T18:00:00" /> */}
          </div>
          <div
            className={
              " w-full h-full  absolute top-0 left-0 -z-10 " +
              `bg-[rgba(0,0,0,0.69)]`
            }
          >
            {/* <Image
              src={svgCarusel}
              alt=""
              className="w-full h-full bg-center lg:min-h-[1054px]"
              style={{ backgroundSize: "100% 100%" }}
            /> */}
          </div>
          <div className="-z-20">
            <IframeBlock />
          </div>
        </div>
        <div className="w-full h-[700px]  md:h-[85vh] flex justify-center items-center text-white box-border p-10  2xl:p-[122px] relative">
          <div className="flex flex-col z-10  justify-center items-center">
            <h1 className="text-xl lg:text-[56px] text-center font-integral leading-normal">
              Score goals on and <br /> off the field
            </h1>

            <p className="text-center mt-[48px] text-[20px]">
              Info, perks, shcedules, activities, standings, all in one place!
            </p>

            <LinkStyled3 className="mt-[48px]" href="/register">
              Join Now
            </LinkStyled3>
            <p className="hidden md:inlin">
              Takes you to the page where you need to first create your account
            </p>
          </div>
          <div className="w-full h-full bg-[rgba(0,0,0,0.75)] absolute top-0 left-0 -z-10">
            {/* <Image
              src={svgCarusel}
              alt=""
              className="w-full h-full bg-center lg:min-h-[1054px]"
              style={{ backgroundSize: "100% 100%" }}
            /> */}
          </div>
          <div className="-z-20">
            <Image
              alt="main image"
              src={sliderImage2}
              style={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                objectFit: "cover",
                display: "block",
                overflow: "hidden",
                backgroundRepeat: "no-repeat",
                pointerEvents: "none",
                height: "100vh",
                zIndex: -20,
              }}
              className="w-full h-full absolute top-0 left-0 z-0"
            />
          </div>
        </div>
        <div className="w-full h-[700px]  md:h-[85vh] flex justify-center items-center text-white box-border p-10  2xl:p-[122px] relative">
          <div className="flex flex-col z-10  justify-center items-center">
            <h1 className="text-xl lg:text-[56px] text-center font-integral leading-normal">
              Capture your memories <br />
              with Goalplus
            </h1>

            <p className="text-center mt-[48px] text-[20px]">
              Goalplus Summer 2023
            </p>

            <LinkStyled3 className="mt-[48px]" href="/register">
              Discover Now
            </LinkStyled3>
          </div>
          <div className="w-full h-full bg-[rgba(0,0,0,0.75)] absolute top-0 left-0 -z-10">
            {/* <Image
              src={svgCarusel}
              alt=""
              className="w-full h-full bg-center lg:min-h-[1054px]"
              style={{ backgroundSize: "100% 100%" }}
            /> */}
          </div>
          <div className="-z-20">
            <Image
              alt="main image"
              src={sliderImage3}
              style={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                display: "block",
                overflow: "hidden",
                objectFit: "cover",
                backgroundRepeat: "no-repeat",
                pointerEvents: "none",
                height: "100vh",
                zIndex: -20,
              }}
              className="w-full h-full absolute top-0 left-0 z-0"
            />
          </div>
        </div>
        {/* <div>
          <img src="http://placekitten.com/g/400/600" />
        </div>
        <div>
          <img src="http://placekitten.com/g/400/200" />
        </div> */}
      </Slider>
    </div>
  );
}

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className + "  z-50 !right-7  "}
      style={{
        ...style,
        color: "white",
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faAngleRight} className="w-10 h-10 text-lg" />
      <div className="!w-10 !h-10 !text-white">next</div>
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className + "  z-50 !left-2 "}
      style={{
        ...style,
        color: "white",
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faAngleLeft} className="w-10 h-10 text-lg" />
      <div className="!w-10 !h-10 !text-white">next</div>
    </div>
  );
}
