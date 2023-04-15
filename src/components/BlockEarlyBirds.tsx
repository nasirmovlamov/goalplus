import React from "react";

type Props = {};

const BlockEarlyBirds = (props: Props) => {
  return (
    <div className="flex justify-center p-5">
      <div className="max-w-[1140px] w-full">
        <p>Early bird registrations ends soon - add to slides </p>
        <p className="py-2">
          Great stories are <b> for everyone</b> even when only written{" "}
          <b> for just one person </b>. If you try to write with a wide, general
          audience in mind, your story will sound fake and lack emotion. No one
          will be interested. Write for one person. If it’s genuine for the one,
          it’s genuine for the rest.
        </p>
      </div>
    </div>
  );
};

export default BlockEarlyBirds;
