import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBanners } from "../../auth/authSlice";

export default function CarouselPromo() {
  const dispatch = useDispatch();
  const { banners, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  // Fetch banners on component mount
  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{message}</div>;
  }

  return (
    <div className="flex flex-col gap-5 pl-[150px]">
      <h1 className="font-medium">Temukan promo menarik</h1>
      <div className="flex flex-row gap-5 overflow-x-auto scrollbar-hidden">
        {banners?.map((banner, index) => (
          <img
            key={index}
            src={banner.banner_image}
            alt={banner.banner_name}
            className="w-[325px] flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
}
