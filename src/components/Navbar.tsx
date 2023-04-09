import Image from "next/image";
import Link from "next/link";
import goalPlusLogo from "../media/images/goalplus-logo.png";
import StyledLink from "./StyledLink";

export const Navbar = () => {
  return (
    <header className="w-full sticky top-[0px] flex justify-center  bg-white z-[1000] shadow-md ">
      <nav className="h-[56px] flex w-full max-w-[1140px] px-[15px] py-[8px] justify-between">
        <div className="flex ">
          <Image src={goalPlusLogo} alt="logo" className="w-[40px] h-[40px]" />
          <ul className="flex pl-6 text-[rgb(115,115,115)]">
            <li className="p-2">
              <StyledLink href="/">Home</StyledLink>
            </li>
            <li className="p-2">
              <StyledLink href="/our-services">Sport Leagues</StyledLink>
            </li>
            <li className="p-2">
              <StyledLink href="/pricing">Community Pass</StyledLink>
            </li>
            <li className="p-2">
              <StyledLink href="/help">Help</StyledLink>
            </li>
          </ul>
        </div>

        <ul className="flex h-[40px] items-center">
          <li>
            <Link href="/login">Sign in</Link>
          </li>
          <li className="pl-4">
            <Link
              href="/contactus"
              className=" bg-[#032974] text-white rounded-md px-4 py-2 hover:bg-[#0a3b9d] transition duration-300 ease-in-out"
            >
              Contact us
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
