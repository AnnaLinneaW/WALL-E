import { configureStore } from "@reduxjs/toolkit";
import addNameSlice from "./createCardSlice";
import createCardSlice from "./createCardSlice";

const store = configureStore({
  reducer: {
    userName: addNameSlice,
    card: createCardSlice,
    deleteCard: createCardSlice,
    activeCard: createCardSlice,
}
});

export default store;