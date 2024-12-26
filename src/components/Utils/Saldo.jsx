import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBalance } from "../../auth/authSlice";
import BG from "../../assets/BackgroundSaldo.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export default function Saldo() {
  const [saldoVisible, setSaldoVisible] = useState(false);
  const dispatch = useDispatch();
  const { balance, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getBalance());
  }, [dispatch]);

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
            {isLoading
              ? "Loading..."
              : isError
              ? "Error"
              : saldoVisible
              ? balance?.toLocaleString() || "0"
              : "•••••••"}
          </span>
        </div>
        {/* Toggle Button */}
        <button
          onClick={toggleSaldoVisibility}
          className="flex items-center gap-2 mt-3 text-sm">
          {saldoVisible ? "Tutup Saldo" : "Lihat Saldo"}
          {saldoVisible ? <FaRegEyeSlash /> : <FaRegEye />}
        </button>
        {isError && <p className="text-sm text-red-500 mt-2">{message}</p>}
      </div>
    </div>
  );
}
