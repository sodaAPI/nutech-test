import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import History from "./pages/Service/History";
import Payment from "./pages/Service/Payment";
import Topup from "./pages/Service/Topup";

function App() {
  return (
    <div className="App ">
      <BrowserRouter>
        <Routes>
          {/* Global */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/top-up" element={<Topup />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/transaction" element={<History />} />
          <Route path="/akun" element={<Profile />} />
          <Route path="/*" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default App;
