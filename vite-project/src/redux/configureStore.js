import { configureStore } from "@reduxjs/toolkit";
import addNameSlice from "./addNameSlice";
import createCardSlice from "./createCardSlice";
const store = configureStore({
  reducer: {
    userName: addNameSlice,
    card: createCardSlice,


}
});

export default store;