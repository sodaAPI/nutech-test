import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../auth/authSlice"; // Adjust path if needed
import { Link } from "react-router-dom"; // Import Link component

export default function Services() {
  const dispatch = useDispatch();
  const { services, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getServices()); // Fetch services when the component mounts
  }, [dispatch]);

  if (isLoading) return <p>Loading services...</p>;
  if (isError) return <p className="text-red-500">{message}</p>;

  return (
    <div className="flex flex-row gap-5 py-[50px]">
      {services.length === 0 ? (
        <p>No services available.</p>
      ) : (
        services.map((service) => (
          <Link
            key={service.service_code}
            to={`/payment/${service.service_code}`} // Use Link and dynamic path
            className="flex flex-col items-center gap-1"
          >
            <img
              src={service.service_icon}
              alt={service.service_name}
              className="w-[100px] h-[75px] object-cover"
            />
            <p className="text-center text-[12px]">{service.service_name}</p>
          </Link>
        ))
      )}
    </div>
  );
}
