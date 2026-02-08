import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import InteractiveHeroWrapper from "@/components/sections/InteractiveHeroWrapper";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Partners from "@/components/sections/Partners";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      {/* Toggle between Hero and InteractiveHero based on your preference */}
      <InteractiveHeroWrapper />
      {/* <Hero /> */}
      <Partners />
      <About />
      <Services />
      <Projects />
      <CTA />
      <Footer />
    </main>
  );
}
