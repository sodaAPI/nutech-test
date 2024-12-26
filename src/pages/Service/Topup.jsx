import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Saldo from "../../components/Utils/Saldo";
import Welcome from "../../components/Utils/Welcome";
import Navbar from "../../components/Utils/Navbar";
import { FaCreditCard } from "react-icons/fa6";
import { topUpBalance } from "../../auth/authSlice"; // Import the topUpBalance action
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const dispatch = useDispatch();
  const [nominal, setNominal] = useState("");
  const navigate = useNavigate();

  const formatNumber = (value) => {
    const numericValue = value.replace(/[^\d]/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleNominalChange = (event) => {
    const value = event.target.value;
    setNominal(formatNumber(value));
  };

  // Function to handle top-up action
  const handleTopUp = () => {
    const numericAmount = nominal.replace(/[^\d]/g, ""); // Remove non-numeric characters
    const parsedAmount = parseInt(numericAmount);

    if (parsedAmount < 10000) {
      toast.error("Nominal top-up harus lebih dari Rp10.000");
    } else if (parsedAmount > 1000000) {
      toast.error("Nominal top-up tidak boleh lebih dari Rp1.000.000");
    } else if (parsedAmount > 0) {
      dispatch(topUpBalance(parsedAmount)); // Dispatch topUpBalance action
      navigate("/transaction");
    } else {
      toast.error("Nominal harus lebih besar dari 0 dan berupa angka.");
    }
  };

  return (
    <div className="flex flex-col px-[150px]">
      <Navbar />
      <div className="flex flex-row justify-between pt-[100px] items-start">
        <Welcome />
        <Saldo />
      </div>
      <div className="flex flex-col gap-5 pt-5">
        <div>
          <h1 className="text-[24px]">Silakan masukan</h1>
          <p className="font-medium text-[32px]">Nominal Top Up</p>
        </div>
        <form className="flex flex-row justify-between gap-3 w-full items-center pt-2">
          <div className="w-full max-w-[1270px]">
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
                type="text"
                onChange={handleNominalChange}
                aria-label="Masukan nominal top-up"
                required
                autoFocus
              />
            </div>
            <button
              type="button"
              className="text-[16px] mt-5 font-semibold rounded-[4px] bg-[#F82C14] h-[48px] text-white w-full"
              onClick={handleTopUp} // Trigger top-up
            >
              Bayar
            </button>
          </div>
          <div className="w-fit grid grid-cols-3 grid-rows-2 gap-5">
            {[10000, 20000, 50000, 100000, 250000, 500000].map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setNominal(formatNumber(amount.toString()))}
                className="mx-5 py-2 px-5 border border-gray-300 rounded-[4px] w-full h-[50px]"
                aria-label={`Top up Rp.${amount.toLocaleString("id-ID")}`}>
                Rp.{amount.toLocaleString("id-ID")}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
