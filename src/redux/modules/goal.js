import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";



//--------------------- CREATE ---------------------------
export const addGoalRQ = (data) => { // 기존에 없던 신규 목표태산 추가
  return function (dispatch) {
    try {
      instance.post('/api/goalItem', data);
    } catch (error) {
      console.log(error)
    }
  }
}


//---------------------- READ ----------------------------
export const myReadGoalRQ = createAsyncThunk(
  'read/myGoal',
  async(dispatch)=> {
    try {
      const {data} = await instance.get('/api/goalItem')
      return data;
    } catch (error) {
      console.log(error);
    }
  }
)


export const allReadGoalRQ = () => { // 모든 사람의 태산 항목
  return async function (dispatch) {
    try {
      const { data } = await instance.get('/goalItem')
      dispatch(readeAllGoal(data))
    } catch (error) {

    }
  }

}

//-------------------- UPDATE ---------------------------


//-------------------- DELETE ---------------------------



//-------------------- SLICE ----------------------------
const goalSlice = createSlice({
  name: "goalItem",
  initialState: {
    allGoalList: [],
    myGoalList: [],
  },
  reducers: {
    readeAllGoal: (state, action) => {
      state.allGoalList = action.payload;
    }
  },
  extraReducers:{
    [myReadGoalRQ.fulfilled]: (state, action) =>{
      state.myGoalList = action.payload
    }
  }
});

const { readeAllGoal, readMyGoal } = goalSlice.actions;
export default goalSlice.reducer;