import { Inter } from "next/font/google";
import { useAppDispatch, useAppSelector } from "@/store/store";
import TopBanner from "@/components/TopBanner";
import { Navbar } from "@/components/Navbar";
import HomeMainSlider from "@/components/HomeMainSlider";
import BlockEarlyBirds from "@/components/BlockEarlyBirds";
import AllAboutPeople from "@/components/StayInTouch";
import StayInTouch from "@/components/StayInTouch";
import GamesSections from "@/components/GamesSections";
import InfoSection from "@/components/InfoSection";
import SpendYourSummersection from "@/components/SpendYourSummersection";
import AllAboutPeopleSection from "@/components/AllAboutPeopleSection";
import GoalsTimelineSection from "@/components/GoalsTimelineSection";
import RegisterInfoSection from "@/components/RegisterInfoSection";
import Partners from "@/components/Partners";
import Copyright from "@/components/Copyright";
import HomeMainSlider2 from "@/components/HomeMainSlider2";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <HomeMainSlider2 />
      {/* <BlockEarlyBirds /> */}
      <RegisterInfoSection />
      <SpendYourSummersection />
      {/* <AllAboutPeopleSection /> */}
      <GamesSections />
      <InfoSection />
      {/* <StayInTouch /> */}
      {/* <GoalsTimelineSection /> */}
      <Partners />
    </>
  );
}
