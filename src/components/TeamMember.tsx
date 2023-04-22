import React from "react";

type Props = {
  index: number;
  data: any;
  image: string;
};

const TeamMember = (props: Props) => {
  return (
    <div className="flex flex-col gap-2 ">
      <div>
        <img
          src={props?.image}
          alt=""
          className="w-[200px] h-[200px] object-cover"
        />
      </div>
      <div className="flex gap-2">
        <div>Player name</div>
        <div>{props.data.firstName}</div>
      </div>
    </div>
  );
};

export default TeamMember;
