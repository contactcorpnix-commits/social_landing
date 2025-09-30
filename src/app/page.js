import Image from "next/image";
import Footer from "@/components/layout/foorter";
import Header from "@/components/layout/header";
import Hero from "@/components/sections/hero";
import Showcase from "@/components/sections/showcase";
import PriceCard from "@/components/sections/pricecard";
import FAQs from "@/components/sections/faqs";
import Assistance from "@/components/sections/assistance";

export default function Home() {
  return (
    <div className="font-poppins">
      <Header/>
      <Hero />
      <Assistance />
      <Showcase />
      <PriceCard />
      <FAQs />
      <Footer />
    </div>
  );
}
