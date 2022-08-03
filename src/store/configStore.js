import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import goal from "./modules/goal";
import login from "./modules/login"
import saved from "./modules/saved";
import item from "./modules/item"
import myInfo from "./modules/myInfo";
import statistics from "./modules/statistics";
import community from "./modules/community"


const store = configureStore({
  reducer: { goal, community, login, saved, myInfo, item, statistics },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  })
});

export default store;
