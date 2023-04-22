import React from "react";

type Props = {};

const AllAboutPeopleSection = (props: Props) => {
  return (
    <div
      className="w-full flex justify-center items-center relative min-h-[200px]"
      style={{
        backgroundImage: `url("https://goalplusaz1.odoo.com/web/image/486-80c1d84d/IMG_1908.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundColor: "#021F57",
        backgroundPosition: "0px -350px",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full h-full absolute top-0 left-0 bg-[#00000077]"></div>
      <div className="max-w-[1230px] w-full  flex-col  justify-between z-20   gap-y-2 flex box-border p-5">
        <h2 className="text-[36px] lg:text-[44px] text-white text-center">
          #It&apos;s all about people
        </h2>
        <div className="flex gap-5 flex-wrap w-full">
          {/* <img
            src="https://goalplusaz1.odoo.com/web/image/498-4013269f/DSC05401.jpg"
            className="lg:w-[344px] h-[282px]  object-cover rounded-md  shadow-md"
          />
          <img
            src="https://goalplusaz1.odoo.com/web/image/495-baec686a/004X7870.jpg"
            className="lg:w-[344px] h-[282px] object-cover  rounded-md shadow-md"
          />
          <img
            src="https://goalplusaz1.odoo.com/web/image/479-5af32d73/DSC00014%20%281%29.jpg"
            className="lg:w-[344px] h-[282px]  object-cover  rounded-md shadow-md"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default AllAboutPeopleSection;
