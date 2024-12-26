import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser, fetchProfile } from "../../auth/authSlice";
import LoginAsset from "../../assets/LoginAsset.png";
import Logo from "../../assets/Logo.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineLock } from "react-icons/md";

export default function Login() {
  const [email, setEmail] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    const userData = { email, password };
    const resultAction = await dispatch(loginUser(userData));

    if (loginUser.fulfilled.match(resultAction)) {
      toast.success("Login Successful!");
      await dispatch(fetchProfile()); // Fetch user profile data
      navigate("/home");
    } else {
      toast.error(resultAction.payload || "Login failed. Please try again.");
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
          <form className="flex flex-col gap-5 w-full" onSubmit={handleLogin}>
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
                autoFocus
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
                placeholder="Masukan password anda"
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

            <button
              type="submit"
              className="text-[16px] font-semibold rounded-[4px] bg-[#F82C14] h-[48px] text-white w-full">
              Masuk
            </button>
          </form>

          <span className="text-[14px] text-slate-400 pt-10">
            belum punya akun? registrasi{" "}
            <a href="/register" className="text-[#F82C14] font-bold">
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
