import React from "react";
import mobileSliderImage from "../media/images/mobileSlider.jpeg";
import Image from "next/image";

type Props = {
  size: number;
};

export const YoutubeVideo = ({ size }: Props) => {
  return typeof window && size < 768 ? (
    <Image
      alt="main image"
      src={mobileSliderImage}
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
  ) : (
    <iframe
      style={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "block",
        overflow: "hidden",
        backgroundRepeat: "no-repeat",
        pointerEvents: "none",
        zIndex: -20,
      }}
      className="w-full h-full absolute top-0 left-0 z-0 md:h-[100vh]"
      src="https://www.youtube.com/embed/-BDyUQgRaYE?rel=0&autoplay=1&mute=1&enablejsapi=1&controls=0&loop=1&playlist=-BDyUQgRaYE&fs=0&modestbranding=1"
    ></iframe>
  );
};
