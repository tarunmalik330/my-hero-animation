import CardsAnimation from "@/components/CardsAnimation";
import Hero from "@/components/Hero";
import PortfolioAnimation from "@/components/PortfolioAnimation";
import WhatYouReceive from "@/components/WhatYouReceive";

export default function Home() {
  return (
    <div>
      <Hero />
      <WhatYouReceive />
      <CardsAnimation />
      <PortfolioAnimation />
    </div>
  );
}
