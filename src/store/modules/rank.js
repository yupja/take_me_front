import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../shared/axios";


// 유저 정보 요청
export const getDayCount = (today) => {
  return async function (dispatch) {
    // await instance.get(`/api/statistics/allUser/day/${today}/count`)
    await instance.get(`/api/statistics/allUser/day/20220719/count`)
      // await instance.get(`/api/statistics/allUser/month/202207/count`)
      .then((res) => {
        console.log(res);
        dispatch(getDayCountList(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};






// 리듀서 
const userSlice = createSlice({
  name: "user",
  initialState: {
    getDayCountList: [],


  },
  reducers: {
    getDayCountList: (state, action) => {
      console.log(action.payload);
      state.getDayCountList = action.payload;
    },


  }
});

// export const userActions = userSlice.actions;
export const { getDayCountList } = userSlice.actions;
export default userSlice.reducer;