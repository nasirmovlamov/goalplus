import { faFutbol } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import qrCode from "../media/images/qrCode.png";
import basketBall from "../media/images/basketballBall.png";
import nikeGirlsBall2 from "../media/images/nikegirlsBall2.png";
import Image from "next/image";
import Link from "next/link";
import recroBasket from "../media/images/recre basketa.png";
import u21 from "../media/images/U-21a.png";
import basket3x3 from "../media/images/3X3BASKETa.png";

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

export const BasketballPriceCard = ({
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
        <Image src={basketBall} width={100} height={100} alt="ball image" />
      </div>
      <h2 className="w-full flex flex-wrap justify-center py-1 text-[45px] bg-[#b04e3b] text-white text-center">
        {sport}
      </h2>
      <div
        className="flex flex-wrap relative justify-center   pb-2 px-[30px] pb-[15px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(238,238,238,1) 0%, rgba(245,245,245,1) 35%, rgba(227,227,225,1) 61%, rgba(213,214,209,1) 100%)",
        }}
      >
        <div
          className="w-full flex justify-between gap-[20px] p-3 px-[30px] border-[3px] border-[#E62A2C] border-t-transparent"
          style={{
            borderRadius: "0 0 10px 10px",
          }}
        >
          <div className="flex flex-wrap gap-[10px] lg:gap-[30px]">
            <div className="ball flex w-full lg:w-[230px] h-[190px] lg:h-full mt-20px">
              <img
                src={
                  league === "Recreational"
                    ? "https://lh3.googleusercontent.com/fife/APg5EOY9WRi-_mHO633yHG53P2q2xR975SGXc8IEwnJN6FUu4yUJBkmiPKPOyASTQ-Nm3AAMNGNQrvlPjX7vXEFxxkMkiAn84RQFhPJXU9beTuRv1mMvJOtnNxqCF1fX8wIAy-14FiQus1Jq-LcytPotp8n1bEcR1tOQlTvh5A71Ps4Y3u6kka1DCJLy0XNwUAcBPrJMnORb7TD_s3abnvctWim-ZbydHXpsZmNDSZBvF1IXIrNMsO71-Zdvyk5XJvrnHBKk3xk8u6jvolFa5igLrEf_0TvcNV2JcyehhAtD42EEpI-A-jfnLBNDNBSoGdfAngckmdcJWvxb1US8rXUIIMgvO8G0NcClutS7mB7O6CYLUO94caUtKB8ihc1bWIxWTaFvBWhD5nFXMGWaMSMssylCkswn9RW52KHZW90EcKlhn-udgF9nuQ_hNOxkupsTgd7gIh_gVucwWRXLLMjPZU_12U5ix1whMBSVsswlwfJP0oXMrRbmqVeie_8OfeBORUe-JMzN1nOQxapADgRGneBHtOsCNNUiS40SD2MhXLYoSXkVCxDa_ghAcC9R3okIwXXc2YQlxezjZE2_IgeMd1RCF1bbLBQOSMTz4lEf9Uod67kmDZMPlY23xo1vN4mnepuHgTWF51YeLjYv6rL-DkmiqwIRAWOmm-S8hDVa8edUIYZeMgWYSXr9Pi0hrtPnrCrUjSsRdkrXGUq9okEmTxM24cRKo_XHPVyCN7WBjcFJzUztf11KuRRVMS3JV12_7D_rpOx2bd03GRYLZWka310JXSwZbTg4tjGRiRM-JvyZ6RJxlWZZLJnrh5_rIbyWsXAuEbm_sldXHQL9YChAA_E2tHShFWz8rAFukAgksFokkoxA_AIz_oIXP-cq-AeWIYLd23wmjRixb9fQQK5wFUoqmEQMgB7D3oomG5pZqDPaSisQDZLw59qf1GKE4qs5blfcpN5tjL3ZF0P8UFA_YsAm7SuUP7vFZ3JZxgJTmCQQRy7n2L1MhjmvHiMZ0cMvK9Hn-cTW2ctQk0SIz-AKXO3faCQff_y6vDKtIZGNZ3Y5l5hZXHckK7KCKkwIUG0CKC45U29FJ_GKyCTSGuqJTmGP77XrGszuX1kzjvqaGhO-hEBCrC017Ot_T-EQJze0QkBy04x2npHYjQRnacn0znitsQn4fUIuFGQZPF6pyga5PeqeI6e8U3JL0AJDBFGepJXcMYEjgK8pU-x8o2_ln9eZuKW0SbTekXx1b90ESN-2s9447JiOo2OkObaYdbXABTRzTnl435TpkJRsMtnhv572E8y144qd9V2qEakjI7KIv93ob1RjFh2B8PeriHZVxk-saSZiG172VlGseamD_nNashAhxJ3TAwtleHqg97VEQA8-W8x1NgYLEd3XanQ1yDduR0meij5gDL_UZmrnFiqQfcjoOoLQdbtxx8aYdFA6Pso2WYypcIjNT412Rs_ODCP0AjnW7otYSEnYRmUyIkqEDMDklwoXziQnKC-JKlYHrhpLiTN9-c5jqX2WV_e4VZbQPype9A3osl_dSQQ-vvQBF-mn_dJGBSXh=w2132-h2350"
                    : league === "U-21"
                    ? "https://lh3.google.com/u/0/d/1LsVJ6bpR8I1-Am9Xh38YK_KSiPDOEwxq=w4112-h2350-iv1"
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
              <p className="text-base">Duration : 7 weeks</p>
              <p className="text-base">{address}</p>

              <div className="flex justify-start mt-2">
                <Link
                  href={`/register?sport=basketball3x3`}
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
