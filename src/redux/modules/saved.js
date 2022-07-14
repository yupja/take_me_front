import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";
import { myReadGoalRQ } from "../modules/goal";


//--------------------- CREATE ---------------------------

//기존에 있던거 
export const addSavedListRQ = createAsyncThunk(
  'saved/add',
  async (sendData, thunkAPI) => {
    try {
      await instance.post('/api/savedItem', sendData)
      thunkAPI.dispatch(mySavedListRQ(sendData.goalItemId))

    } catch (error) {

    }
  }
)

//아이템 생성 후 등록해야하는 거 
export const newItemSavedListRQ = createAsyncThunk(
  'saved/add',
  async (sendData, thunkAPI) => {
    try {
      await instance.post('/api/newSavedItem', sendData)
      thunkAPI.dispatch(mySavedListRQ(sendData.goalItemId))

    } catch (error) {

    }
  }
)



//---------------------- READ ----------------------------


export const mySavedListRQ = createAsyncThunk(
  'saved/readMyList',
  async (inputData, thunkAPI) => {
    try {
      const { data } = await instance.get(`/api/savedItem/${inputData}`)
      thunkAPI.dispatch(myReadGoalRQ())
      return data;
    } catch (error) {
      console.log(error);
    }
  }
)


// 아끼기/조회 (은진)
export const getSavedList = (itemId) => {
  return async function (dispatch) {
    await instance.get(`/api/savedItem/${itemId}`, {
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



export const loadsavedAc = (boardId) => {
  return async function (dispatch) {
    try {
      const { data } = await instance.get(`/api/board/save/${boardId}`)
      console.log(data, "데이타")
      dispatch(loadSaved(data))
    } catch (error) {
      console.log(error, "errr")
    }
  }
}

//-------------------- UPDATE ---------------------------

export const modifySaved = (data, itemId) => {
  return async function (dispatch) {
    try {
      await instance.put(`/api/savedItem/${itemId}`, data)

    } catch (error) {
      console.log(error)
    }
  }
}

//-------------------- DELETE ---------------------------

export const deleteSavedList = (itemId, goalItemId) => {
  return async function (dispatch) {
    console.log(itemId)
    try {
      await instance.delete(`/api/savedItem/${itemId}`)
      dispatch(mySavedListRQ(goalItemId))
    } catch (error) {
      console.log(error);
    }
    dispatch(myReadGoalRQ())
  }
}


//-------------------- SLICE ----------------------------

const savedSlice = createSlice({
  name: "saved",
  initialState: {
    savedItem: { data: [] },
    currentMySavedList: {
      data: []
    },
    save: [],
  },
  reducers: {
    loadSaved: (state, action) => {
      state.savedItem = action.payload;
    }
  },
  extraReducers: {
    [mySavedListRQ.fulfilled]: (state, action) => {
      state.currentMySavedList = action.payload
    },
  }


});

const { loadSaved } = savedSlice.actions;
export default savedSlice.reducer;