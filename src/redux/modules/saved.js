import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";


  export const loadsavedAc = () => {
    return async function (dispatch) {
        try{
          const {data} = await instance.get('/savedItem')
          console.log(data,"데이타")
          dispatch(roadSaved(data))
        }catch(error){
          console.log(error)
        }
      }}




  const savedSlice = createSlice({
    name: "saved",
    initialState: {
      savedItem: [],
      save: {},
    },
    reducers: {
      roadSaved: (state, action) => {
        state.savedItem = action.payload;
      }
    }});

const { roadSaved } = savedSlice.actions;
export default savedSlice.reducer;