import Image from "next/image";
import Link from "next/link";
import goalPlusLogo from "../media/images/goalplus-logo.png";
import navLogo from "../media/images/navLogo.png";
import StyledLink from "./StyledLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCheck,
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

            {userJwt && (
              <li className="p-2">
                <span>
                  You are logged <FontAwesomeIcon icon={faCheck} />
                </span>
              </li>
            )}
            {!userJwt && (
              <li className="p-2">
                <StyledLink href="/register">Register</StyledLink>
              </li>
            )}

            <li className="p-2">
              <StyledLink href="/sports-leagues">Sports leagues</StyledLink>
            </li>
            <li className="p-2">
              <a href="https://www.instagram.com/goalplusaz/" target="_blank">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <header className="w-full sticky top-[0px] flex justify-center  bg-white z-[1000] shadow-md ">
        <nav className="h-[56px] flex w-full max-w-[1140px] px-[15px] py-[8px] justify-between">
          <div className="flex md:hidden">
            <Link href="/">
              <Image src={navLogo} alt="logo" className="w-[40px] h-[40px]" />
            </Link>
          </div>
          <div className="md:flex hidden">
            <Link href="/">
              <Image src={navLogo} alt="logo" className="w-[40px] h-[40px]" />
            </Link>
            <ul className="flex pl-6 text-[rgb(115,115,115)]">
              <li className="p-2">
                <StyledLink href="/">Home</StyledLink>
              </li>
              <li className="p-2">
                <StyledLink href="/sports-leagues">Sports leagues</StyledLink>
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
              <button onClick={() => handleToProfile()}>
                <li className="pl-4 pr-3">
                  <FontAwesomeIcon icon={faUser} />
                </li>
              </button>
            )}
            {userJwt && (
              <li className="pl-4 pr-3">
                <button onClick={logoutUser}>Logout</button>
              </li>
            )}
            {!userJwt && (
              <li className="pl-4 pr-3">
                <Link href="/login">Login</Link>
              </li>
            )}
            <li className="pl-4">
              <a
                target="_blank"
                href="https://www.instagram.com/goalplusaz/"
                className=" bg-[#032974] text-white rounded-md px-4 py-2 hover:bg-[#0a3b9d] transition duration-300 ease-in-out"
              >
                Contact us
              </a>
            </li>
          </ul>

          <div className="md:hidden">
            <button
              onClick={handleOpenMobileNavbar}
              className="md:hidden flex items-center justify-center h-[40px] w-[40px] rounded-md bg-[#032974] text-white"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};
