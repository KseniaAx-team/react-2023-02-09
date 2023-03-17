import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { cartReducer } from "./cart/reducer";
import { disheSlice } from "./entities/dish";
import { restaurantSlice } from "./entities/restaurant";
import { reviewReducer } from "./entities/review/reducer";
import { userReducer } from "./entities/user/reducer";
import { logger } from "./middleware/logger";

// const rootReducer = (state = {}, action = {}) => {
//   return {
//     cart: cartReducer(state.cart, action),
//     restaurant: restaurantReducer(state.restaurant, action),
//   };
// };

const rootReducer = combineReducers({
  cart: cartReducer,
  restaurant: restaurantSlice.reducer,
  dish: disheSlice.reducer,
  review: reviewReducer,
  user: userReducer,
});

// export const store = createStore(
//   rootReducer,
//   applyMiddleware(customThunk, logger, loadRestaurantIfNotExist)
// );

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([logger]),
});

console.log("state", store.getState());
