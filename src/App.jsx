import { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "./auth/authSlice"; // Adjust the import path

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import History from "./pages/Service/History";
import Payment from "./pages/Service/Payment";
import Topup from "./pages/Service/Topup";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const { token, profile } = useSelector((state) => state.auth);

  // Fetch the profile when the token changes
  useEffect(() => {
    if (token && !profile) {
      dispatch(fetchProfile());
    }
  }, [token, dispatch, profile]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/top-up"
            element={
              <ProtectedRoute>
                <Topup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/:service_code"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transaction"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/akun"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default App;
