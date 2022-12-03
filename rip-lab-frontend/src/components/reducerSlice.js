import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await AuthService.register(username, email, password);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState = {
  movies: [],
  seats: [],
  orders: [],
  orderStatuses: [],
  apiBase: "http://127.0.0.1:8080/api",
  isLoggedIn: false,
  user: null,
};

if (user) {
  initialState.isLoggedIn = true;
  initialState.user = user;
}

const slice = createSlice({
  name: "toolkit",
  initialState: initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    addMovie: (state, action) => {
      state.movies.push(action.payload);
    },
    setSeats: (state, action) => {
      state.seats = action.payload;
    },
    addSeat: (state, action) => {
      state.seats.push(action.payload);
    },
    deleteSeat: (state, action) => {
      const tmp = state.seats
          .slice(0, state.seats.length)
          .filter((x) => +x.id !== +action.payload);

      state.seats = tmp;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    updateOrder: (state, action) => {
      const tmp = state.orders
        .slice(0, state.orders.length)
        .filter((x) => +x.id !== action.payload.id);
      tmp.push(action.payload);

      state.orders = tmp;
    },
    deleteOrder: (state, action) => {
      const tmp = state.orders
        .slice(0, state.orders.length)
        .filter((x) => +x.id !== +action.payload);

      state.orders = tmp;
    },
    setOrderStatuses: (state, action) => {
      state.orderStatuses = action.payload;
    },
    setMessage: (state, action) => {
      return { message: action.payload };
    },
    clearMessage: () => {
      return { message: "" };
    },

  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export default slice.reducer;

export const {
  setMovies,
  addMovie,
  setSeats,
  addSeat,
  setOrders,
  addOrder,
  setOrderStatuses,
  updateOrder,
  deleteOrder,
  setMessage,
  clearMessage,
} = slice.actions;
