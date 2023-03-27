import { createAsyncThunk } from "@reduxjs/toolkit";
import { dishSlice } from "..";
import { REQUEST_STATUSES } from "../../../../constants/statuses";
import { selectRestaurantMenuById } from "../../restaurant/selectors";
import { selectDishIds } from "../selectors";

export const loadDishesIfNotExist = (restaurantId) => (dispatch, getState) => {
  const state = getState();

  const restaurantDishIds = selectRestaurantMenuById(state, { restaurantId });
  const dishIds = selectDishIds(state);

  if (restaurantDishIds.every((id) => dishIds.includes(id))) {
    return;
  }

  dispatch(dishSlice.actions.startLoading());

  fetch(`http://localhost:3001/api/products?restaurantId=${restaurantId}`)
    .then((response) => response.json())
    .then((dishes) => dispatch(dishSlice.actions.finishLoading(dishes)))
    .catch(() => dispatch(dishSlice.actions.failLoading()));
};

export const loadAllDishesIfNotExist = createAsyncThunk(
  "dishes",
  async (_, { getState, rejectWithValue }) => {
    const dishes = selectDishIds(getState());

    if (dishes.length) {
      return rejectWithValue(REQUEST_STATUSES.earlyLoaded);
    }

    const response = await fetch("http://localhost:3001/api/products/");
    return await response.json();
  }
);

