import React from "react";

type Props = {};
import festival from "../media/images/festival.png";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <div className="flex justify-center mx-auto flex-col gap-4 items-center">
        <div className="max-w-[1320px] w-full h-full flex flex-wrap flex-col md:flex-row justify-center gap-10 md:gap-[30px] lg:gap-[60px] 2xl:gap-[70px]  pb-[20px] text-center">
          {/* <div className="flex flex-col">
          <h2 className="text-5xl text-white">60</h2>
          <h3 className="text-white">days</h3>
        </div> */}
          {/*  <div className="flex flex-col w-[300px]">
          <Image
            src={festival}
            alt="image"
            width={100}
            className="w-[300px] h-auto"
          />
        </div> */}

          <div className="flex gap-3">
            <img
              src="https://lh3.googleusercontent.com/fife/APg5EOZLNVl56spNM0G4QdLQrxjlt8KQbmIhwVspjkouFpngZOJv0gGoDwR8WSraiiJtI8lfvf_lwEro2HmkETYKDsX5H5G_d4jO01ISWc8zetFWOfnaH0Oyzv23qGUbIucGbHSLH1i0zO002LLvYqCDsrl-5qWLHPCM9HJcwCjOsyYftRQHUqhButMRLKjPLBUjBmwmDZVH71RGHibkdJU6892JHDFmGuEdz0o5Mo5p3ZaCWclii9zZQYa0cG2wE5S0TZdyWADOMUqMGDb2TdMVVv1SNk-ZA-pWWUrDaO1dqwgJ8YGW1VJIsYsdnZmfibXj8euni-1B8dH-GBZJpZ7jym2FzpTAOtIwnPK-01_HSFUCugMfApZf0y0xcCQ_JX1GT_mZo33-YyVIDYCatE78EtAyim3_kQmvx6TOlwCd4mImFUv66heww1Hi3f6b44gJo036r13rGR3yo8kOL4nH99DYNsq40RwZ31L6ZeySI2JFeI3siiivcLJgXlNbTTWtIK3xmIeqVwKFW2DOyhDOUrejdfcmJhXBjsT_DvA0CTi4JOmKFxIfkTmM4gDvILDN8FoJOljdPD0AUq1u6XM-vDNLpgwMpD7ms8vbgdq98iHHjuaPK9_mkBUPGrgorA3c7_6TPw1D2gSe8imgVjzxomgsJXklSKkISXSxHryya4RfYlizmucrqwvmXEHLM3iO_GwVR1pc0zRKESbaGomX2eWCHehYSEks4afA_VD6SFSMJNS4wZ8HCryxdgVry4JMa212JanspeuffjnItdApom1NiDCbvePRcLzuy4SLa4eA3sa-GA3s9Zek4V8oaF8AWmwikb-MBlrbq5s8lG07Owd_QdRvgUWPh2TXqbs84feEuDvZ8XuOpRKyRXck586cicu2ZF4xUhgeP8K_ANZ06RoOAxw1VtZ4XhJAADYJmBTGpHdi4FIdYLfqaFetco6ML0EaRjqbS25u92ph9uQmcBIXpToCAUOrSPMbcEcIIF7fXHw0Xx-Aii0k2kMDAqk3f95340VTPmMte-K2NzEepGAgaQuQKCmc7zBlsolAfYnO0WeKGcPFkoXSkFIbV7ZwWt6bePe9v7iemSjrQWD9p5vymShGIiK2YMB1yHDZOWVNyt9qs8p9NcuE1pfr8JjZK8IYWroQnbBco7HDNBhmy7V-LekvjdmlBSpSIHiX1l1S1b0e0oiZIOAQYGGrUCT8r0LYbq4FdEeDR14epnc1WAHJWM_ZHSGhTdL1Bjxvm5yEsIre5hCDCPhg2Pb2oBak2RTGiwpigDGC51lHkDHfU5WIBbtkQGmHJGTTiS81HOX6vaVTs9gwPjR84Ld0kus9BlVgO2P4vYhXcugiH6kSoDnkuvNr_szEZ3lpu35eHm4rZsthx-bnx3VG0tFjqd-pZ7CgQfu0EiiQrAMjIIKGsewSM_8e1mgpxmuipb1OLbZPttXrF8doGDrK_oYefkNd9TDcF6Icm-eaPwz92IKCpt7O16r7VgSInZZWe9bmw4-JiR6mR_bSZSf9mEq6kt7Wn1Lys_-iAP8AvD6bZqgY_NdYq4Pd4aH8h1fH=w4112-h2350"
              className="w-[80px] h-[80px]"
              alt=""
            />
            <div>
              <h2 className="text-5xl text-white">60</h2>
              <h3 className="text-white">Days</h3>
            </div>
          </div>
          <div className="flex gap-4">
            <img
              src="https://lh3.google.com/u/0/d/1o6OVia-GLiiXiYXP9cG6CaRpEISQbt73=w1910-h2318-iv1"
              className="w-[80px] h-[80px]"
              alt=""
            />
            <div>
              <h2 className="text-5xl text-white">6</h2>
              <h3 className="text-white">Sports</h3>
            </div>
          </div>
          <div className="flex gap-3">
            <img
              src="https://lh3.google.com/u/0/d/1FrwgVjSnoZzBoACd22hDGZBUyepytusA=w1910-h2318-iv1"
              className="w-[80px] h-[80px]"
              alt=""
            />
            <div>
              <h2 className="text-5xl text-white">1000</h2>
              <h3 className="text-white">Athletes</h3>
            </div>
          </div>
          <div className="flex gap-3">
            <img
              src="https://lh3.google.com/u/0/d/1vESrrU99Bs8t9jcxb4ZEdrNa27YZXaN5=w1910-h2318-iv1"
              className="w-[80px] h-[80px]"
              alt=""
            />
            <div>
              <h2 className="text-5xl text-white">10K</h2>
              <h3 className="text-white">Visitors</h3>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <img
              src="https://lh3.google.com/u/0/d/1i7qTh4Wr00L8nqDzgIOOPdh_QJHy8IVx=w1910-h2318-iv1"
              className="w-[80px] h-[80px]"
              alt=""
            />
            <div>
              <h2 className="text-5xl text-white">Memories</h2>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-5 justify-end">
          {/* <Link
            href="#"
            className="text-lg bg-[#031F57] text-white rounded-md px-4 py-2 hover:bg-[#0a3b9d] transition duration-300 ease-in-out w-max h-max"
          >
            Apply as a crew member
          </Link> */}
          <Link
            target="_blank"
            href="https://t.me/goalpluscommunity"
            className="text-lg bg-[#031F57] text-white rounded-md px-4 py-2 hover:bg-[#0a3b9d] transition duration-300 ease-in-out w-max h-max shadow-lg"
            style={{
              boxShadow: "0px 0px 5px 0px #cdf000",
            }}
          >
            Join our telegram community
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
