import React from "react";

type Props = {};

const Partners = (props: Props) => {
  return (
    <div className="flex justify-center w-full">
      <div className="max-w-[1230px] px-2 w-full flex flex-wrap flex-col py-5 gap-3 text-center">
        <h3 className="lg:text-[44px]">Our awesome partners and sponsors</h3>
        <h4>We are in good company.</h4>
        <div className="flex gap-4 flex-wrap justify-center">
          {/* <img
            src="https://goalplusaz1.odoo.com/web/image/website.s_reference_demo_image_1"
            height="50px"
            className="h-[100px]"
            alt="partner logo"
          />
          <img
            src="https://goalplusaz1.odoo.com/web/image/website.s_reference_demo_image_2"
            height="50px"
            className="h-[100px]"
            alt="partner logo"
          />
          <img
            src="https://goalplusaz1.odoo.com/web/image/website.s_reference_demo_image_3"
            height="50px"
            className="h-[100px]"
            alt="partner logo"
          />
          <img
            src="https://goalplusaz1.odoo.com/web/image/website.s_reference_demo_image_4"
            height="50px"
            className="h-[100px]"
            alt="partner logo"
          />
          <img
            src="https://goalplusaz1.odoo.com/web/image/website.s_reference_demo_image_5"
            height="50px"
            className="h-[100px]"
            alt="partner logo"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Partners;
