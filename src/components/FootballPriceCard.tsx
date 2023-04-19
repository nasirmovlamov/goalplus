import { faFutbol } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import qrCode from "../media/images/qrCode.png";
import nikeBall from "../media/images/nikeBall.png";
import nikeGirlsBall2 from "../media/images/nikegirlsBall2.png";
import Image from "next/image";
import Link from "next/link";

type Props = {
  sport:
    | "Football"
    | "Girls Football"
    | "Basketball"
    | "Tennis"
    | "Volleyball"
    | "Badminton";
  league: string;
  address: string;
  minPlayers: number;
  maxPlayers: number;
  regularTeamPrice: number;
  regularPersonPrice: number;
  earlyBirdTeamPrice: number;
  earlyBirdPersonPrice: number;
  gender: "male" | "female";
};

export const FootballPriceCard = ({
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
        {gender === "male" && sport === "Football" && (
          <Image src={nikeBall} width={100} height={100} alt="qrCode" />
        )}
        {gender === "female" && sport === "Girls Football" && (
          <Image src={nikeGirlsBall2} width={100} height={100} alt="qrCode" />
        )}
      </div>
      <h2
        className={`w-full flex justify-center py-1 text-[45px] ${
          gender === "male" ? " bg-[#031E57] " : " bg-[#E62A2C] "
        } text-white text-center`}
      >
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
          <div className="flex gap-[30px]">
            <div className="ball flex w-[230px] h-full mt-20px">
              <img
                src={
                  "https://hips.hearstapps.com/hmg-prod/images/lusail1-1668702662.png"
                }
                alt="place image"
                className="object-cover w-[230px] h-full rounded-lg"
              />
            </div>
            <div className="flex flex-col text-[#38383A] ">
              <h3 className="text-[36px]">League ({league})</h3>
              <p className="text-base">Address : {address}</p>
              <p className="text-base flex flex-col">
                <span className="block"> Date 15 June ~ 15 August</span>
                <span className="block text-[10px] leading-3">
                  (Day of the week)
                </span>
              </p>
              <p className="text-base mt-1">Min 15 and Max 10 players</p>
              <div>
                <p className="line-through text-xs text-red-500">
                  Regular team price : {regularTeamPrice} azn
                </p>
                <p className="line-through text-xs text-red-500">
                  Regular person price : {regularPersonPrice} azn
                </p>
              </div>
              <div>
                <p className=" text-xs">
                  Early bird team price : {earlyBirdTeamPrice} azn
                </p>
                <p className=" text-xs">
                  Early bird person price : {earlyBirdPersonPrice} azn
                </p>
              </div>

              <div className="flex justify-start mt-2">
                <Link
                  href={`/register?sport=soccer6v6&league=${league.toUpperCase()}`}
                  className="bg-[#032974] text-white rounded-md px-2 py-1 hover:bg-[#0a3b9d] transition duration-300 ease-in-out text-xs"
                >
                  Register now
                </Link>
              </div>
            </div>
          </div>
          <Image src={qrCode} width={100} alt="qrCode" className="ml-10" />
        </div>
      </div>
    </div>
  );
};