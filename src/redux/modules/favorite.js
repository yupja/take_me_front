import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";



//--------------------- CREATE ---------------------------

export const addFavoriteRQ = createAsyncThunk( // 내 즐겨찾기 등록 
  'add/addFavorite',
  async(sendData) =>{
    try{
      await instance.post("/api/mypage/favorite",sendData) 
    }catch(error){
      console.log(error);
    }
  }
)


//---------------------- READ ----------------------------

export const myFavoriteListRQ = createAsyncThunk(
  'get/readMyFavorite',
   async function(dispatch){
    try{
      const { data } = await instance.get('/api/mypage/favorite')
      return data;
    }catch(error){
      console.log(error)
    }
  }
)
//-------------------- UPDATE ---------------------------

//-------------------- DELETE ---------------------------




//-------------------- SLICE ----------------------------
const goalSlice = createSlice({
  name: "favoriteItem",
  initialState: {
    myFavoriteList: [],

  },
  reducers: {
  },
  extraReducers:{
    [myFavoriteListRQ.fulfilled]: (state, action) =>{
      state.myFavoriteList = action.payload
    },
  }
});

const {  } = goalSlice.actions;
export default goalSlice.reducer;