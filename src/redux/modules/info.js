import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../shared/axios";


// 유저 정보 요청
export const getInfo = () => {
  return async function (dispatch) {
    await instance.get("/api/mypage/profile", {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      .then((res) => {
        dispatch(infoList(res.data.data));
        console.log(res.data.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 마이페이지 정보 업데이트
export const infoUpdate = (data) => {
  return async function (dispatch) {
    await instance.put("/api/mypage/profile", data, {
      "Content-Type": "multipart/form-data",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res)
        // dispatch(infoList(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};


// // 항목 조회
// export const getFavoriteDB = () => {
//   return async function (dispatch) {
//     await instance.get("/api/mypage/profile", {
//       "Content-Type": "application/json",
//       withCredentials: true,
//     })
//       .then((res) => {
//         console.log(res)
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// };





// 리듀서 
const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    infoList: [],

  },
  reducers: {
    isLogin: (state, action) => {
      console.log(action.payload);
      state.isLogin = action.payload;
    },
    infoList: (state, action) => {
      state.infoList = action.payload;
    },

  }
});

// export const userActions = userSlice.actions;
export const { isLogin, infoList } = userSlice.actions;
export default userSlice.reducer;