// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ------------------------------------------
   LOGIN : récupère le token
------------------------------------------- */
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data.body.token;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Network error");
    }
  }
);

/* ------------------------------------------
   PROFILE : récupère les infos du user
------------------------------------------- */
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (token, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data.body;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Network error");
    }
  }
);

/* ------------------------------------------
   UPDATE USERNAME : PUT /profile
------------------------------------------- */
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async ({ token, userName }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userName }),
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data.body;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Network error");
    }
  }
);

/* ------------------------------------------
   SLICE
------------------------------------------- */
const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token") || null,
    firstName: null,
    lastName: null,
    userName: null,
    isLoggedIn: !!localStorage.getItem("token"),
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.firstName = null;
      state.lastName = null;
      state.userName = null;
      state.isLoggedIn = false;

      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      /* LOGIN */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isLoggedIn = true;

        localStorage.setItem("token", action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* PROFILE */
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.userName = action.payload.userName;
      })

      /* UPDATE USERNAME */
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userName = action.payload.userName;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
