import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";


//--------------------- CREATE ---------------------------
export const addSavedListRQ = createAsyncThunk(
  'saved/add',
  async (sendData) =>{
    try{
      console.log(sendData);
       //await instance.post('/api/savedItem',)
    }catch(error){

    }
  } 
)


//---------------------- READ ----------------------------

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



//-------------------- UPDATE ---------------------------

//-------------------- DELETE ---------------------------




//-------------------- SLICE ----------------------------

  const savedSlice = createSlice({
    name: "saved",
    initialState: {
      savedItem: [],
      saveList:[],
      save: {},
    },
    reducers: {
      roadSaved: (state, action) => {
        state.savedItem = action.payload;
      }
    }});

const { roadSaved } = savedSlice.actions;
export default savedSlice.reducer;