import { Inter } from "next/font/google";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { pokemonApi } from "@/store/pokemonApi";
import TopBanner from "@/components/TopBanner";
import { Navbar } from "@/components/Navbar";
import HomeMainSlider from "@/components/HomeMainSlider";
import BlockEarlyBirds from "@/components/BlockEarlyBirds";
import AllAboutPeople from "@/components/StayInTouch";
import StayInTouch from "@/components/StayInTouch";
import GamesSections from "@/components/GamesSections";
import InfoSection from "@/components/InfoSection";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } =
    pokemonApi.useGetPokemonByNameQuery("bulbasaur");

  return (
    <>
      <TopBanner />
      <Navbar />
      <HomeMainSlider />
      <BlockEarlyBirds />
      <GamesSections />
      <StayInTouch />
      <InfoSection />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
}
