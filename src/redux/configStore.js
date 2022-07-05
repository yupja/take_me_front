import { configureStore } from "@reduxjs/toolkit";
import save from "./modules/saveList";
import goal from "./modules/goal";
import favorite from "./modules/favorite";
import post from "./modules/post";
import comment from "./modules/comment";

const store = configureStore({
  reducer: { save, goal, favorite, post, comment},
});

export default store;
