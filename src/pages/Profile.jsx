import React, { useState } from "react";
import Navbar from "../components/Utils/Navbar";
import Avatar from "../assets/ProfilePhoto.png";
import { FaRegUser } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [email, setEmail] = useState("");
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const [isEditState, setEditState] = useState(false);
  const toggleEditState = () => {
    setEditState(!isEditState);
  };

  return (
    <div className="flex flex-col px-[150px]">
      <Navbar />

      {isEditState ? (
        <div className="flex flex-col items-center justify-center pt-[100px] gap-2">
          <div className="relative">
            {/* Avatar image container */}
            <img src={Avatar} className="size-[150px]" alt="avatar" />
            {/* Edit Photo Button */}
            <button className="absolute bottom-0 right-0 text-sm bg-white p-2 rounded-full border">
              <FaPen />
            </button>
          </div>
          <h1 className="text-[32px] font-medium">Kristanto Wibowo</h1>
          <div className="flex flex-col gap-7 w-full px-[200px] py-5">
            <form className="flex flex-col gap-7 w-full">
              <div className="flex flex-col gap-3">
                <span className="font-medium">Email</span>
                <div className="relative">
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-4 ${
                      email ? "text-black" : "text-gray-300"
                    }`}>
                    @
                  </span>
                  <input
                    id="email"
                    value={email}
                    min="0"
                    className="px-3 py-2 border border-gray-300 rounded-[4px] pl-10 w-full h-[50px]"
                    placeholder="masukan email anda"
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    required
                    autoFocus
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-medium">Nama Depan</span>
                <div className="relative">
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-4 ${
                      namaDepan ? "text-black" : "text-gray-300"
                    }`}>
                    <FaRegUser />
                  </span>
                  <input
                    id="namaDepan"
                    value={namaDepan}
                    min="0"
                    className="px-3 py-2 border border-gray-300 rounded-[4px] pl-10 w-full h-[50px]"
                    placeholder="masukan nama depan anda"
                    onChange={(event) => setNamaDepan(event.target.value)}
                    type="name"
                    required
                    autoFocus
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-medium">Nama Belakang</span>
                <div className="relative">
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-4 ${
                      namaBelakang ? "text-black" : "text-gray-300"
                    }`}>
                    <FaRegUser />
                  </span>
                  <input
                    id="namaBelakang"
                    value={namaBelakang}
                    min="0"
                    className="px-3 py-2 border border-gray-300 rounded-[4px] pl-10 w-full h-[50px]"
                    placeholder="masukan nama belakang anda"
                    onChange={(event) => setNamaBelakang(event.target.value)}
                    type="name"
                    required
                    autoFocus
                  />
                </div>
              </div>
              <button
                onClick={toggleEditState}
                className="text-[16px] font-semibold rounded-[4px] bg-[#F82C14] h-[48px] text-white w-full">
                Simpan
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center pt-[100px] gap-2">
          <div className="relative">
            <img src={Avatar} className="size-[150px]" alt="avatar" />
          </div>
          <h1 className="text-[32px] font-medium">Kristanto Wibowo</h1>
          <div className="flex flex-col gap-7 w-full px-[200px] py-5">
            <div className="flex flex-col gap-7 w-full">
              <div className="flex flex-col gap-3">
                <span className="font-medium">Email</span>
                <div className="relative">
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-4 ${
                      email ? "text-black" : "text-gray-300"
                    }`}>
                    @
                  </span>
                  <input
                    id="email"
                    value={email}
                    min="0"
                    className="px-3 py-2 border border-gray-300 rounded-[4px] pl-10 w-full h-[50px]"
                    type="email"
                    disabled
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-medium">Nama Depan</span>
                <div className="relative">
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-4 ${
                      namaDepan ? "text-black" : "text-gray-300"
                    }`}>
                    <FaRegUser />
                  </span>
                  <input
                    id="namaDepan"
                    value={namaDepan}
                    min="0"
                    className="px-3 py-2 border border-gray-300 rounded-[4px] pl-10 w-full h-[50px]"
                    type="name"
                    disabled
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-medium">Nama Belakang</span>
                <div className="relative">
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-4 ${
                      namaBelakang ? "text-black" : "text-gray-300"
                    }`}>
                    <FaRegUser />
                  </span>
                  <input
                    id="namaBelakang"
                    value={namaBelakang}
                    min="0"
                    className="px-3 py-2 border border-gray-300 rounded-[4px] pl-10 w-full h-[50px]"
                    type="name"
                    disabled
                  />
                </div>
              </div>
              <button
                onClick={toggleEditState}
                className="text-[16px] font-semibold rounded-[4px] bg-[#F82C14] h-[48px] text-white w-full">
                Edit Profil
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="text-[16px] font-semibold rounded-[4px] border border-[#F82C14] h-[48px] text-[#F82C14] w-full">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
