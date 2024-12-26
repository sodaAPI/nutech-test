import React, { useState } from "react";
import Saldo from "../../components/Utils/Saldo";
import Welcome from "../../components/Utils/Welcome";
import Navbar from "../../components/Utils/Navbar";
import ImageListrik from "../../assets/Listrik.png";
import { FaCreditCard } from "react-icons/fa6";

export default function Payment() {
  const [nominal, setNominal] = useState("");

  // Function to format the number with thousand separators
  const formatNumber = (value) => {
    // Remove all non-numeric characters (excluding decimals)
    const numericValue = value.replace(/[^\d]/g, "");

    // Format the number with thousand separators
    const formattedValue = numericValue
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dot as thousand separator

    return formattedValue;
  };

  const handleNominalChange = (event) => {
    const value = event.target.value;

    // Get the formatted value
    const formattedValue = formatNumber(value);

    // Set the formatted value back to the state
    setNominal(formattedValue);
  };

  return (
    <div className="flex flex-col px-[150px]">
      <Navbar />
      <div className="flex flex-row justify-between pt-[100px] items-start">
        <Welcome />
        <Saldo />
      </div>
      <div className="flex flex-col gap-5 pt-5">
        <h1 className="text-[24px]">PemBayaran</h1>
        <div className="flex flex-row items-center gap-2">
          <img src={ImageListrik} className="size-[40px]" />
          <p className="font-medium text-[24px]">Listrik Prabayar</p>
        </div>
        <form className="pt-5">
          <div className="relative">
            <span
              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                nominal ? "text-black" : "text-gray-300"
              }`}>
              <FaCreditCard />
            </span>
            <input
              id="nominal"
              value={nominal}
              className="px-3 py-2 border border-gray-300 rounded-[4px] pl-10 w-full h-[50px]"
              placeholder="masukan nominal"
              type="text" // Set type to text to allow formatting
              onChange={handleNominalChange}
              required
              autoFocus
            />
          </div>
          <button className="text-[16px] mt-5 font-semibold rounded-[4px] bg-[#F82C14] h-[48px] text-white w-full">
            Bayar
          </button>
        </form>
      </div>
    </div>
  );
}
