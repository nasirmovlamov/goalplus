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
import mitFuseLogo from "../media/images/sponsors/mitFuse.png";
import mitCenterELogo from "../media/images/sponsors/mitCenterE.png";
import mitSandboxLogo from "../media/images/sponsors/mitSandbox.png";
import mitVmsLogo from "../media/images/sponsors/mitVms.png";

const Partners = (props: Props) => {
  return (
    <div className="flex justify-center w-full">
      <div className="pt-[120px] pb-[120px]  px-2 w-full flex flex-wrap flex-col py-5 gap-3 text-center">
        <h3 className="pb-[48px] lg:text-[44px] font-integral text-[#05055B]">
          Our partners and sponsors
        </h3>
        <div className="flex gap-20 flex-wrap justify-center">
          <img
            src={affaLogo.src}
            className="w-[203px] h-[203px]"
            alt="partner logo"
          />
          <img
            src={aqaLogo.src}
            className="w-[203px] h-[203px]"
            alt="partner logo"
          />
          <img
            src={blckaLogo.src}
            className="w-[203px] h-[203px]"
            alt="partner logo"
          />
          <img
            src={fb2aLogo.src}
            className="w-[203px] h-[203px]"
            alt="partner logo"
          />
          <img
            src={skodaaLogo.src}
            className="w-[203px] h-[203px]"
            alt="partner logo"
          />
          <img
            src={rahatLogo.src}
            className="w-[203px] h-[203px]"
            alt="partner logo"
          />
          <img
            src={fbaLogo.src}
            className="w-[203px] h-[203px]"
            alt="partner logo"
          />
          <img
            src={misliaLogo.src}
            className="w-[203px] h-[203px]"
            alt="partner logo"
          />
          <img
            src={bakuElectroLogo.src}
            className="w-[203px] h-[203px]"
            alt="partner logo"
          />
          <img
            src={siraLogo.src}
            className="w-[203px] h-[203px]"
            alt="partner logo"
          />
          <img
            src={dersaLogo.src}
            className="w-[203px] h-[203px]"
            alt="partner logo"
          />
          <img
            src={WoltLogo.src}
            className="w-[203px] h-[203px]"
            alt="partner logo"
          />

          {/* <img src={mtcHexLogo.src} className="h-[60px]" alt="partner logo" /> */}
        </div>

        {/* mitVmsLogo, mitSandboxLogo, mitCenterELogo, mitFuseLogo; */}
        <div className="flex justify-center flex-wrap gap-[34px] mt-[100px]">
          <div className="flex flex-col">
            <h3 className="text-[40px] font-integral text-center text-[#05055B]">
              mentored by
            </h3>
            <div className="flex flex-wrap justify-center gap-[31px] mt-[24px]">
              <img
                src={mitVmsLogo.src}
                className="w-[203px] h-[203px]"
                alt="partner logo"
              />
              <img
                src={mitCenterELogo.src}
                className="w-[203px] h-[203px]"
                alt="partner logo"
              />
            </div>
          </div>
          <div className="flex flex-col ">
            <h3 className="text-[40px] font-integral text-center text-[#05055B]">
              alumnus by
            </h3>
            <div className="flex flex-wrap justify-center gap-[31px] mt-[24px]">
              <img
                src={mitSandboxLogo.src}
                className="w-[203px] h-[203px]"
                alt="partner logo"
              />
              <img
                src={mitFuseLogo.src}
                className="w-[203px] h-[203px]"
                alt="partner logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
