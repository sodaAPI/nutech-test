import React from "react";
import Avatar from "../../assets/ProfilePhoto.png";

export default function Welcome() {
  return (
    <div className="flex flex-col gap-5 h-[100px]">
      <img src={Avatar} className="w-[75px]" />
      <div>
        <p className="text-[18px]">Selamat Datang,</p>
        <p className="font-semibold text-[36px]">Kristanto Wibowo</p>
      </div>
    </div>
  );
}
