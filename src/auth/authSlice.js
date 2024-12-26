import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  user: JSON.parse(localStorage.getItem("auth_user")) || null,
  token: localStorage.getItem("auth_token") || null,
  profile: JSON.parse(localStorage.getItem("auth_profile")) || null,
  balance: null,
  services: [],
  banners: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const registerUser = createAsyncThunk(
  "/register/user",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/register",
        user
      );
      const token = response.data.token;
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return { token, user: decodedToken };
    } catch (error) {
      const message = error.response?.data?.msg || "Registration failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "/login/user",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/login",
        user
      );
      if (response.data.status === 0) {
        const token = response.data.data.token;
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        return { token, user: decodedToken };
      } else {
        const message = response.data.message || "Login failed";
        toast.error(`Login Failed: ${message}`); // Error toast
        return thunkAPI.rejectWithValue(message);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(`Login Failed: ${message}`); // Error toast
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout action
export const logout = createAsyncThunk("/logout", async (_, thunkAPI) => {
  try {
    toast.success("Logout Successful"); // Success toast
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  } catch (error) {
    const message = error.response?.data?.msg || "Logout failed";
    toast.error(`Logout Failed: ${message}`); // Error toast
    return thunkAPI.rejectWithValue(message);
  }
});

// Fetch Profile
export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.get(
        "https://take-home-test-api.nutech-integrasi.com/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch profile";
      toast.error(`Fetch Profile Failed: ${message}`); // Error toast
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Balance
export const getBalance = createAsyncThunk("/balance", async (_, thunkAPI) => {
  const { auth } = thunkAPI.getState();
  const token = auth.token;

  if (!token) {
    toast.error("No token found. Please log in."); // Error toast
    return thunkAPI.rejectWithValue("No token found. Please log in.");
  }

  try {
    const response = await axios.get(
      "https://take-home-test-api.nutech-integrasi.com/balance",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data.balance;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to fetch balance.";
    toast.error(`Balance Fetch Failed: ${message}`); // Error toast
    return thunkAPI.rejectWithValue(message);
  }
});

// Get Services
export const getServices = createAsyncThunk(
  "/services",
  async (_, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    const token = auth.token;

    if (!token) {
      toast.error("No token found. Please log in."); // Error toast
      return thunkAPI.rejectWithValue("No token found. Please log in.");
    }

    try {
      const response = await axios.get(
        "https://take-home-test-api.nutech-integrasi.com/services",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch services.";
      toast.error(`Services Fetch Failed: ${message}`); // Error toast
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Top up balance
export const topUpBalance = createAsyncThunk(
  "/topup",
  async (topUpAmount, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    if (!token) {
      toast.error("No token found. Please log in."); // Error toast
      return thunkAPI.rejectWithValue("No token found. Please log in.");
    }

    try {
      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/topup",
        { top_up_amount: topUpAmount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Top-up Successful!"); // Success toast
      return response.data.data.balance; // Return updated balance
    } catch (error) {
      const message = error.response?.data?.message || "Top-up failed.";
      toast.error(`Top-up Failed: ${message}`); // Error toast
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTransactionHistory = createAsyncThunk(
  "auth/getTransactionHistory",
  async ({ limit, offset }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.get(
        "https://take-home-test-api.nutech-integrasi.com/transaction/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { limit, offset },
        }
      );
      return response.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch transactions.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const performTransaction = createAsyncThunk(
  "/transaction",
  async ({ service_code, nominal }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;

    if (!token) {
      toast.error("No token found. Please log in."); // Error toast
      return thunkAPI.rejectWithValue("No token found. Please log in.");
    }

    try {
      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/transaction",
        { service_code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 0) {
        toast.success("Transaction Successful!"); // Success toast
        return response.data.data; // Return the response data for invoice info
      } else {
        const message = response.data.message || "Transaction failed";
        toast.error(`Transaction Failed: ${message}`); // Error toast
        return thunkAPI.rejectWithValue(message);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Transaction failed.";
      toast.error(`Transaction Failed: ${message}`); // Error toast
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getBanners = createAsyncThunk("/banners", async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.token; // Get the token from the Redux state

  if (!token) {
    toast.error("No token found. Please log in."); // Error toast if no token
    return thunkAPI.rejectWithValue("No token found. Please log in.");
  }

  try {
    const response = await axios.get(
      "https://take-home-test-api.nutech-integrasi.com/banner",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );
    return response.data.data; // Return the list of banners
  } catch (error) {
    const message = error.response?.data?.message || "Failed to fetch banners";
    toast.error(`Banner Fetch Failed: ${message}`); // Show error toast
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({ first_name, last_name, email }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;

    if (!token) {
      toast.error("No token found. Please log in.");
      return thunkAPI.rejectWithValue("No token found. Please log in.");
    }

    try {
      const response = await axios.put(
        "https://take-home-test-api.nutech-integrasi.com/profile/update",
        { first_name, last_name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 0) {
        toast.success("Profile updated successfully!");
        return response.data.data; // Return updated profile data
      } else {
        const message = response.data.message || "Profile update failed";
        toast.error(`Profile Update Failed: ${message}`);
        return thunkAPI.rejectWithValue(message);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Profile update failed.";
      toast.error(`Profile Update Failed: ${message}`);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProfileImage = createAsyncThunk(
  "auth/updateProfileImage",
  async (file, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;

    if (!token) {
      toast.error("No token found. Please log in.");
      return thunkAPI.rejectWithValue("No token found. Please log in.");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.put(
        "https://take-home-test-api.nutech-integrasi.com/profile/image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === 0) {
        toast.success("Profile image updated successfully!");
        return response.data.data; // Return updated profile data with the new image URL
      } else {
        const message =
          response.data.message || "Failed to update profile image.";
        toast.error(`Profile Image Update Failed: ${message}`);
        return thunkAPI.rejectWithValue(message);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Profile image update failed.";
      toast.error(`Profile Image Update Failed: ${message}`);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Slice definition
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("auth_token", action.payload.token);
      localStorage.setItem("auth_user", JSON.stringify(action.payload.user));
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("auth_token", action.payload.token);
      localStorage.setItem("auth_user", JSON.stringify(action.payload.user));
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(fetchProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.profile = action.payload;
      localStorage.setItem("auth_profile", JSON.stringify(action.payload));
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(getBalance.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBalance.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.balance = action.payload;
    });
    builder.addCase(getBalance.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(getServices.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getServices.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.services = action.payload;
    });
    builder.addCase(getServices.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(topUpBalance.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(topUpBalance.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.balance = action.payload;
    });
    builder.addCase(topUpBalance.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(getTransactionHistory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTransactionHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.transactions = action.payload; // Make sure you're storing the payload correctly
    });
    builder.addCase(getTransactionHistory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(performTransaction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(performTransaction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.transaction = action.payload; // Save the transaction data
    });
    builder.addCase(performTransaction.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(getBanners.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBanners.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.banners = action.payload; // Store banners in state
    });
    builder.addCase(getBanners.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(updateProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.profile = action.payload;
      localStorage.setItem("auth_profile", JSON.stringify(action.payload));
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(updateProfileImage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfileImage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = {
        ...state.profile,
        profile_image: action.payload.profile_image, // Update the profile image
      };
      localStorage.setItem("auth_profile", JSON.stringify(action.payload));
    });
    builder.addCase(updateProfileImage.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
