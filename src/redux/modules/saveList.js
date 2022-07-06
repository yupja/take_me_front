import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";

//--------------------- CREATE ---------------------------
export const addSaveListRQ = (data) => { // 내 이력 추가 
  return function (dispatch) {
    try {
      instance.post('/saveList', data);
      dispatch(addMySavedList(data));

    } catch (error) {
      console.log(error)
    }
  }
}


//---------------------- READ ----------------------------

export const readSaveListRQ = () => {
  return async function (dispatch) {
    try {
      const { data } = await instance.get(`saveList`);
      dispatch(readMySavedList(data))
    } catch (error) {
      console.log(error)
    }
  }

}

//-------------------- UPDATE ---------------------------



//-------------------- DELETE ---------------------------




//-------------------- SLICE ----------------------------
const saveSlice = createSlice({
  name: "save",
  initialState: {
    saveList: []
  },
  reducers: {
    readMySavedList: (state, action) => {
      state.saveList = action.payload;
    },

    addMySavedList: (state, action) => {
      state.saveList.push(action.payload);
    }

  }
});

const { readMySavedList, addMySavedList } = saveSlice.actions;
export default saveSlice.reducer;