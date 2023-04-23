import React from "react";

type Props = {
  name: string;
  surname: string;
  image?: string;
  sportId?: string;
};
import footballCard from "../media/images/hero.webp";
import defaultProfilePhoto from "../media/images/defaultPp.png";
import image from "next/image";

const TeamMemberCard = (props: Props) => {
  return (
    <div className="w-full max-w-[300px] min-h-[400px] bg-red relative flex justify-start items-end ">
      {
        <img
          src={footballCard.src}
          className="w-[350px] h-auto absolute top-0 left-0"
          alt=""
        />
      }
      <div className="z-20  flex gap-1 pb-36 flex-col items-center text-center justify-center w-full text-[#cdf000] font-bold text-[20px]">
        {props.image ? (
          <img
            src={props.image}
            alt=""
            className="w-[100px] h-[100px] rounded-full"
          />
        ) : (
          <img
            src={defaultProfilePhoto.src}
            alt=""
            className="w-[100px] h-[100px] rounded-full"
          />
        )}
        <span>{props.name}</span>
        <span>{props.surname}</span>
      </div>
    </div>
  );
};

export default TeamMemberCard;
