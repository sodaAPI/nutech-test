import React from "react";
import Banner1 from "../../assets/Banner1.png";
import Banner2 from "../../assets/Banner2.png";
import Banner3 from "../../assets/Banner3.png";
import Banner4 from "../../assets/Banner4.png";
import Banner5 from "../../assets/Banner5.png";

export default function CarouselServices() {
  return (
    <div className="flex flex-col gap-5 pl-[150px]">
      <h1 className="font-medium">Temukan promo menarik</h1>
      <div className="flex flex-row gap-5 overflow-x-auto scrollbar-hidden">
        <img src={Banner1} className="w-[325px] flex-shrink-0" />
        <img src={Banner2} className="w-[325px] flex-shrink-0" />
        <img src={Banner3} className="w-[325px] flex-shrink-0" />
        <img src={Banner4} className="w-[325px] flex-shrink-0" />
        <img src={Banner5} className="w-[325px] flex-shrink-0" />
      </div>
    </div>
  );
}
