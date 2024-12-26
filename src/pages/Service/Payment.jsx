import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCreditCard, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getServices, getBalance } from "../../auth/authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import ImageListrik from "../../assets/Listrik.png";
import Navbar from "../../components/Utils/Navbar";
import Welcome from "../../components/Utils/Welcome";
import BG from "../../assets/BackgroundSaldo.png";

export default function Payment() {
  const { service_code } = useParams();
  const [nominal, setNominal] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { services, isLoading, isError, message, token, balance } = useSelector(
    (state) => state.auth
  );
  const [service, setService] = useState(null);
  const [saldoVisible, setSaldoVisible] = useState(false);

  const formatNumber = (value) => {
    const numericValue = value.replace(/[^\d]/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleNominalChange = (event) => {
    const value = event.target.value;
    const formattedValue = formatNumber(value);
    setNominal(formattedValue);
  };

  // Fetch the service data based on the service_code
  useEffect(() => {
    if (services.length === 0) {
      dispatch(getServices());
    } else {
      const foundService = services.find(
        (service) => service.service_code === service_code
      );
      setService(foundService);
    }
  }, [dispatch, service_code, services]);

  useEffect(() => {
    dispatch(getBalance());
  }, [dispatch]);

  const handlePayment = async () => {
    if (!token) {
      toast.error("You must be logged in to make a payment.");
      return;
    }

    const formattedNominal = nominal.replace(/[^\d]/g, "");

    if (!formattedNominal || formattedNominal <= 0) {
      toast.error("Invalid nominal amount.");
      return;
    }

    const requestBody = {
      service_code: service_code,
      amount: formattedNominal,
    };

    try {
      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/transaction",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 0) {
        toast.success("Transaction Successful!");
        navigate("/transaction");
      } else {
        toast.error(response.data.message || "Transaction Failed.");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Transaction failed.";
      toast.error(message);
    }
  };

  const toggleSaldoVisibility = () => {
    setSaldoVisible(!saldoVisible);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">{message}</p>;

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
          <div className="absolute top-0 start-0 p-5 h-full w-full flex flex-col gap-2 justify-center items-start text-white">
            <span className="text-lg">Saldo Anda</span>
            <div className="flex flex-row items-center gap-2 mt-2">
              <span className="text-[36px] font-bold">Rp</span>
              <span className="text-[36px] font-bold">
                {saldoVisible
                  ? balance?.toLocaleString() || "0"
                  : "•••••••"}
              </span>
            </div>
            <button
              onClick={toggleSaldoVisibility}
              className="flex items-center gap-2 mt-3 text-sm">
              {saldoVisible ? "Tutup Saldo" : "Lihat Saldo"}
              {saldoVisible ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
            {isError && <p className="text-sm text-red-500 mt-2">{message}</p>}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 pt-5">
        <h1 className="text-[24px]">PemBayaran</h1>
        {service ? (
          <div className="flex flex-row items-center gap-2">
            <img
              src={service.service_icon || ImageListrik}
              alt={service.service_name}
              className="w-[40px] h-[40px] object-cover"
            />
            <p className="font-medium text-[24px]">{service.service_name}</p>
          </div>
        ) : (
          <p>Service not found.</p>
        )}
        <form
          className="pt-5"
          onSubmit={(e) => {
            e.preventDefault();
            handlePayment();
          }}>
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
              required
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="text-[16px] mt-5 font-semibold rounded-[4px] bg-[#F82C14] h-[48px] text-white w-full">
            Bayar
          </button>
        </form>
      </div>
    </div>
  );
}
