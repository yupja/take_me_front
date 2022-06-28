import { configureStore } from "@reduxjs/toolkit";
import save from "./modules/saveList";
import favorite from "./modules/favorite";

const store = configureStore({
  reducer: { save, favorite },
});

export default store;
