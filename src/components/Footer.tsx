import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Copyright from "./Copyright";
import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
export const Footer = () => {
  return (
    <footer className="flex justify-center bg-[#031F57] text-white flex-col items-center pt-10">
      <div className="flex flex-col max-w-[720px] w-full items-center h-full px-4 box-border">
        <div className="flex gap-4">
          <div className="flex justify-center items-center rounded-full h-[48px] w-[48px] bg-white">
            <FontAwesomeIcon icon={faFacebookF} className="text-[#3C5998]" />
          </div>
          <div className="flex justify-center items-center rounded-full h-[48px] w-[48px] bg-white">
            <FontAwesomeIcon icon={faTwitter} className="text-[#54ACED]" />
          </div>
          <div className="flex justify-center items-center rounded-full h-[48px] w-[48px] bg-white">
            <FontAwesomeIcon icon={faLinkedinIn} className="text-[#0177B5]" />
          </div>
        </div>
        <p className="pt-3 pb-2 w-full text-center w-full">
          250 Executive Park Blvd, Suite 3400 <br className="md:hidden" />{" "}
          <span className="hidden md:inline">•</span> San Francisco CA 94134{" "}
          <br className="md:hidden" />{" "}
          <span className="hidden md:inline">•</span> United States
        </p>
        <div className=" flex flex-wrap justify-center md:justify-start gap-3 md:gap-0">
          <div className="flex gap-3 items-center">
            <FontAwesomeIcon icon={faPhone} />
            <a href="tel:+1 (650) 555-0111">
              <span className="text-[#54ACED]">+1 (650) 555-0111</span>
            </a>
          </div>
          <div className="flex gap-3 items-center pl-10">
            <FontAwesomeIcon icon={faEnvelope} />
            <a href="mailto:nasirmovlamov@gmail.com">
              <span className="text-[#54ACED]">nasirmovlamov@gmail.com</span>
            </a>
          </div>
        </div>

        <div className="flex mt-8 pb-6">
          <img
            src="https://goalplusaz1.odoo.com/website/static/src/img/website_logo.svg"
            alt=""
            className="w-[190px]"
          />
        </div>
      </div>
      <Copyright />
    </footer>
  );
};
