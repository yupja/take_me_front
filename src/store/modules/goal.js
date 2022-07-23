import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";
import {mySavedListRQ} from "../modules/saved";


//--------------------- CREATE ---------------------------

export const addGoalRQ =(formData) =>{// 있던거 골아이템 등록 
  return async function (dispatch){
    try{
      await instance.post('/api/goalItem', formData,
      {
        headers :  {
          "Content-Type": "multipart/form-data",
      }});
    }catch(error){
      
    }
    dispatch(myReadGoalRQ());
  }

} 


export const newItemGoalAddRQ = (formData) =>{// 없던거 골아이템 등록 
  return async function (dispatch){
    try{
      await instance.post('/api/items/goalItem', formData,
      {
        headers :  {
          "Content-Type": "multipart/form-data",
      }});
    }catch(error){
      
    }
    dispatch(myReadGoalRQ());
  }
} 

//---------------------- READ ----------------------------
export const myReadGoalRQ = createAsyncThunk(
  'read/myGoal',
  async(thunkAPI)=> {
    try {
      const {data} = await instance.get('/api/goalItem')
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
)

//-------------------- UPDATE ---------------------------

export const newUpdateGoalAPI = (formData, goalItemId) => { 
  return async function (dispatch) {
    try {
      console.log(goalItemId)
      await instance.put(`/api/items/goalItem/${goalItemId}`, formData,{
        headers :  {
          "Content-Type": "multipart/form-data",
        }
      })
      dispatch(myReadGoalRQ());
    } catch (error) {

    }
  }

}


export const updateGoalAPI = (formData, goalItemId) => { 
  return async function (dispatch) {
    try {
      console.log(goalItemId)
      await instance.put(`/api/goalItem/${goalItemId}`, formData,{
        headers :  {
          "Content-Type": "multipart/form-data",
        }
      })
      dispatch(myReadGoalRQ());
    } catch (error) {

    }
  }

}



//-------------------- DELETE ---------------------------

export const deleteGoalRQ = (goalItemId) =>{
  return async function(dispatch){
    try{
      await instance.delete(`/api/goalItem/${goalItemId}`)
      dispatch(myReadGoalRQ())
    }catch(error){
      console.log(error)
    }
  }
}



//-------------------- SLICE ----------------------------
const goalSlice = createSlice({
  name: "goalItem",
  initialState: {
    allGoalList: [],
    myGoalList: [],
    addItem:[],
    myGoal:[]
  },
  reducers: {
    readeAllGoal: (state, action) => {
      state.allGoalList = action.payload;
    }
  },
  extraReducers:{
    [myReadGoalRQ.fulfilled]: (state, action) =>{
      state.myGoalList = action.payload
    },
    // [updateGoalAPI.fulfilled]: (state, action) =>{
    //   state.myGoalList = action.payload
    // },

  }
});

const { readeAllGoal } = goalSlice.actions;
export default goalSlice.reducer;