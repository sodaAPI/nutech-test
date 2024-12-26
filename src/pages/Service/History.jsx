import React, { useState } from "react";
import Saldo from "../../components/Utils/Saldo";
import Welcome from "../../components/Utils/Welcome";
import Navbar from "../../components/Utils/Navbar";

const TransactionItem = ({ amount, date, time, description, isPositive }) => {
  return (
    <div className="flex flex-row w-full items-center justify-between border rounded-[4px] px-[25px] py-2">
      <div className="flex flex-col gap-3">
        <span
          className={`text-[24px] font-medium ${
            isPositive ? "text-[#ff5f3b90]" : "text-[#FF603B]"
          }`}>
          {isPositive ? `+ Rp.${amount}` : `- Rp.${amount}`}
        </span>
        <div className="flex flex-row text-[12px] gap-5 text-gray-400">
          <span>{date}</span>
          <span>{time}</span>
        </div>
      </div>
      <span>{description}</span>
    </div>
  );
};

export default function History() {
  const transactions = [
    {
      amount: "10.000",
      date: "25 Desember 2023",
      time: "13:10 WIB",
      description: "Top Up Saldo",
      isPositive: true,
    },
    {
      amount: "10.000",
      date: "25 Desember 2023",
      time: "13:10 WIB",
      description: "Pulsa Prabayar",
      isPositive: false,
    },
    {
      amount: "10.000",
      date: "25 Desember 2023",
      time: "13:10 WIB",
      description: "Top Up Saldo",
      isPositive: true,
    },
    {
      amount: "10.000",
      date: "25 Desember 2023",
      time: "13:10 WIB",
      description: "Top Up Saldo",
      isPositive: true,
    },
    {
      amount: "20.000",
      date: "26 Desember 2023",
      time: "14:00 WIB",
      description: "Pulsa Prabayar",
      isPositive: false,
    },
    {
      amount: "50.000",
      date: "27 Desember 2023",
      time: "15:30 WIB",
      description: "Top Up Saldo",
      isPositive: true,
    },
  ];

  const [visibleCount, setVisibleCount] = useState(5);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5); // Load 5 more transactions on each click
  };

  return (
    <div className="flex flex-col px-[150px]">
      <Navbar />
      <div className="flex flex-row justify-between pt-[100px] items-start">
        <Welcome />
        <Saldo />
      </div>
      <div className="flex flex-col gap-5 pt-5">
        <h1 className="text-[24px] font-medium">Semua transaksi</h1>
        <div className="flex flex-col gap-5">
          {transactions.slice(0, visibleCount).map((transaction, index) => (
            <TransactionItem
              key={index}
              amount={transaction.amount}
              date={transaction.date}
              time={transaction.time}
              description={transaction.description}
              isPositive={transaction.isPositive}
            />
          ))}
        </div>
        {visibleCount < transactions.length && (
          <div className="flex items-center justify-center w-full mt-5">
            <button
              onClick={handleShowMore}
              className="text-[16px] font-semibold rounded-[4px] text-[#F82C14] h-[48px] px-6">
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
