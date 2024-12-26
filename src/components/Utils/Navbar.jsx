import React from "react";
import Logo from "../../assets/Logo.png";

export default function Navbar() {
  return (
    <nav className="bg-base-100 fixed w-full top-0 start-0 border-b">
      <div className="w-full flex flex-row items-center justify-between px-[150px] py-2">
        {/* Left Content */}
        <a
          href="/home"
          className="flex flex-row gap-2 w-[150px] items-center font-semibold">
          <img src={Logo} className="w-6" />
          SIMS PPOB
        </a>
        {/* Right Content */}
        <div className="flex items-center">
          <ul className="flex gap-5 items-center p-0 font-medium">
            <li className="block px-3 py-2">
              <a
                href="/top-up"
                className="block py-2 px-3 text-slate-900"
                aria-current="page">
                Top Up
              </a>
            </li>
            <li className="block px-3 py-2">
              <a href="/transaction" className="block py-2 px-3 text-slate-900">
                Transaction
              </a>
            </li>
            <li className="block px-3 py-2">
              <a href="/akun" className="block py-2 px-3 text-slate-900">
                Akun
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
