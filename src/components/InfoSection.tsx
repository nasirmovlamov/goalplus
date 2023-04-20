import React from "react";

type Props = {};
import festival from "../media/images/festival.png";
import Image from "next/image";

const InfoSection = (props: Props) => {
  return (
    <div
      className="flex w-full justify-center py-[30px] md:py-[50px] pb-[20px]  box-border"
      style={{
        backgroundImage: `url("https://goalplusaz1.odoo.com/web_editor/shape/web_editor/Airy/12_001.svg?c1=%23022974&c3=%23021F57")`,
        backgroundRepeat: "no-repeat",
        backgroundColor: "#021F57",
        backgroundSize: "cover",
        backgroundPosition: "left 0px",
        position: "relative",
      }}
    >
      <div className="max-w-[1320px] w-full h-full flex flex-col md:flex-row justify-center gap-10 lg:gap-[160px]  pb-[20px] text-center">
        {/* <div className="flex flex-col">
          <h2 className="text-5xl text-white">60</h2>
          <h3 className="text-white">days</h3>
        </div> */}
        <div className="flex flex-col w-[300px]">
          <Image
            src={festival}
            alt="image"
            width={100}
            className="w-[300px] h-auto"
          />
        </div>

        <div className="flex flex-col">
          <h2 className="text-5xl text-white">60</h2>
          <h3 className="text-white">days</h3>
        </div>
        <div className="flex flex-col">
          <h2 className="text-5xl text-white">6</h2>
          <h3 className="text-white">Amazing sports</h3>
        </div>
        <div className="flex flex-col">
          <h2 className="text-5xl text-white">1000</h2>
          <h3 className="text-white">Athletes</h3>
        </div>
        <div className="flex flex-col">
          <h2 className="text-5xl text-white">10K</h2>
          <h3 className="text-white">Visitor</h3>
        </div>
        <div className="flex flex-col">
          <h2 className="text-5xl text-white">Endless</h2>
          <h3 className="text-white">Memories</h3>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
