import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../shared/axios";


// 마이페이지
// 유저 정보 요청
export const getInfo = () => {
  return async function (dispatch) {
    await instance.get("/api/mypage/profile", {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      .then((res) => {
        dispatch(infoList(res.data.data));
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
        console.log(data);
        console.log(res)
        // dispatch(infoList(res.data.respMsg));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};


// 항목 조회
export const getHistory = () => {
  return async function (dispatch) {
    await instance.get("/api/mypage/history", {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res)
        dispatch(gethistorys(res.data.data))
      })
      .catch((error) => {
        console.log(error);
      });
  };
};



// 즐겨찾기

// READ
export const myFavoriteListRQ = createAsyncThunk(
  'get/readMyFavorite',
  async function (dispatch) {
    try {
      const { data } = await instance.get('/api/mypage/favorite')
      console.log(data)
      return data.data;
    } catch (error) {
      console.log(error)
    }
  }
)


// CREATE
export const addFavoriteRQ = createAsyncThunk(
  'add/addFavorite',
  async (sendData, thunkAPI) => {
    try {
      const { data } = await instance.post("/api/mypage/favorite", sendData)
      thunkAPI.dispatch(myFavoriteListRQ());
      return data
    } catch (error) {
      console.log(error);
    }
  }
)


// UPDATE
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


// DELETE
export const favoriteDel = (itemId) => {
  return async function (dispatch) {
    await instance.delete(`/api/mypage/favorite/${itemId}`)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      });
    dispatch(myFavoriteListRQ());
  };
};




// 리듀서 
const infoSlice = createSlice({
  name: "myinfo",
  initialState: {
    isLogin: false,
    infoList: [],
    historyList: [],
    myFavoriteList: [],
    currentFavoriteId: [],

  },
  reducers: {
    isLogin: (state, action) => {
      console.log(action.payload);
      state.isLogin = action.payload;
    },
    infoList: (state, action) => {
      state.infoList = action.payload;
    },
    gethistorys: (state, action) => {
      state.historyList = action.payload;
    },
  },
  extraReducers: {
    [myFavoriteListRQ.fulfilled]: (state, action) => {
      state.myFavoriteList = action.payload
    },
    [addFavoriteRQ.fulfilled]: (state, action) => {
      state.currentFavoriteId = action.payload
    },

  }
});

// export const userActions = userSlice.actions;
export const { isLogin, infoList, gethistorys } = infoSlice.actions;
export default infoSlice.reducer;