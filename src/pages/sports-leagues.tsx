import { BasketballPriceCard } from "@/components/BasketballPriceCard";
import { BeachVolleyballPriceCard } from "@/components/BeachVolleyballPriceCard";
import { EsportPriceCard } from "@/components/EsportPriceCard";
import { FootballPriceCard } from "@/components/FootballPriceCard";
import { LeagueCardV2 } from "@/components/LeagueCardV2";
import React from "react";

type Props = {};

const games = {
  football: [
    {
      sport: "Football",
      league: "U-21",
      address: "Aquatic Palace",
      gender: "male",
      minPlayers: 6,
      date: "June 18 - August 13",
      maxPlayers: 12,
      earlyBirdTeamPrice: 1250,
      earlyBirdPersonPrice: 104,
      regularTeamPrice: 1350,
    },
    {
      sport: "Football",
      league: "U-18",
      address: "Aquatic Palace",
      date: "June 19 - August 12",
      gender: "male",
      minPlayers: 6,
      maxPlayers: 12,
      earlyBirdTeamPrice: 1000,
      earlyBirdPersonPrice: 83,
      regularTeamPrice: 1200,
    },
    {
      sport: "Football",
      league: "U-16",
      address: "Aquatic Palace",
      gender: "male",
      minPlayers: 6,
      maxPlayers: 12,
      regularTeamPrice: 1000,
      earlyBirdTeamPrice: 900,
      earlyBirdPersonPrice: 75,
      date: "June 21 - August 11",
    },
    {
      sport: "Football",
      league: "Recreational",
      address: "Aquatic Palace",
      date: "June 19 - August 12",
      gender: "female",
      minPlayers: 6,
      maxPlayers: 12,
      earlyBirdTeamPrice: 0,
      earlyBirdPersonPrice: 0,
      regularTeamPrice: undefined,
      regularPersonPrice: undefined,
    },
  ],
  basketball: [
    // {
    //   sport: "Basketball",
    //   league: "U-21",
    //   address: "Aquatic Palace",
    //   date: "June 21 - August 11",
    //   gender: "mixed",
    //   minPlayers: 3,
    //   maxPlayers: 5,
    //   earlyBirdTeamPrice: 333,
    //   earlyBirdPersonPrice: 67,
    //   regularTeamPrice: 500,
    //   regularPersonPrice: 0,
    // },
    {
      sport: "Basketball",
      league: "Recreational",
      address: "Aquatic Palace",
      date: "July 1 - July 27",
      gender: "mixed",
      minPlayers: 3,
      maxPlayers: 5,
      earlyBirdTeamPrice: 333,
      earlyBirdPersonPrice: 67,
      regularTeamPrice: 150,
      regularPersonPrice: 30,
    },
  ],
  volleyball: [
    {
      sport: "Volleyball",
      league: "U-21",
      address: "Aquatic Palace",
      date: "TBA",
      gender: "mixed",
      minPlayers: 4,
      maxPlayers: 6,
      earlyBirdTeamPrice: 400,
      earlyBirdPersonPrice: 67,
      regularTeamPrice: 600,
      regularPersonPrice: 0,
    },
    {
      sport: "Volleyball1",
      league: "Recreational",
      address: "Aquatic Palace",
      date: "TBA",
      gender: "mixed",
      minPlayers: 4,
      maxPlayers: 6,
      earlyBirdTeamPrice: 400,
      earlyBirdPersonPrice: 67,
      regularTeamPrice: 600,
      regularPersonPrice: 0,
    },
  ],
  esport: [
    {
      sport: "Esport",
      league: "Recreationals",
      address: "Aquatic Palace",
      date: " 28th of June - 10th of July",
      gender: "mixed",
      minPlayers: 2,
      maxPlayers: 2,
      earlyBirdTeamPrice: 50,
      earlyBirdPersonPrice: null,
      regularTeamPrice: 50,
      regularPersonPrice: 50,
    },
  ],
};

const allGames = [
  ...games.football,
  ...games.basketball,
  ...games.volleyball,
  ...games.esport,
];

export default function OurServices(props: Props) {
  const [filter, setFilter] = React.useState("all");

  const handleFilter = (type: string) => {
    setFilter(type);
  };
  return (
    <div className="flex justify-center pt-[50px] pb-[50px]">
      <div className=" max-w-[1170px] px-[15px]  w-full flex flex-wrap gap-[50px]">
        <div className="mx-auto flex flex-wrap w-max mt-[120px]">
          <div className="flex flex-col">
            <button
              onClick={() => handleFilter("all")}
              className={
                "bg-transperent text-[20px] rounded-md   " +
                (filter === "all" ? "text-[#1C21FF] " : "  text-[#9B9B9B]  ")
              }
            >
              All ({allGames.length})
            </button>
            <span
              className={`w-[202px] h-[2px] mt-[16px] ${
                filter === "all" ? "bg-[#1C21FF]" : " bg-[#9B9B9B]"
              }`}
            ></span>
          </div>

          <div className="flex flex-col">
            <button
              onClick={() => handleFilter("football")}
              className={
                "bg-transperent text-[20px] rounded-md   " +
                (filter === "football"
                  ? "text-[#1C21FF] "
                  : "  text-[#9B9B9B]  ")
              }
            >
              Football ({allGames.length})
            </button>
            <span
              className={`w-[202px] h-[2px] mt-[16px] ${
                filter === "football" ? "bg-[#1C21FF]" : " bg-[#9B9B9B]"
              }`}
            ></span>
          </div>

          <div className="flex flex-col">
            <button
              onClick={() => handleFilter("basketball")}
              className={
                "bg-transperent text-[20px] rounded-md   " +
                (filter === "basketball"
                  ? "text-[#1C21FF] "
                  : "  text-[#9B9B9B]  ")
              }
            >
              Basketball ({allGames.length})
            </button>
            <span
              className={`w-[202px] h-[2px] mt-[16px] ${
                filter === "basketball" ? "bg-[#1C21FF]" : " bg-[#9B9B9B]"
              }`}
            ></span>
          </div>

          <div className="flex flex-col">
            <button
              onClick={() => handleFilter("volleyball")}
              className={
                "bg-transperent text-[20px] rounded-md   " +
                (filter === "volleyball"
                  ? "text-[#1C21FF] "
                  : "  text-[#9B9B9B]  ")
              }
            >
              Volleyball ({allGames.length})
            </button>
            <span
              className={`w-[202px] h-[2px] mt-[16px] ${
                filter === "volleyball" ? "bg-[#1C21FF]" : " bg-[#9B9B9B]"
              }`}
            ></span>
          </div>
        </div>
        <div className="w-full flex flex-wrap gap-[50px]">
          <LeagueCardV2 />
          {filter === "all" &&
            allGames.map((game, index) => {
              switch (game.sport) {
                case "Esport":
                  return <EsportPriceCard key={index} {...(game as any)} />;
                case "Football":
                  return <FootballPriceCard key={index} {...(game as any)} />;
                case "Girls Football":
                  return <FootballPriceCard key={index} {...(game as any)} />;
                case "Basketball":
                  return <BasketballPriceCard key={index} {...(game as any)} />;
                case "Volleyball":
                  return (
                    <BeachVolleyballPriceCard key={index} {...(game as any)} />
                  );
                default:
                  return null;
              }
            })}
          {filter === "football" &&
            games.football.map((game, index) => {
              return <FootballPriceCard key={index} {...(game as any)} />;
            })}
          {filter === "basketball" &&
            games.basketball.map((game, index) => {
              return <BasketballPriceCard key={index} {...(game as any)} />;
            })}
          {filter === "volleyball" &&
            games.volleyball.map((game, index) => {
              return (
                <BeachVolleyballPriceCard key={index} {...(game as any)} />
              );
            })}
        </div>
      </div>
    </div>
  );
}
