import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionHistory, getBalance } from "../../auth/authSlice"; 
import Welcome from "../../components/Utils/Welcome";
import Navbar from "../../components/Utils/Navbar";
import BG from "../../assets/BackgroundSaldo.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

// Transaction Item component
const TransactionItem = ({ amount, date, time, description, isPositive }) => {
  return (
    <div className="flex flex-row w-full items-center justify-between border rounded-[4px] px-[25px] py-2">
      <div className="flex flex-col gap-3">
        <span
          className={`text-[24px] font-medium ${isPositive ? "text-[#ff5f3b90]" : "text-[#FF603B]"}`}
        >
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
  const dispatch = useDispatch();
  const { transactions, isLoading, isError, message, balance } = useSelector(
    (state) => state.auth
  );

  // Paginate state management
  const [visibleCount, setVisibleCount] = useState(5);
  const [offset, setOffset] = useState(0); // Track the offset for pagination
  const [saldoVisible, setSaldoVisible] = useState(false);

  useEffect(() => {
    dispatch(getTransactionHistory({ limit: visibleCount, offset }));
  }, [dispatch, visibleCount, offset]); // Trigger only when visibleCount or offset changes

  useEffect(() => {
    dispatch(getBalance());
  }, [dispatch]); // Get balance on component mount

  const handleShowMore = () => {
    setOffset(prev => prev + visibleCount); // Increase the offset by the current visibleCount
    setVisibleCount(prev => prev + 5); // Load 5 more transactions
  };

  const toggleSaldoVisibility = () => {
    setSaldoVisible(!saldoVisible);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {message}</div>;

  return (
    <div className="flex flex-col px-[150px]">
      <Navbar />
      <div className="flex flex-row justify-between pt-[100px] items-start">
        <Welcome />
        <div className="relative">
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
              className="flex items-center gap-2 mt-3 text-sm"
            >
              {saldoVisible ? "Tutup Saldo" : "Lihat Saldo"}
              {saldoVisible ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
            {isError && <p className="text-sm text-red-500 mt-2">{message}</p>}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 pt-5">
        <h1 className="text-[24px] font-medium">Semua transaksi</h1>
        <div className="flex flex-col gap-5">
          {transactions?.records?.length > 0 ? (
            transactions.records.map((transaction, index) => (
              <TransactionItem
                key={index}
                amount={transaction.total_amount}
                date={new Date(transaction.created_on).toLocaleDateString()}
                time={new Date(transaction.created_on).toLocaleTimeString()}
                description={transaction.description}
                isPositive={transaction.transaction_type === "TOPUP"}
              />
            ))
          ) : (
            <p>No transactions found.</p>
          )}
        </div>
        {transactions?.records?.length > visibleCount && (
          <div className="flex items-center justify-center w-full mt-5">
            <button
              onClick={handleShowMore}
              className="text-[16px] font-semibold rounded-[4px] text-[#F82C14] h-[48px] px-6"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
