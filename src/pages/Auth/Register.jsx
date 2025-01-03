import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../auth/authSlice";
import LoginAsset from "../../assets/LoginAsset.png";
import Logo from "../../assets/Logo.png";
import { FaRegEye, FaRegEyeSlash, FaRegUser } from "react-icons/fa6";
import { MdOutlineLock } from "react-icons/md";

export default function Register() {
  const [email, setEmail] = useState("");
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const userData = {
      email,
      firstName: namaDepan,
      lastName: namaBelakang,
      password,
    };
    const resultAction = await dispatch(RegisterUser(userData));
    if (RegisterUser.fulfilled.match(resultAction)) {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-row w-full items-center h-screen">
      <div className="w-full">
        <div className="flex flex-col h-full items-center justify-center max-sm:p-[25px] p-[250px]">
          <div className="flex flex-row gap-2 justify-center items-center">
            <img src={Logo} className="w-8" alt="Logo" />
            <p className="font-semibold text-[28px]">SIMS PPOB</p>
          </div>
          <h1 className="flex font-semibold text-[34px] items-center justify-center text-center py-10 w-[350px]">
            Masuk atau buat akun untuk memulai
          </h1>
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={handleRegister}>
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
                className="px-3 py-2 border border-gray-300 rounded-[4px] pl-10 w-full h-[50px]"
                placeholder="Masukan email anda"
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
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
                className="px-3 py-2 border border-gray-300 rounded-[4px] pl-10 w-full h-[50px]"
                placeholder="Nama depan"
                type="text"
                onChange={(event) => setNamaDepan(event.target.value)}
                required
              />
            </div>
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
                className="px-3 py-2 border border-gray-300 rounded-[4px] pl-10 w-full h-[50px]"
                placeholder="Nama belakang"
                type="text"
                onChange={(event) => setNamaBelakang(event.target.value)}
                required
              />
            </div>
            <div className="relative">
              <span
                className={`absolute inset-y-0 left-0 flex items-center pl-4 ${
                  password ? "text-black" : "text-gray-300"
                }`}>
                <MdOutlineLock />
              </span>
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Buat password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-[4px] pl-10 w-full h-[50px]"
                autoComplete="current-password"
                required
              />
              {passwordVisible ? (
                <FaRegEye
                  onClick={togglePasswordVisibility}
                  className="absolute end-0 top-4 right-3 cursor-pointer text-[#0917475C]"
                />
              ) : (
                <FaRegEyeSlash
                  onClick={togglePasswordVisibility}
                  className="absolute end-0 top-4 right-3 cursor-pointer text-[#0917475C]"
                />
              )}
            </div>
            <div className="relative">
              <span
                className={`absolute inset-y-0 left-0 flex items-center pl-4 ${
                  confirmPassword ? "text-black" : "text-gray-300"
                }`}>
                <MdOutlineLock />
              </span>
              <input
                id="confirmPassword"
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Konfirmasi password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-[4px] pl-10 w-full h-[50px]"
                autoComplete="current-password"
                required
              />
              {confirmPasswordVisible ? (
                <FaRegEye
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute end-0 top-4 right-3 cursor-pointer text-[#0917475C]"
                />
              ) : (
                <FaRegEyeSlash
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute end-0 top-4 right-3 cursor-pointer text-[#0917475C]"
                />
              )}
            </div>
            <button
              type="submit"
              className="text-[16px] font-semibold rounded-[4px] bg-[#F82C14] h-[48px] text-white w-full">
              Registrasi
            </button>
          </form>
          <span className="text-[14px] text-slate-400 pt-10">
            sudah punya akun? login{" "}
            <a href="/login" className="text-[#F82C14] font-bold">
              di sini
            </a>
          </span>
        </div>
      </div>
      <div className="flex max-lg:hidden items-center justify-center w-screen h-screen">
        <img className="w-full" src={LoginAsset} alt="Login Asset" />
      </div>
    </div>
  );
}
