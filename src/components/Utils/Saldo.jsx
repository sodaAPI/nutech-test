import React, { useState } from "react";
import BG from "../../assets/BackgroundSaldo.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export default function Saldo() {
  const [saldoVisible, setSaldoVisible] = useState(false);

  const toggleSaldoVisibility = () => {
    setSaldoVisible(!saldoVisible);
  };

  return (
    <div className="relative">
      {/* Background Image */}
      <img
        src={BG}
        className="w-full h-[200px] object-cover rounded-[18px]"
        alt="Background"
      />
      {/* Content */}
      <div className="absolute top-0 start-0 p-5 h-full w-full flex flex-col gap-2 justify-center items-start text-white">
        <span className="text-lg">Saldo Anda</span>
        <div className="flex flex-row items-center gap-2 mt-2">
          <span className="text-[36px] font-bold">Rp</span>
          <span className="text-[36px] font-bold">
            {saldoVisible ? "100.000" : "•••••••"}
          </span>
        </div>
        {/* Toggle Button */}
        <button
          onClick={toggleSaldoVisibility}
          className="flex items-center gap-2 mt-3 text-sm">
          {saldoVisible ? "Tutup Saldo" : "Lihat Saldo"}
          {saldoVisible ? <FaRegEyeSlash /> : <FaRegEye />}
        </button>
      </div>
    </div>
  );
}
