import { createSlice, isAsyncThunkAction } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";

export const addGoalRQ = (data) =>{
    return function (dispatch){
        console.log(data);
        try{
            instance.post('/goalItem',data);
        }catch(error){
            console.log(error)
        }
    }
}



const favoriteSlice = createSlice({
    name : "goalItem",
    initialState:{
    },
reducers:{

}
});

//const { } = saveSlice.actions;
export default favoriteSlice.reducer;