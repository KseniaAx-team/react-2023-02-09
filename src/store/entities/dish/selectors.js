import { createSelector } from "reselect";
import { dishEntityAdapter } from ".";
import { REQUEST_STATUSES } from "../../../constants/statuses";

export const selectDishModule = (state) => state.dish;
const dishSelectors = dishEntityAdapter.getSelectors(selectDishModule);

export const selectDishById = (state, { dishId }) =>
  dishSelectors.selectById(state, dishId);
export const selectDishIds = dishSelectors.selectIds;

export const selectDishLoadingStatus = (state) =>
  selectDishModule(state).status;

export const selectIsDishLoading = (state) =>
  selectDishLoadingStatus(state) === REQUEST_STATUSES.pending;

export const selectIsDishLoaded = (state) =>
  selectDishLoadingStatus(state) === REQUEST_STATUSES.success;

// Dishes //
export const selectDishesModule = (state) => state.dishes;
const dishesSelectors = dishEntityAdapter.getSelectors(selectDishesModule);

export const selectDishes = dishesSelectors.selectAll;
export const selectDishesById = (state, { dishId }) =>
  dishesSelectors.selectById(state, dishId);

export const selectDishesLoadingStatus = (state) =>
  selectDishesModule(state).status;

export const selectIsDishesLoading = (state) =>
  selectDishesModule(state) === REQUEST_STATUSES.pending;

export const selectIsDishesLoaded = (state) =>
  selectDishesModule(state) === REQUEST_STATUSES.success;

export const selectDishesEntities = (state) =>
  selectDishesModule(state).entities;

export const selectDishesFilteredByName = createSelector(
  [selectDishesEntities, (_, { searchValue }) => searchValue],
  (entities, searchValue) => {
    return Object.values(entities).filter(
      ({ name }) => name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    );
  }
);