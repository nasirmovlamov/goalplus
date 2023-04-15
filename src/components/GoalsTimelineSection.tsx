import { faChild, faFlag, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {};

const GoalsTimelineSection = (props: Props) => {
  return (
    <div className="w-full flex justify-center items-center relative ">
      <div className="flex xl:hidden max-w-[1230px] w-full flex-col items-center z-20   gap-y-2  box-border p-5">
        {/* Date */}
        <div className="flex flex-col gap-1 items-center">
          <h4 className="text-center">
            <b> 2023</b>
          </h4>
          <hr className="w-[1px] h-[50px] bg-[#4b4b4b]" />
        </div>
        {/* Goal */}
        <div className="flex gap-2 flex-wrap items-center justify-center p-2">
          <div className="w-[48px] h-[48px]  flex justify-center items-center rounded-full p-2 bg-[#D0FB52]">
            <FontAwesomeIcon icon={faChild} size="xl" />
          </div>
          <div className="flex flex-col p-3 gap-1 border border-gray-300 w-full">
            <h4 className="text-xl">Goalplus Summer 2023</h4>
            <p className="text-gray-500 w-full">
              A timeline is a graphical representation on which
              <br /> important events are marked
            </p>
          </div>
        </div>
        {/* Date 2 */}
        <div className="flex flex-col gap-1 items-center ">
          <hr className="w-[1px] h-[60px] bg-[#4b4b4b]" />
          <h4 className="text-center">
            <b> 2022</b>
          </h4>
          <hr className="w-[1px] h-[50px] bg-[#4b4b4b]" />
        </div>

        <div className="flex flex-wrap gap-2  items-center justify-center p-2 ">
          <div className="w-[48px] h-[48px]  flex justify-center items-center rounded-full p-2 bg-[#D0FB52]">
            <FontAwesomeIcon icon={faFlag} />
          </div>
          <div className="flex flex-col p-3 gap-1 border border-gray-300 lg:max-w-[450px] w-full">
            <h4 className="text-xl">Summer Fest 2022 Link</h4>
          </div>
        </div>
        <hr className="w-[1px] h-[50px] bg-[#4b4b4b]" />

        <div className="flex flex-wrap gap-2 items-center justify-center p-2 ">
          <div className="w-[48px] h-[48px]  flex justify-center items-center rounded-full p-2 bg-[#D0FB52]">
            <FontAwesomeIcon icon={faStar} />
          </div>
          <div className="flex flex-col p-3 gap-1 border border-gray-300 lg:max-w-[450px]">
            <h4 className="text-xl">Goalplus Summer 2023</h4>
            <p className="text-gray-500 break-words">
              A timeline is a graphical representation on which important <br />
              events are marked.
            </p>
          </div>
        </div>
      </div>
      <div className="hidden xl:flex max-w-[1230px] w-full flex-col justify-between z-20   gap-y-2  box-border p-5">
        <div className="flex flex-wrap justify-center lg:justify-start gap-[34px] ">
          {/* Goal 1 */}
          <div className="flex gap-2  items-center justify-center p-2">
            <div className="flex flex-col p-3 gap-1 border border-gray-300 lg:w-[450px]">
              <h4 className="text-xl">Goalplus Summer 2023</h4>
              <p className="text-gray-500 w-full">
                A timeline is a graphical representation on which
                <br /> important events are marked
              </p>
            </div>
            <div className="w-[48px] h-[48px]  flex justify-center items-center rounded-full p-2 bg-[#D0FB52]">
              <FontAwesomeIcon icon={faChild} />
            </div>
          </div>
          {/* Date */}
          <div className="flex flex-col gap-1 items-center -mb-8">
            <hr className="w-[1px] h-[60px] bg-[#4b4b4b]" />
            <h4 className="text-center">
              <b> 2023</b>
            </h4>
            <hr className="w-[1px] h-[100px] bg-[#4b4b4b]" />
          </div>
        </div>
        <div className="flex flex-wrap  gap-[34px] ">
          {/* Goal 1 */}
          <div className="flex gap-2  items-center justify-center p-2 ">
            <div className="flex flex-col p-3 gap-1 border border-gray-300 lg:w-[450px]">
              <h4 className="text-xl">Summer Fest 2022 Link</h4>
            </div>
            <div className="w-[48px] h-[48px]  flex justify-center items-center rounded-full p-2 bg-[#D0FB52]">
              <FontAwesomeIcon icon={faFlag} />
            </div>
          </div>
          {/* Date */}
          <div className="flex flex-col gap-1 items-center -mb-8">
            <hr className="w-[1px] h-[60px] bg-[#4b4b4b]" />
            <h4 className="text-center">
              <b> 2022</b>
            </h4>
            <hr className="w-[1px] h-[50px] bg-[#4b4b4b]" />
          </div>
          {/* Goal 2 */}
          <div className="flex flex-wrap gap-2 w-max items-center justify-center p-2 ">
            <div className="w-[48px] h-[48px]  flex justify-center items-center rounded-full p-2 bg-[#D0FB52]">
              <FontAwesomeIcon icon={faStar} />
            </div>
            <div className="flex flex-col p-3 gap-1 border border-gray-300 lg:max-w-[450px]">
              <h4 className="text-xl">Goalplus Summer 2023</h4>
              <p className="text-gray-500">
                A timeline is a graphical representation on which important{" "}
                <br />
                events are marked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsTimelineSection;
