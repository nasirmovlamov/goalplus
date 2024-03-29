import Image from "next/image";
import Link from "next/link";
import goalPlusLogo from "../media/images/goalplus-logo.png";
import navLogo from "../media/images/goalplusNewNavLogo.png";
import StyledLink from "./StyledLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faBars,
  faCheck,
  faSign,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { authSlice } from "@/store/authSlice";
import { authApi } from "@/store/authApi";
import { teamApi } from "@/store/teamApi";
import error from "next/error";
import StyledLinkWithTarget from "./StyledLinkWithTarget";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const userJwt = useAppSelector((state) => state.auth.jwt);
  const [isOpenMobileNavbar, setIsOpenMobileNavbar] = useState(false);
  const router = useRouter();
  const handleOpenMobileNavbar = () => {
    setIsOpenMobileNavbar(!isOpenMobileNavbar);
  };

  const [
    meApi,
    {
      isLoading: meLoading,
      isError: isMeError,
      isSuccess: meSuccess,
      data: meData,
      error: meError,
    },
  ] = authApi.useLazyMeQuery();
  const [
    playersUserInfoApi,
    {
      isLoading: playersUserInfoLoading,
      isError: isPlayersUserInfoError,
      isSuccess: playersUserInfoSuccess,
      data: playersUserInfoData,
      error: playersUserInfoError,
    },
  ] = teamApi.useLazyPlayersUserInfoQuery();

  const logoutUser = () => {
    dispatch(authSlice.actions.logoutUser());
    router.push("/");
  };

  const handleToProfile = async () => {
    const decodedJwt = JSON.parse(
      atob(localStorage.getItem("accessToken")!.split(".")[1])
    );
    localStorage.setItem("userData", JSON.stringify(decodedJwt));
    const userId =
      decodedJwt[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    localStorage.setItem("userId", userId);
    await meApi({});

    if (
      decodedJwt[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ].includes("Admin")
    ) {
      router.push("/admin-dashboard");
      return;
    }
    if (
      decodedJwt[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ].includes("Captain")
    ) {
      router.push("/team-register-process");
      return;
    }
    try {
      const resp: any = await playersUserInfoApi({
        userId: userId,
      });
      console.log("resp", resp);
      if (
        resp?.isCaptain &&
        decodedJwt[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ].includes("Athlete")
      ) {
        router.push("/team-register-process");
        return;
      }
      console.log(resp.status);
      if (
        resp.status !== "rejected" &&
        decodedJwt[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ].includes("Athlete")
      ) {
        router.push("/user-register-process");
        return;
      }
      // console.log(resp.status);
      if (resp.status === "rejected") {
        router.push("/team-register-process");
        return;
      }
    } catch (error) {
      router.push("/team-register-process");
      return;
    }
    router.push("/profile");
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <div>
        <div
          className={
            "w-full h-full bg-[rgba(0,0,0,0.5)] fixed top-[0px] left-[0px] z-[2001]" +
            `${isOpenMobileNavbar ? " translate-x-0" : " -translate-x-full"}`
          }
        ></div>
        <div
          className={
            " flex flex-col w-[75%] h-full bg-white z-[2002] fixed top-[0px] left-[0px] transition-all shadow-md" +
            `${isOpenMobileNavbar ? " translate-x-0" : " -translate-x-full"}`
          }
        >
          <div className="flex justify-end h-[56px] px-[15px] py-[8px]">
            <button onClick={handleOpenMobileNavbar}>
              <span className="text-[30px] text-[rgb(115,115,115)]">×</span>
            </button>
          </div>
          <ul className="flex flex-col pl-6 text-[rgb(115,115,115)]">
            <li className="p-2">
              <StyledLink href="/">Home</StyledLink>
            </li>
            <li className="p-2">
              <StyledLink href="/ticketing/goalplus">Get a Goalpass</StyledLink>
            </li>

            {userJwt && (
              <li className="p-2">
                <span>
                  You are logged <FontAwesomeIcon icon={faCheck} />
                </span>
              </li>
            )}

            {userJwt && (
              <li className="p-2">
                <button className="flex items-center" onClick={logoutUser}>
                  Logout
                </button>
              </li>
            )}
            {!userJwt && (
              <li className="p-2">
                <StyledLink href="/register">Register</StyledLink>
              </li>
            )}

            {!userJwt && (
              <li className="p-2">
                <StyledLink href="/login">Login</StyledLink>
              </li>
            )}

            <li className="p-2">
              <StyledLink href="/sports-leagues">Sports leagues</StyledLink>
            </li>
            <li className="p-2">
              <Link href="/contact" target="_blank">
                Contact Us
              </Link>
            </li>
            <li className="p-2">
              <a href="http://project6957501.tilda.ws" target="_blank">
                Summer Transformation Program
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Nav */}
      <header className="w-full sticky top-[0px] flex justify-center  bg-[#05055B] z-[1000] shadow-md h-[149px] items-center">
        <nav className="h-[70px] flex w-full max-w-[1640px] px-[15px] py-[8px] justify-between items-center">
          <div className="flex md:hidden">
            <Link href="/">
              <Image src={navLogo} alt="logo" className="w-[155px] h-[70px]" />
            </Link>
          </div>
          <div className="md:flex hidden items-center">
            <Link href="/">
              <Image src={navLogo} alt="logo" className="w-[155px] h-[70px]" />
            </Link>
            <ul className="flex pl-6 text-[rgb(115,115,115)] font-articular text-[20px] h-max  gap-4 ">
              <li className="p-2">
                <StyledLink href="/">Home</StyledLink>
              </li>
              <li className="p-2">
                <StyledLink href="/sports-leagues">Sports leagues</StyledLink>
              </li>
              <li className="p-2">
                <StyledLink href="/contact">Contact Us</StyledLink>
              </li>
              <li className="p-2">
                <StyledLinkWithTarget href="http://project6957501.tilda.ws/">
                  Summer Transformation Program
                </StyledLinkWithTarget>
              </li>
              <li className="p-2">
                <StyledLink href="/ticketing/goalplus">
                  Get a Goalpass
                </StyledLink>
              </li>
              {/* <li className="p-2">
                <StyledLink href="/pricing">Community Pass</StyledLink>
              </li>
              <li className="p-2">
                <StyledLink href="/help">Help</StyledLink>
              </li> */}
            </ul>
          </div>

          <ul className="md:flex h-[40px] items-center hidden ">
            {userJwt && (
              <button onClick={() => handleToProfile()} className="flex gap-3">
                <li className="pl-5 pr-3 flex gap-2 items-center text-white font-articular text-[20px]">
                  <FontAwesomeIcon icon={faUser} /> <span> Profile</span>
                </li>
              </button>
            )}
            {userJwt && (
              <li>
                <button
                  onClick={logoutUser}
                  className="m-0 p-0 text-white font-articular text-[20px] ml-5"
                >
                  Logout
                </button>
              </li>
            )}
            {!userJwt && (
              <li className="flex items-center pl-4 pr-3 text-white font-articular font-bold text-[20px] gap-3">
                <FontAwesomeIcon icon={faArrowRightToBracket} size="2xl" />
                <Link href="/login">Login</Link>
              </li>
            )}
            {/* <li className="pl-4">
              <Link
                href="/contact"
                className="text-lg bg-[#031F57] text-white rounded-md px-4 py-2 hover:bg-[#0a3b9d] transition duration-300 ease-in-out w-max h-max shadow-lg"
                style={{
                  boxShadow: "0px 0px 5px 0px #cdf000",
                }}
              >
                Contact us
              </Link>
            </li> */}
            {/* <li className="pl-4 ">
              <a
                href="http://project6957501.tilda.ws/"
                className="text-lg bg-[#031F57] text-white rounded-md px-4 py-2 hover:bg-[#0a3b9d] transition duration-300 ease-in-out w-max h-max shadow-lg"
                style={{
                  boxShadow: "0px 0px 5px 0px #cdf000",
                }}
                target="_blank"
              >
                Summer Transformation Program
              </a>
            </li> */}
          </ul>

          <div className="flex gap-3 md:hidden">
            {userJwt && (
              <button
                onClick={() => handleToProfile()}
                // gray background
                className="flex gap-3 md:hidden bg-[#f2f2f2] rounded-md px-4 py-[6px] hover:bg-[#e6e6e6] transition duration-300 ease-in-out shadow-md items-center justify-center h-[40px] w-[40px]"
              >
                <FontAwesomeIcon icon={faUser} />
              </button>
            )}

            <div className="md:hidden">
              <button
                onClick={handleOpenMobileNavbar}
                className="md:hidden flex items-center justify-center h-[40px] w-[40px] rounded-md bg-[#032974] text-white shadow-lg"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
