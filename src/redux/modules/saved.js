import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";



//--------------------- CREATE ---------------------------
export const addSavedListRQ = createAsyncThunk(
  'saved/add',
  async (sendData) => {
    try {
      await instance.post('/api/savedItem', sendData)
    } catch (error) {

    }
  }
)


//---------------------- READ ----------------------------


export const mySavedListRQ = createAsyncThunk(
  'saved/readMyList',
  async (inputData) => {
    const goaldata = {
      goalItemId: Number(inputData)
    }
    try {
      const { data } = await instance.get('/api/savedItem', { goaldata })

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

//-------------------- DELETE ---------------------------




//-------------------- SLICE ----------------------------

const savedSlice = createSlice({
  name: "saved",
  initialState: {
    savedItem: { data: [] },
    currentMySavedList: [],
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