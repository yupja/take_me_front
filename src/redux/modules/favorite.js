import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";



//--------------------- CREATE ---------------------------
// export const addFavoriteRQ = (data) => { // 내 즐겨찾기 추가 
//   return function (dispatch) {

//     // try {
//     //   instance.post('/api/mypage/favorite', data);
//     // } catch (error) {
//     //   console.log(error)
//     // }
//   }
// }

export const addFavoriteRQ = createAsyncThunk( // 골아이템 등록 
  'add/addFavorite',
  async (sendData) => {
    try {
      await instance.post("/api/mypage/favorite", sendData)
    } catch (error) {
      console.log(error);
    }
  }
)


//---------------------- READ ----------------------------
export const myFavoriteListRQ = () => {  // 나의 즐겨찾기 리스트 
  return async function (dispatch) {
    try {
      const { data } = await instance.get('/api/mypage/favorite')
      dispatch(readMyFavorite(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//-------------------- UPDATE ---------------------------
export const favoriteUpdate = (price, itemId) => {
  return async function (dispatch) {
    await instance.put(`/api/mypage/favorite/${itemId}`, price, {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      });
  };
};
//-------------------- DELETE ---------------------------
export const favoriteDel = (itemId) => {
  return async function (dispatch) {
    await instance.delete(`/api/mypage/favorite/${itemId}`)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      });
  };
};


//-------------------- SLICE ----------------------------
const goalSlice = createSlice({
  name: "favoriteItem",
  initialState: {
    myFavoriteList: [],

  },
  reducers: {
    readMyFavorite: (state, action) => {
      state.myFavoriteList = action.payload;
    },

  }
});

const { readMyFavorite } = goalSlice.actions;
export default goalSlice.reducer;