import { BasketballPriceCard } from "@/components/BasketballPriceCard";
import { BeachVolleyballPriceCard } from "@/components/BeachVolleyballPriceCard";
import { FootballPriceCard } from "@/components/FootballPriceCard";
import React from "react";

type Props = {};

export default function OurServices(props: Props) {
  return (
    <div className="flex justify-center pt-[50px] pb-[50px]">
      <div className="flex max-w-[1230px] flex flex-wrap justify-center w-full gap-[50px]">
        <FootballPriceCard
          sport="Football"
          league="U21"
          address="Aquatic Palace"
          gender="male"
          minPlayers={6}
          maxPlayers={12}
          earlyBirdTeamPrice={1000}
          earlyBirdPersonPrice={0}
          regularTeamPrice={1200}
          regularPersonPrice={0}
        />
        <FootballPriceCard
          sport="Football"
          league="U18"
          address="Aquatic Palace"
          gender="male"
          minPlayers={6}
          maxPlayers={12}
          earlyBirdTeamPrice={1000}
          earlyBirdPersonPrice={0}
          regularTeamPrice={1200}
          regularPersonPrice={0}
        />
        <FootballPriceCard
          sport="Football"
          league="U16"
          address="Aquatic Palace"
          gender="male"
          minPlayers={6}
          maxPlayers={12}
          regularTeamPrice={500}
          regularPersonPrice={0}
          earlyBirdTeamPrice={333}
          earlyBirdPersonPrice={0}
        />
        <FootballPriceCard
          sport="Girls Football"
          league="U-GIRLS"
          address="Aquatic Palace"
          gender="female"
          minPlayers={6}
          maxPlayers={12}
          earlyBirdTeamPrice={0}
          earlyBirdPersonPrice={0}
          regularTeamPrice={0}
          regularPersonPrice={0}
        />
        <BasketballPriceCard
          sport="Basketball"
          league="U21"
          address="Aquatic Palace"
          gender="male"
          minPlayers={3}
          maxPlayers={5}
          earlyBirdTeamPrice={333}
          earlyBirdPersonPrice={0}
          regularTeamPrice={500}
          regularPersonPrice={0}
        />
        <BasketballPriceCard
          sport="Basketball"
          league="Recreational"
          address="Aquatic Palace"
          gender="male"
          minPlayers={3}
          maxPlayers={5}
          earlyBirdTeamPrice={333}
          earlyBirdPersonPrice={0}
          regularTeamPrice={500}
          regularPersonPrice={0}
        />
        <BeachVolleyballPriceCard
          sport="Volleyball"
          league="U21"
          address="Aquatic Palace"
          gender="male"
          minPlayers={4}
          maxPlayers={6}
          earlyBirdTeamPrice={400}
          earlyBirdPersonPrice={0}
          regularTeamPrice={600}
          regularPersonPrice={0}
        />
        <BeachVolleyballPriceCard
          sport="Volleyball"
          league="Recreational"
          address="Aquatic Palace"
          gender="male"
          minPlayers={4}
          maxPlayers={6}
          earlyBirdTeamPrice={400}
          earlyBirdPersonPrice={0}
          regularTeamPrice={600}
          regularPersonPrice={0}
        />
      </div>
    </div>
  );
}
