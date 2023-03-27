import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATUSES } from "../../../constants/statuses";
import { loadAllDishesIfNotExist } from "./thunks/loadDishesIfNotExist";

export const dishEntityAdapter = createEntityAdapter();

export const dishSlice = createSlice({
  name: "dish",
  initialState: dishEntityAdapter.getInitialState({
    status: REQUEST_STATUSES.idle,
  }),
  reducers: {
    startLoading: (state) => {
      state.status = REQUEST_STATUSES.pending;
    },
    failLoading: (state) => {
      state.status = REQUEST_STATUSES.failed;
    },
    finishLoading: (state, { payload }) => {
      dishEntityAdapter.setMany(state, payload);
      state.status = REQUEST_STATUSES.success;
    },
  },
});

export const dishActions = dishSlice.actions;

export const allDishesSlice = createSlice({
  name: "dishes",
  initialState: dishEntityAdapter.getInitialState({
    status: REQUEST_STATUSES.idle,
  }),
  extraReducers: (build) =>
    build
      .addCase(loadAllDishesIfNotExist.pending, (state) => {
        state.status = REQUEST_STATUSES.pending;
      })
      .addCase(loadAllDishesIfNotExist.rejected, (state, { payload }) => {
        state.status =
          payload === REQUEST_STATUSES.earlyLoaded
            ? REQUEST_STATUSES.success
            : REQUEST_STATUSES.failed;
      })
      .addCase(loadAllDishesIfNotExist.fulfilled, (state, { payload }) => {
        dishEntityAdapter.setAll(state, payload);
        state.status = REQUEST_STATUSES.success;
      }),
});
