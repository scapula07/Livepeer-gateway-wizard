import React from "react";
import Hero from "./hero";
import MidSection from "./midSection";
import HowItWorks from "./howitworks";
import Bottomsection from "./bottomsection";
import FAQ from "./faq";
import Footer from "../footer";
import Header from "./header";

export default function LandingPage() {
  return (
    <div className="w-full">
      <Header />
      <Hero />
      <MidSection />
      <HowItWorks />
      <Bottomsection />
      <FAQ />
      <Footer />
    </div>
  );
}
