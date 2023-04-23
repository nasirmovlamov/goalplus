import React from "react";
type Props = {};
import affaLogo from "../media/images/sponsors/affaa.png";
import aqaLogo from "../media/images/sponsors/aqa.png";
import bakuElectroLogo from "../media/images/sponsors/bakuElectro.png";
import blckaLogo from "../media/images/sponsors/blcka.png";
import dersaLogo from "../media/images/sponsors/dersa.png";
import fb2aLogo from "../media/images/sponsors/fb2a.png";
import fbaLogo from "../media/images/sponsors/fba.png";
import misliaLogo from "../media/images/sponsors/mislia.png";
import mtcHexLogo from "../media/images/sponsors/mtcHex.png";
import rahatLogo from "../media/images/sponsors/rahat.png";
import siraLogo from "../media/images/sponsors/sira.png";
import skodaaLogo from "../media/images/sponsors/skodaa.png";
import WoltLogo from "../media/images/sponsors/Wolt.png";

const Partners = (props: Props) => {
  return (
    <div className="flex justify-center w-full">
      <div className="max-w-[1140px] px-2 w-full flex flex-wrap flex-col py-5 gap-3 text-center">
        <h3 className="lg:text-[44px]">Our awesome partners and sponsors</h3>
        <h4>We are in good company.</h4>
        <div className="flex gap-20 flex-wrap justify-center">
          <img src={affaLogo.src} className="h-[70px]" alt="partner logo" />
          <img src={aqaLogo.src} className="h-[90px]" alt="partner logo" />
          <img
            src={bakuElectroLogo.src}
            className="h-[70px] mt-3"
            alt="partner logo"
          />
          <img src={blckaLogo.src} className="h-[60px] mt-3" alt="partner logo" />
          <img src={dersaLogo.src} className="h-[60px]" alt="partner logo" />
          <img src={fb2aLogo.src} className="h-[60px]" alt="partner logo" />
          <img src={fbaLogo.src} className="h-[100px] -mt-5" alt="partner logo" />
          <img src={misliaLogo.src} className="h-[50px]" alt="partner logo" />
          <img src={mtcHexLogo.src} className="h-[60px]" alt="partner logo" />
          <img src={siraLogo.src} className="h-[60px]" alt="partner logo" />
          <img src={skodaaLogo.src} className="h-[60px]" alt="partner logo" />
          <img src={WoltLogo.src} className="h-[70px]" alt="partner logo" />
          <img src={rahatLogo.src} className="h-[100px] -mt-3" alt="partner logo" />
        </div>
      </div>
    </div>
  );
};

export default Partners;
