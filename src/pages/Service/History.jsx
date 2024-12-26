import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionHistory } from '../../auth/authSlice'; // import the new action
import Saldo from '../../components/Utils/Saldo';
import Welcome from '../../components/Utils/Welcome';
import Navbar from '../../components/Utils/Navbar';

// Transaction Item component
const TransactionItem = ({ amount, date, time, description, isPositive }) => {
  return (
    <div className="flex flex-row w-full items-center justify-between border rounded-[4px] px-[25px] py-2">
      <div className="flex flex-col gap-3">
        <span
          className={`text-[24px] font-medium ${isPositive ? 'text-[#ff5f3b90]' : 'text-[#FF603B]'}`}>
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
  const { transactions, isLoading, isError, message } = useSelector((state) => state.auth);
  
  // Initialize visibleCount and offset
  const [visibleCount, setVisibleCount] = useState(5); // Start with 5 transactions visible
  const [offset, setOffset] = useState(0); // Offset for pagination

  useEffect(() => {
    dispatch(getTransactionHistory({ limit: visibleCount, offset: offset }));
  }, [dispatch, visibleCount, offset]);

  const handleShowMore = () => {
    const newOffset = offset + visibleCount; // Update offset to load next set of transactions
    setOffset(newOffset); // Increase offset by the current visibleCount
    setVisibleCount((prev) => prev + 5); // Load 5 more transactions
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {message}</div>;

  // Function to format the amount to the desired currency format
  const formatAmount = (amount) => {
    return amount.toLocaleString(); // Add currency formatting
  };

  return (
    <div className="flex flex-col px-[150px]">
      <Navbar />
      <div className="flex flex-row justify-between pt-[100px] items-start">
        <Welcome />
        {/* <Saldo /> */}
      </div>
      <div className="flex flex-col gap-5 pt-5">
        <h1 className="text-[24px] font-medium">Semua transaksi</h1>
        <div className="flex flex-col gap-5">
          {transactions?.records?.map((transaction, index) => {
            const transactionDate = new Date(transaction.created_on);
            const formattedDate = transactionDate.toLocaleDateString();
            const formattedTime = transactionDate.toLocaleTimeString();

            return (
              <TransactionItem
                key={index}
                amount={formatAmount(transaction.total_amount)}
                date={formattedDate}
                time={formattedTime}
                description={transaction.description}
                isPositive={transaction.transaction_type === 'TOPUP'}
              />
            );
          })}
        </div>
        {transactions?.records?.length >= visibleCount && (
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
