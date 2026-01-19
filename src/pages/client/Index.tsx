import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";
import Footer from "@/components/Footer";
import { useEffect } from "react";

// https://tally.so/r/obRMRb

const Index = () => {
  // useEffect(() => {
  //   async function positionApi() {
  //     const api = await fetch(
  //       "http://api.positionstack.com/v1/reverse?access_key=f56aa2c31cd1c0ebbe06fefdf9f4bf92&query=6.6778,3.1654"
  //     );
  //     const res = await api.json();
  //     console.log(res);
  //   }

  //   positionApi();
  // }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Benefits />
      <Footer />
    </div>
  );
};

export default Index;
