import { BasketballPriceCard } from "@/components/BasketballPriceCard";
import { BeachVolleyballPriceCard } from "@/components/BeachVolleyballPriceCard";
import { FootballPriceCard } from "@/components/FootballPriceCard";
import React from "react";

type Props = {};

const games = {
  football: [
    {
      sport: "Football",
      league: "U21",
      address: "Aquatic Palace",
      gender: "male",
      minPlayers: 6,
      maxPlayers: 12,
      earlyBirdTeamPrice: 1000,
      earlyBirdPersonPrice: 0,
      regularTeamPrice: 1200,
      regularPersonPrice: 0,
    },
    {
      sport: "Football",
      league: "U18",
      address: "Aquatic Palace",
      gender: "male",
      minPlayers: 6,
      maxPlayers: 12,
      earlyBirdTeamPrice: 1000,
      earlyBirdPersonPrice: 0,
      regularTeamPrice: 1200,
      regularPersonPrice: 0,
    },
    {
      sport: "Football",
      league: "U16",
      address: "Aquatic Palace",
      gender: "male",
      minPlayers: 6,
      maxPlayers: 12,
      regularTeamPrice: 500,
      regularPersonPrice: 0,
      earlyBirdTeamPrice: 333,
      earlyBirdPersonPrice: 0,
    },
    {
      sport: "Girls Football",
      league: "U-GIRLS",
      address: "Aquatic Palace",
      gender: "female",
      minPlayers: 6,
      maxPlayers: 12,
      earlyBirdTeamPrice: 0,
      earlyBirdPersonPrice: 0,
      regularTeamPrice: 0,
      regularPersonPrice: 0,
    },
  ],
  basketball: [
    {
      sport: "Basketball",
      league: "U21",
      address: "Aquatic Palace",
      gender: "male",
      minPlayers: 3,
      maxPlayers: 5,
      earlyBirdTeamPrice: 333,
      earlyBirdPersonPrice: 0,
      regularTeamPrice: 500,
      regularPersonPrice: 0,
    },
    {
      sport: "Basketball",
      league: "Recreational",
      address: "Aquatic Palace",
      gender: "male",
      minPlayers: 3,
      maxPlayers: 5,
      earlyBirdTeamPrice: 333,
      earlyBirdPersonPrice: 0,
      regularTeamPrice: 500,
      regularPersonPrice: 0,
    },
  ],
  volleyball: [
    {
      sport: "Volleyball",
      league: "U21",
      address: "Aquatic Palace",
      gender: "male",
      minPlayers: 4,
      maxPlayers: 6,
      earlyBirdTeamPrice: 400,
      earlyBirdPersonPrice: 0,
      regularTeamPrice: 600,
      regularPersonPrice: 0,
    },
    {
      sport: "Volleyball",
      league: "Recreational",
      address: "Aquatic Palace",
      gender: "male",
      minPlayers: 4,
      maxPlayers: 6,
      earlyBirdTeamPrice: 400,
      earlyBirdPersonPrice: 0,
      regularTeamPrice: 600,
      regularPersonPrice: 0,
    },
  ],
};
const allGames = [...games.football, ...games.basketball, ...games.volleyball];

export default function OurServices(props: Props) {
  const [filter, setFilter] = React.useState("all");

  const handleFilter = (type: string) => {
    setFilter(type);
  };
  return (
    <div className="flex justify-center pt-[50px] pb-[50px]">
      <div className=" max-w-[1140px] px-[15px]  w-full flex flex-wrap gap-[50px]">
        <div className="w-full flex gap-5 flex-wrap w-max">
          <button
            onClick={() => handleFilter("all")}
            className={
              " text-white rounded-md px-4 py-2 hover:bg-[#0a3b9d] transition duration-300 ease-in-out" +
              (filter === "all"
                ? " bg-[#0a3b9d]"
                : " bg-gray-300 text-black border-black ")
            }
          >
            All ({allGames.length})
          </button>
          <button
            onClick={() => handleFilter("football")}
            className={
              " text-white rounded-md px-4 py-2 hover:bg-[#0a3b9d] transition duration-300 ease-in-out" +
              (filter === "football"
                ? " bg-[#0a3b9d]"
                : " bg-gray-300 text-black border-black ")
            }
          >
            Football ({games.football.length})
          </button>
          <button
            onClick={() => handleFilter("basketball")}
            className={
              " text-white rounded-md px-4 py-2 hover:bg-[#0a3b9d] transition duration-300 ease-in-out" +
              (filter === "basketball"
                ? " bg-[#0a3b9d]"
                : " bg-gray-300 text-black border-black ")
            }
          >
            Basketball ({games.basketball.length})
          </button>
          <button
            onClick={() => handleFilter("volleyball")}
            className={
              " text-white rounded-md px-4 py-2 hover:bg-[#0a3b9d] transition duration-300 ease-in-out" +
              (filter === "volleyball"
                ? " bg-[#0a3b9d]"
                : " bg-gray-300 text-black border-black ")
            }
          >
            Volleyball ({games.volleyball.length})
          </button>
        </div>
        <div className="w-full flex flex-wrap gap-[50px]">
          {filter === "all" &&
            allGames.map((game, index) => {
              switch (game.sport) {
                case "Football":
                  return <FootballPriceCard key={index} {...game} />;
                case "Girls Football":
                  return <FootballPriceCard key={index} {...game} />;
                case "Basketball":
                  return <BasketballPriceCard key={index} {...game} />;
                case "Volleyball":
                  return <BeachVolleyballPriceCard key={index} {...game} />;
                default:
                  return null;
              }
            })}
          {filter === "football" &&
            games.football.map((game, index) => {
              return <FootballPriceCard key={index} {...game} />;
            })}
          {filter === "basketball" &&
            games.basketball.map((game, index) => {
              return <BasketballPriceCard key={index} {...game} />;
            })}
          {filter === "volleyball" &&
            games.volleyball.map((game, index) => {
              return <BeachVolleyballPriceCard key={index} {...game} />;
            })}
        </div>
      </div>
    </div>
  );
}