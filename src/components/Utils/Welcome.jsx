import React from "react";
import { useSelector } from "react-redux";
import Avatar from "../../assets/ProfilePhoto.png";

export default function Welcome() {
  const { profile } = useSelector((state) => state.auth);

  const firstName = profile?.first_name || "Undefined";
  const lastName = profile?.last_name || "";

  const profileImage =
    profile?.profile_image ===
    "https://minio.nutech-integrasi.com/take-home-test/null"
      ? Avatar
      : profile?.profile_image || Avatar;

  return (
    <div className="flex flex-col items-center gap-3 h-auto">
      <img
        src={profileImage}
        className="w-20 h-20 rounded-full object-cover"
        alt="User Avatar"
      />
      <div className="text-center">
        <p className="text-lg text-gray-600">Selamat Datang,</p>
        <p className="font-bold text-2xl">
          {firstName} {lastName}
        </p>
      </div>
    </div>
  );
}
