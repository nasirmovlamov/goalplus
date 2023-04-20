import React from "react";

type Props = {};

const Copyright = (props: Props) => {
  return (
    <div className="w-full flex justify-center items-center bg-[#031B4A] pt-2 pb-2">
      <div className=" text-center md:text-start max-w-[1230px] flex justify-center flex-wrap w-full py-2 px-2 text-white gap-5">
        <p className="w-full md:w-max">Copyright © GoalPlus</p>
        {/* <p>Powered by Odoo - The #1 Open Source eCommerce</p> */}
      </div>
    </div>
  );
};

export default Copyright;
