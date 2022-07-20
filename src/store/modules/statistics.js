import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";


//--------------------- 은진 ---------------------------
//남이 제일 많이 아낀 항목 Best10-횟수별/일별 
export const getDayCount = (today) => {
  return async function (dispatch) {
    // await instance.get(`/api/statistics/allUser/day/${today}/count`)
    await instance.get(`/api/statistics/allUser/day/${today}/count`)
      // await instance.get(`/api/statistics/allUser/month/202207/count`)
      .then((res) => {
        console.log("남/횟수별/일별");
        dispatch(getDayCountList(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
//---------------------- READ ----------------------------
//[일별/금액별]내가 제일 많이 아낀 항목 Best5-금액별/일별
export const myDayPriceListRQ = createAsyncThunk(
  'statistics/myDayPrice',
  async (day) => {
    try {
      const { data } = await instance.get(`/api/statistics/mysave/day/${day}/price`)
      console.log("나/금액별/일별")
      console.log(data)
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
)
//[일별/금액별]남이 제일 많이 아낀 항목 Best10- -잘나옴 
export const allUserDayPriceListRQ = createAsyncThunk(
  'statistics/allUserDayCount',
  async (day) => {
    try {
      const { data } = await instance.get(`/api/statistics/allUser/day/${day}/price`)
      console.log(data)
      console.log("남/금액별/일별")
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
)


// [월별/금액별]나의 아낌 통계 내가 제일 많이 아낀 항목 Best5-
export const myMonthPriceListRQ = createAsyncThunk(
  'statistics/myMonthPrice',
  async (month) => {
    try {
      const { data } = await instance.get(`/api/statistics/mysave/month/${month}/price`)
      console.log("나/금액별/월별")
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
)
// [월별/금액별] 남이 제일 많이 아낀 항목 Best10 - 잘나옴
export const allUserMonthPriceListRQ = createAsyncThunk(
  'statistics/allUserMonthCount',
  async (month) => {
    try {
      const { data } = await instance.get(`/api/statistics/allUser/month/${month}/price`)
      console.log("남/금액별/월별")
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
)

//[일별/회수별]내가 제일 많이 아낀 항목 Best5-
export const myDayCountListRQ = createAsyncThunk(
  'statistics/myDayCount',
  async (day) => {
    try {
      const { data } = await instance.get(`/api/statistics/mysave/day/${day}/count`)
      console.log("나/회수별/일별")
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
)
//[일별/횟수별] 남이 제일 많이 아낀 항목 Best10-  상단/은진 구현 


//[월별/회수별] 내가 제일 많이 아낀 항목 Best5-
export const myMonthCountListRQ = createAsyncThunk(
  'statistics/myMonthCount',
  async (month) => {
    try {
      const { data } = await instance.get(`/api/statistics/mysave/month/${month}/count`)
      console.log("나/월별/회수별")
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
)
//[월별/회수별] 내가 제일 많이 아낀 항목 Best5-
export const allMonthCountListRQ = createAsyncThunk(
  'statistics/allUserMonthCount',
  async (month) => {
    try {
      const { data } = await instance.get(`/api/statistics/allUser/month/${month}/count`)
      console.log("남/월별/회수별")
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
      console.log(data)
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
)

  
  
  //-------------------- SLICE ----------------------------
  const statisticsSlice = createSlice({
    name: "statisticsSlice",
    initialState: {
      allUserMonthPrice: [],
      myList:[],
      allUserList:[],
      allUserGoalList:[],
      getDayCountList: [],
    },
    reducers: {
      //[일별/회수별/allUser]
      getDayCountList: (state, action) => {
        state.getDayCountList = action.payload;
      },
    },
    extraReducers: {
      //[일별/금액별]
      [myDayPriceListRQ.fulfilled]: (state, action) => {
        state.myList = action.payload
      },      
      [allUserDayPriceListRQ.fulfilled]: (state, action) => {
        state.allUserList = action.payload
      },
      //[월별/금액별]
      [myMonthPriceListRQ.fulfilled]: (state, action) => {
        state.myList = action.payload
      },
      [allUserMonthPriceListRQ.fulfilled]: (state, action) => {
        state.allUserList = action.payload
      },
      //[일별/회수별]
      [myDayCountListRQ.fulfilled]: (state, action) => {
        state.myList = action.payload
      },
      //[월별/회수별]
      [myMonthCountListRQ.fulfilled]: (state, action) => {
        state.myList = action.payload
      },
      [allMonthCountListRQ.fulfilled]: (state, action) => {
        state.allUserList = action.payload
      },
      // 남이 가장 목표로 많이 등록한 항목 Best10
      [allUserGoalListRQ.fulfilled]: (state, action) => {
        state.allUserGoalList = action.payload
      }
    }
  
  
  });
  
  const { getDayCountList } = statisticsSlice.actions;
  export default statisticsSlice.reducer;