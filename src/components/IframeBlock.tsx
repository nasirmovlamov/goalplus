import { useWindowWidth } from "@react-hook/window-size";
import React, { useEffect, useMemo, useState } from "react";
import useWindowDimensions from "./useWindowDimension";
import Image from "next/image";
import sliderImage2 from "../media/images/home-slider-image-2.jpg";
import svgCarusel from "../media/images/svg-carusel.svg";
import voleyballImage from "../media/images/card-image-2.jpeg";
import bannerImage from "../media/images/bannerHomeSlider.jpg";

const IframeBlock = () => {
  const { width: windowWidth } = useWindowDimensions();
  const [widthWindow, setWidthWindow] = useState(0);
  useEffect(() => {
    if (windowWidth) {
      setWidthWindow(windowWidth);
    }
  }, [windowWidth]);

  return widthWindow > 500 ? (
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
        backgroundSize: "cover",
      }}
      className="w-full h-full absolute top-0 left-0 z-0 md:h-[110vh]"
      src="https://www.youtube.com/embed/-BDyUQgRaYE?rel=0&autoplay=1&mute=1&enablejsapi=1&controls=0&loop=1&playlist=-BDyUQgRaYE&fs=0&modestbranding=1"
    ></iframe>
  ) : (
    <>
      <div className="-z-20">
        <Image
          alt="main image"
          src={bannerImage}
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
    </>
  );
};

export default IframeBlock;
