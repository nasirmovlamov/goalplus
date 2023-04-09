import React from "react";

type Props = {};

const InfoSection = (props: Props) => {
  return (
    <div
      className="flex w-full justify-center pt-[72px] pb-[20px]  "
      style={{
        backgroundImage: `url("https://goalplusaz1.odoo.com/web_editor/shape/web_editor/Airy/12_001.svg?c1=%23022974&c3=%23021F57")`,
        backgroundRepeat: "no-repeat",
        backgroundColor: "#021F57",
        backgroundSize: "cover",
        backgroundPosition: "left 0px",
        position: "relative",
      }}
    >
      <div className="max-w-[1320px] w-full h-full flex justify-center gap-10 lg:gap-[160px] pt-[12px] pb-[20px] text-center">
        <div className="flex flex-col">
          <h2 className="text-5xl text-white">40</h2>
          <h3 className="text-white">S&U</h3>
        </div>
        <div className="flex flex-col">
          <h2 className="text-5xl text-white">45</h2>
          <h3 className="text-white">days</h3>
        </div>
        <div className="flex flex-col">
          <h2 className="text-5xl text-white">8</h2>
          <h3 className="text-white">Amazing sports</h3>
        </div>
        <div className="flex flex-col">
          <h2 className="text-5xl text-white">37</h2>
          <h3 className="text-white">Outstandings</h3>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
