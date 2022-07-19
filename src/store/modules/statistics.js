import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";



//--------------------- CREATE ---------------------------

  
  
//---------------------- READ ----------------------------


//내가 제일 많이 아낀 항목 Best5-금액별/일별
  export const myDayPriceListRQ = createAsyncThunk(
    'statistics/myDayprice',
    async (day) => {
      try {
        const { data } = await instance.get(`/api/statistics/mysave/day/${day}/price`)
        return data.data;
      } catch (error) {
        console.log(error);
      }
    }
  )


 
  //나의 아낌 통계 내가 제일 많이 아낀 항목 Best5-금액/월별
  export const myMonthPriceListRQ = createAsyncThunk(
    'statistics/myMonthprice',
    async (month) => {
      try {
        const { data } = await instance.get(`/api/statistics/mysave/month/${month}/price`)
        return data.data;
      } catch (error) {
        console.log(error);
      }
    }
  )



  //남이 제일 많이 아낀 항목 Best10-금액별/일별  -잘나옴 
  export const allUserDayCountListRQ = createAsyncThunk(
    'statistics/allUserDayCount',
    async (day) => {
      try {
        const { data } = await instance.get(`/api/statistics/allUser/day/${day}/price`)
        return data.data;
      } catch (error) {
        console.log(error);
      }
    }
  )
  


  // 남이 제일 많이 아낀 항목 Best10-금액별/월별  - 잘나옴
  export const allUserMonthPriceListRQ = createAsyncThunk(
    'statistics/allUserMonthCount',
    async (month) => {
      try {
        const { data } = await instance.get(`/api/statistics/allUser/month/${month}/price`)
        
        return data.data;
      } catch (error) {
        console.log(error);
      }
    }
  )


    // 남이 가장 목표로 많이 등록한 항목 Best10
    export const allUserGoalListRQ = createAsyncThunk(
      'statistics/allUserGoal',
      async () => {
        try {
          const { data } = await instance.get(`/api/statistics/goalItem/count`)
          
          return data.data;
        } catch (error) {
          console.log(error);
        }
      }
    )
    
  
  


  //-------------------- UPDATE ---------------------------
  

  
  //-------------------- DELETE ---------------------------

  
  //-------------------- SLICE ----------------------------
  
  const statisticsSlice = createSlice({
    name: "statisticsSlice",
    initialState: {
      allUserStatisticsList: [],
      myStatisticsList: [],
      allUserGoalList:[]
    },
    reducers: {
    },
    extraReducers: {
      [allUserMonthPriceListRQ.fulfilled]: (state, action) => {
        state.allUserStatisticsList = action.payload
      },
      [myMonthPriceListRQ.fulfilled]: (state, action) => {
        state.myStatisticsList = action.payload
      },
      [allUserGoalListRQ.fulfilled]: (state, action) => {
        state.allUserGoalList = action.payload
      }
    }
  
  
  });
  
  const {  } = statisticsSlice.actions;
  export default statisticsSlice.reducer;