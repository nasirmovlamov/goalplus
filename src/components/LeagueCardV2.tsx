import u21NewCardImage from "@/media/images/u21NewCardImage.png";
import cardBackgroundImage from "@/media/images/newLeagueCardBackground.png";
import {
  faCalendar,
  faClockRotateLeft,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinkStyled2 } from "./LinkStyled2";

export const LeagueCardV2 = () => {
  return (
    <div
      className="flex flex-col w-max-[1142px] w-full rounded-3xl overflow-hidden"
      style={{
        backgroundImage: `url(${cardBackgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="w-full py-[19px] text-[30px] text-white text-center bg-[#05055B] font-integral">
        6x6 football
      </h1>
      <div className="flex flex-wrap items-start font-articular">
        <img
          src={u21NewCardImage.src}
          alt=""
          className="w-max-[438px] h-[318px] object-cover"
        />
        <div className="flex flex-wrap justify-between p-[24px] gap-[110px] w-max-[632px]">
          <div className="flex flex-col">
            <h2 className="text-[#05055B] text-[30px] ">Mens U-21</h2>
            <p className="text-[#9B9B9B] mt-[6px]">Min 6 and Max 12 players</p>
            <div className="mt-[33px] flex flex-col gap-4 text-[#9B9B9B]">
              <p className="flex gap-2 items-center">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="text-[#9B9B9B] text-[16px] mr-[10px]"
                />
                <span>June 18 - August 13</span>
              </p>
              <p className="flex gap-2 items-center">
                <FontAwesomeIcon
                  icon={faClockRotateLeft}
                  className="text-[#9B9B9B] text-[16px] mr-[10px]"
                />
                <span>8 weeks</span>
              </p>
              <p className="flex gap-2 items-center">
                <FontAwesomeIcon
                  icon={faLocationArrow}
                  className="text-[#9B9B9B] text-[16px] mr-[10px]"
                />
                <span>Aquatic Palace</span>
              </p>
              <p className="flex gap-2 items-center">
                <span className="w-[15px]"></span>
                <span className="text-red-500">
                  Registration ends on May 28
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 ">
            <p className="flex gap-2 items-center">
              <span className="text-red-500 line-through">
                Regular price : 1350 AZN
              </span>
            </p>
            <p className="flex gap-2 items-center text-[24px] text-[#9B9B9B]">
              <span>Early bird per athlete: 104 azn</span>
            </p>
            <p className="flex gap-2 items-center text-[24px] text-[#9B9B9B]">
              <span>Early bird per team: 1250 azn</span>
            </p>

            <p className="flex gap-2 items-center">
              <span className="text-red-500">Until May 10</span>
            </p>

            <LinkStyled2
              href="/register"
              className=" hover:bg-[#151566] hover:text-white mt-[3x0px]"
            >
              Register Now
            </LinkStyled2>
          </div>
        </div>
      </div>
    </div>
  );
};
