import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";
import { addGoalAPI, updateGoalAPI } from "../modules/goal"
import { addSavedListRQ } from "../modules/saved"

//--------------------- CREATE ---------------------------

export const addItem = createAsyncThunk(
  'item/add',
  async (itemData, thunkAPI) =>{
    try{
      console.log()
      const itemAdd={
        categoryId: itemData.categoryId,
        itemName: itemData.itemName,
        defaultPrice: itemData.price
      }
      const {data} = await instance.post('api/item',itemAdd);


      const formData = new FormData()

      formData.append('image',itemData.image)

      const goalItem = {
        categoryId : itemData.categoryId,
        price :itemData.price,
        itemId : data?.data.itemId,
        goalItemCount: itemData.goalItemCount
      }
      const json = JSON.stringify(goalItem);
      const blob = new Blob([json], { type: "application/json" });
      formData.append('goalItem',blob);

      if(itemData.state==="ADD"){
        thunkAPI.dispatch(addGoalAPI(formData))
      }else{
        //thunkAPI.dispatch(updateGoalAPI({formData, itemData.goalId}))
      }
   

    }catch(error){
      console.log(error)

    }
  }
)



// export const addSavedItem = createAsyncThunk(
//   'item/addSaved',
//   async (sendData, thunkAPI) =>{
//     try{
//       const {data} = await instance.post('api/item',sendData);
//       const savedInput ={
//         // itemId :
//         // price : 
//         // goalItemId : 

//       }

//       thunkAPI.dispatch(addSavedListRQ())

//     }catch(error){
//       console.log(error)

//     }
//   }
// )

//---------------------- READ ----------------------------

export const allItemListRQ = createAsyncThunk(
  'item/read',
  async(dispatch) =>{
    try{
      const { data } = await instance.get('/api/item')
      
      return data;
    }catch(error){

    }
  }
)

//-------------------- UPDATE ---------------------------


//-------------------- DELETE ---------------------------



//-------------------- SLICE ----------------------------
const itemSlice = createSlice({
  name: "item",
  initialState: {
    allItemList: [],
  },
  reducers: {
 },
  extraReducers:{
    [allItemListRQ.fulfilled]: (state, action) =>{
      state.allItemList = action.payload
    },
  }
  
});

const { readeAllItem } = itemSlice.actions;
export default itemSlice.reducer;