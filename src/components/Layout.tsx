import { ScriptProps } from "next/script";
import React, { useEffect } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import TopBanner from "./TopBanner";
import Copyright from "./Copyright";
import { authSlice } from "@/store/authSlice";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "next/router";
import { authApi } from "@/store/authApi";

export default function Layout({ children }: ScriptProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [
    refreshTokenApi,
    {
      data: refreshTokenData,
      isError: isRefreshTokenError,
      isLoading: isRefreshTokenLoading,
      isSuccess: isRefreshTokenSuccess,
    },
  ] = authApi.useRefreshTokenMutation();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
      dispatch(authSlice.actions.getTokenFromStorage());
      dispatch(authSlice.actions.getUserFromStorage());
      refreshTokenApi({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      if (
        router.pathname === "/team-register-process" ||
        router.pathname === "/user-register-process"
      ) {
        localStorage.clear();
        router.push("/login");
      }
    }
  }, [router]);

  // useEffect(() => {
  //   window.location.href = "http://azerqus0.beget.tech/";
  // }, []);

  useEffect(() => {
    if (navigator.userAgent.includes("Instagram")) {
      window.open(
        "https://www.instagram.com/goalplus.az/ticketing/goalplus",
        "_blank",
        "noopener,noreferrer"
      );
    }
  }, [navigator]);

  return (
    <div className="min-h-screen">
      <div className="min-h-[calc(100vh-340px)]">
        {/* <TopBanner /> */}
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
