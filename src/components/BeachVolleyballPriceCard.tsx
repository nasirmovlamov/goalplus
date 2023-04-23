import { faFutbol } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import qrCode from "../media/images/qrCode.png";
import basketBall from "../media/images/basketballBall.png";
import beachBall from "../media/images/beachBall.png";
import Image from "next/image";
import Link from "next/link";

import u21 from "../media/images/Volleya.png";
import recreVolleya from "../media/images/recre volleya.png";

type Props = {
  sport: string;
  league: string;
  address: string;
  minPlayers: number;
  maxPlayers: number;
  regularTeamPrice: number;
  regularPersonPrice: number;
  earlyBirdTeamPrice: number;
  earlyBirdPersonPrice: number;
  gender: string;
};

export const BeachVolleyballPriceCard = ({
  sport,
  league,
  address,
  minPlayers,
  maxPlayers,
  regularPersonPrice,
  regularTeamPrice,
  earlyBirdPersonPrice,
  earlyBirdTeamPrice,
  gender,
}: Props) => {
  return (
    <div className="flex flex-col flex-wrap max-w-[970px] w-full rounded-2xl overflow-hidden relative">
      {/* <div className="z-20 absolute left-0 top-[90px] w-[50px] h-[50px] bg-[#E4E4E2]"></div> */}
      <div
        className="z-20 absolute -left-12 top-[90px] w-[100px] h-[100px]  rounded-full border border-[#DA2627]"
        style={{
          background:
            "linear-gradient(90deg, rgba(238,238,238,1) 0%, rgba(245,245,245,1) 100%)",
        }}
      >
        <Image src={beachBall} width={100} height={100} alt="ball image" />
      </div>
      <h2 className="w-full flex flex-wrap justify-center py-1 text-[45px] bg-[#61B2D7] text-white text-center">
        {sport}
      </h2>
      <div
        className="flex relative justify-center   pb-2 px-[30px] pb-[15px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(238,238,238,1) 0%, rgba(245,245,245,1) 35%, rgba(227,227,225,1) 61%, rgba(213,214,209,1) 100%)",
        }}
      >
        <div
          className="w-full flex flex-wrap justify-between gap-[20px] p-3 px-[30px] border-[3px] border-[#E62A2C] border-t-transparent"
          style={{
            borderRadius: "0 0 10px 10px",
          }}
        >
          <div className="flex flex-wrap gap-[10px] lg:gap-[30px]">
            <div className="ball flex w-full lg:w-[230px] h-[190px] lg:h-full mt-20px">
              <img
                src={
                  league === "U-21"
                    ? "https://lh3.googleusercontent.com/fife/APg5EObgKzG7HTM3QvECXeq4uRC5gucWLWspLM-tkDIROUV7e5gHTnZpgEFcZkTz_KXMZOlSaR_RvkoLoTvp242LQSXV2Jz5ZNiRMnVXVbUddG5ilTrRABtYtvHCfb2BB0l4TfoNqaEeaDfisFyjLydD9u0-xtJOFnayj6W3fiCgh7cNXI3vjSjwrPeVfvjKzAmd9bHsy5wRd00hBPpr5AGRI0Beyg7MdMHnfIqaN3tasJHKCivvdrEhEBqFX47bokthc0NNFlnEAYeNwV6tQ9DrB9rQmsP6BE47WEOjm_L-9_RvPWSN0rt_UBUHeuRHpnI-DiT1PahBpt3iquZ_ZtRl5vRkaWAweCmlaVDvXmeRwbv09zTQipukYDQNdAB24izsa2B5ZSebiHAhcWvWU5EVamG8xCBjQLOdWfBHvQJIDosz04EVibV41QQylcejleiVzU8uV57bvl5hQCm3fpRfnrMhN72_jOhh3ZIf4h3bW2IXsni88r-s730ZD-YewrB5sGNRn2nedWNSV0JA0wU51fDFf-PFGcNYD1qSzv6pq1Tr0F-OVpWBb4dOQSumRLglvNRiinZYe-QayeuARIJsfvCHJDhtSRLVCZlbWsrbgcze4n120SdTuWNKj25XW7tgY5jGSlFLwnmrcSo63uid_hD4J6uJ87jP8h42nENvUNJhBA0kVPvHoswJBxzEhW8L6CnsjsUlIKn86c646NEWdmQtxh59Qa-7unL8RVL-HA8t3FH2DcMIQkUhbCAiro3dSrLHmD06E7KcgFkL0BcCzk6ZajVlGwZWeOcL-MlYejnBB9yZcsXICJJ1rv24ctuM4Xet_KYMIT7vxR5tE8cBxg9BPOpsf_cGOBMUwfgrgAZVyzMfYnD53L8oMBsp75BmEGxyoVR7DczzZ8LDwgky9K55CE9_F-sB9nhBO1YgRBRXRo4LGmdhWS12Dq-L6rdPmGxKYctXffqxf7F5k0BdRvbjXybne9XRrdjhov8XP9FTBhkxKF3cIdqCRfLp_9zGDsaqt4anYlGY1Ps4ZmCIq-Xq3nipM3r8sH0bA46g2QfMfXIIKcLbBRmRSMolDsKuuXWgwW7VTrn2TyDgAKEW8nYXaYGk7VxyLXXv_Up1UvkwsbNQEKAvWKXeQcd982HNYg4y3R75PHdi2vv276vrcdEkElv7fTrzXn-IGKc2ZiM60ooJYzx-mocnFAiCcNFSlK_AaC3pniPmVBzuQmzVsS150STeHuCV4c8CvE40fAC52qas1rCn1xG2k9Yka8EEVi096AUNpV-T0SD3vBqfNQcVT9V0GxjmdWxYg2sPio9d9ptAGQelPCHK_HGgFr2qVCd_gUJHvc6zX7PlqFGviNz6OUZjYlrtADIARgwQOTUEE_4teY4e1QZmyq5T3525mH7cBMB0DxyPXNQp5kphkVqROKmatNQR9JBjwAdVY8nk21MxCnMyIqJF3zRDQZVmWZdSZj5-kLsqqpFf-YgRxZxYAB0qrkT6XlvAUTBa4pSFR9hbZ-b9ZJq4z0DckAd00uXGuqapv5zPO-JhmICbN4Vad0xoAi7Dbdhz=w2132-h2350"
                    : league === "Recreational"
                    ? recreVolleya.src
                    : ""
                }
                alt="place image"
                className="object-cover w-full lg:w-[230px] h-[190px] lg:h-full rounded-lg"
              />
            </div>
            <div className="flex flex-col text-[#38383A] ">
              <h3 className="text-[24px] lg:text-[36px]">
                {gender === "male" ? "Men's" : "Female"} {league}
              </h3>
              <p className="text-base flex flex-col">
                <span className="block"> Date 15 June ~ 15 August</span>
                <span className="block text-[10px] leading-3">
                  (Day of the week)
                </span>
              </p>
              <p className="text-base mt-1">
                Min {minPlayers} and Max {maxPlayers} players
              </p>
              <div>
                <p className=" text-xs line-through text-red-500">
                  Regular price : {regularTeamPrice} azn
                </p>
                <p className=" text-xs ">
                  Early bird price per athlete: {earlyBirdPersonPrice} azn
                </p>
                <p className=" text-xs ">
                  Early bird price per team: {earlyBirdTeamPrice} azn
                </p>
              </div>
              <p className="text-base">Duration : 6 weeks</p>
              <p className="text-base">{address}</p>

              <div className="flex justify-start mt-2">
                <Link
                  href={"/register?sport=beachVolleyball4v4"}
                  className="bg-[#032974] text-white rounded-md px-2 py-1 hover:bg-[#0a3b9d] transition duration-300 ease-in-out text-xs"
                >
                  Register now
                </Link>
              </div>
            </div>
          </div>
          <Image
            src={qrCode}
            width={100}
            alt="qrCode"
            className="ml-10 hidden lg:block"
          />
        </div>
      </div>
    </div>
  );
};
