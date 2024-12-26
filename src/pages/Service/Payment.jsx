import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams to access route parameters
import { FaCreditCard } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../auth/authSlice"; // Assuming you have the necessary actions
import { toast } from "react-toastify";
import axios from "axios";
import ImageListrik from "../../assets/Listrik.png";
import Navbar from "../../components/Utils/Navbar";
import Welcome from "../../components/Utils/Welcome";

export default function Payment() {
  const { service_code } = useParams(); // Get the service_code from URL parameter
  const [nominal, setNominal] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { services, isLoading, isError, message, token } = useSelector(
    (state) => state.auth
  );
  const [service, setService] = useState(null);

  // Function to format the number with thousand separators
  const formatNumber = (value) => {
    const numericValue = value.replace(/[^\d]/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dot as thousand separator
  };

  const handleNominalChange = (event) => {
    const value = event.target.value;
    const formattedValue = formatNumber(value);
    setNominal(formattedValue);
  };

  // Fetch the service data based on the service_code
  useEffect(() => {
    if (services.length === 0) {
      dispatch(getServices()); // Fetch services if not already fetched
    } else {
      const foundService = services.find(
        (service) => service.service_code === service_code
      );
      setService(foundService); // Set the service based on the service_code
    }
  }, [dispatch, service_code, services]);

  // Handle the payment submission
  const handlePayment = async () => {
    // Ensure token and nominal are available
    if (!token) {
      toast.error("You must be logged in to make a payment.");
      return;
    }

    const formattedNominal = nominal.replace(/[^\d]/g, ""); // Remove non-numeric characters

    // Check if nominal is valid
    if (!formattedNominal || formattedNominal <= 0) {
      toast.error("Invalid nominal amount.");
      return;
    }

    // Prepare the payment request
    const requestBody = {
      service_code: service_code,
      amount: formattedNominal, // Sending the numeric value of the nominal
    };

    try {
      // Send POST request to the transaction API
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
        navigate("/transaction"); // Redirect to transaction history page
      } else {
        toast.error(response.data.message || "Transaction Failed.");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Transaction failed.";
      toast.error(message); // Show error message
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">{message}</p>;

  return (
    <div className="flex flex-col px-[150px]">
      <Navbar />
      <div className="flex flex-row justify-between pt-[100px] items-start">
        <Welcome />
      </div>
      <div className="flex flex-col gap-5 pt-5">
        <h1 className="text-[24px]">PemBayaran</h1>
        {/* Display service details if available */}
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
            e.preventDefault(); // Prevent the default form submission
            handlePayment();
          }}
        >
          <div className="relative">
            <span
              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                nominal ? "text-black" : "text-gray-300"
              }`}
            >
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
            className="text-[16px] mt-5 font-semibold rounded-[4px] bg-[#F82C14] h-[48px] text-white w-full"
          >
            Bayar
          </button>
        </form>
      </div>
    </div>
  );
}
