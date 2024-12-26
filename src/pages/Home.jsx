import React from "react";
import Saldo from "../components/Utils/Saldo";
import Welcome from "../components/Utils/Welcome";
import Navbar from "../components/Utils/Navbar";
import Services from "../components/Home/Services";
import CarouselServices from "../components/Home/CarouselServices";

export default function Home() {
  return (
    <>
      <div className="flex flex-col px-[150px]">
        <Navbar />
        <div className="flex flex-row justify-between pt-[100px] items-start">
          <Welcome />
          <Saldo />
        </div>
        <Services />
      </div>
      <CarouselServices />
    </>
  );
}
