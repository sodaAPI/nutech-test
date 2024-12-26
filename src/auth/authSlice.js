import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem("auth_user")) || null,
  token: localStorage.getItem("auth_token") || null,
  profile: null,
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

export const loginUser = createAsyncThunk(
  "/login/user",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/login",
        user
      );

      if (response.data.status === 0) {
        // Check if status indicates success
        const token = response.data.data.token;
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        return { token, user: decodedToken };
      } else {
        const message = response.data.message || "Login failed";
        toast.error(`Login Failed: ${message}`);
        return thunkAPI.rejectWithValue(message);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout action
export const logout = createAsyncThunk("/logout", async (_, thunkAPI) => {
  try {
    toast.success("Logout Successful");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      toast.error(`Logout Failed: ${message}`);
      return thunkAPI.rejectWithValue(message);
    }
  }
});

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
      return response.data.data; // Assuming the profile data is in `data`
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch profile";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
