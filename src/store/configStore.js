import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import goal from "./modules/goal";
import favorite from "./modules/favorite";
import user from "./modules/user"
import saved from "./modules/saved";
import item from "./modules/item"
import info from "./modules/info";
import statistics from "./modules/statistics";
import community from "./modules/community"


const store = configureStore({
  reducer: { goal, favorite,  community, user, saved, info, item, statistics},
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  })
});

export default store;
