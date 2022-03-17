import { combineReducers } from "@reduxjs/toolkit";
import { reducer as gridReducer } from "../slices/gridSlice";

const rootReducer = combineReducers({
  grid: gridReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
