import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Copyright from "./Copyright";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import logoFooter from "../media/images/logoFooter.png";
import locationIcon from "../media/images/locationIcon.png";
import youtubeIcon from "../media/images/youtubeIcon.png";
import instagramIcon from "../media/images/instagram.png";
import linkedinIcon from "../media/images/linkedin.png";

import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
export const Footer = () => {
  return (
    <footer className="flex justify-center bg-[#05055B] text-white flex-col items-center pt-10">
      <div className="flex flex-col max-w-[720px] w-full items-center h-full px-4 box-border">
        <div className="flex gap-[51px] items-center">
          <a target="_blank" href="https://www.youtube.com/@goalplus266">
            <img src={youtubeIcon.src} alt="" className="w-[54px] h-[39px]" />
          </a>
          <a target="_blank" href="https://www.instagram.com/goalplusaz/">
            <img src={instagramIcon.src} alt="" className="w-[39px] h-[39px]" />
          </a>
          <a target="_blank" href="https://www.linkedin.com/company/goalplus/">
            <img src={linkedinIcon.src} alt="" className="w-[41px] h-[41px]" />
          </a>
          {/* <div className="flex justify-center items-center rounded-full h-[48px] w-[48px] bg-white">
            <FontAwesomeIcon icon={faTwitter} className="text-[#54ACED]" />
          </div> */}
        </div>
        <p className="pt-[25px] pb-2 w-max text-center flex  items-center gap-2">
          <img src={locationIcon.src} alt="" />
          <span>Aquatic Palace | Baku, Azerbaijan</span>

          {/* 250 Executive Park Blvd, Suite 3400 <br className="md:hidden" />{" "}
          <span className="hidden md:inline">•</span> San Francisco CA 94134{" "}
          <br className="md:hidden" />{" "}
          <span className="hidden md:inline">•</span> United States */}
        </p>
        <div className="pt-[25px] flex flex-wrap justify-center md:justify-start gap-3 md:gap-0">
          {/* <div className="flex gap-3 items-center">
            <FontAwesomeIcon icon={faPhone} />
            <a href="tel:+994508793197">
              <span className="text-[#54ACED]">+994508793197</span>
            </a>
          </div> */}
          <div className="flex gap-3 items-center pl-10">
            <FontAwesomeIcon icon={faEnvelope} />
            <a href="mailto:info@goalplus.az">
              <span className="text-[#54ACED]">info@goalplus.az</span>
            </a>
          </div>
        </div>

        <div className="flex mt-8 pb-6">
          <Image src={logoFooter} alt="" className="w-[295px] " />
        </div>
      </div>
      <Copyright />
    </footer>
  );
};
