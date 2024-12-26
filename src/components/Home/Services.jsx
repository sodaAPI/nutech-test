import React from "react";
import ImagePBB from "../../assets/PBB.png";
import ImageListrik from "../../assets/Listrik.png";
import ImagePulsa from "../../assets/Pulsa.png";

export default function Services() {
  return (
    <div className="flex flex-row gap-10 py-[50px]">
      <a
        href="/payment"
        className="flex flex-col items-center justify-center gap-1">
        <img src={ImagePBB} alt="" />
        <p>PBB</p>
      </a>
      <a
        href="/payment"
        className="flex flex-col items-center justify-center gap-1">
        <img src={ImageListrik} alt="" />
        <p>Listrik</p>
      </a>
      <a
        href="/payment"
        className="flex flex-col items-center justify-center gap-1">
        <img src={ImagePulsa} alt="" />
        <p>Pulsa</p>
      </a>
    </div>
  );
}
