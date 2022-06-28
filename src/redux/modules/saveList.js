import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";

const saveSlice = createSlice({
    name : "save",
    initialState:{
    saveList : []
},
reducers:{

}
});

const { } = saveSlice.actions;
export default saveSlice.reducer;