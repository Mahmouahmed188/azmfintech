"use client";

import dynamic from "next/dynamic";

const InteractiveHero = dynamic(
  () => import("@/components/sections/InteractiveHero"),
  { ssr: false }
);

export default function InteractiveHeroWrapper() {
  return <InteractiveHero />;
}
