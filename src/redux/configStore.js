import { configureStore } from "@reduxjs/toolkit";
import save from "./modules/saveList";
import goal from "./modules/goal";
import favorite from "./modules/favorite";

const store = configureStore({
  reducer: { save, goal, favorite},
});

export default store;
