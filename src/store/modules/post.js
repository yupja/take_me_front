import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";




export const likeChange = createAsyncThunk(  // 라이크 변경
  'read/myLike',
  async(boardId) => {
    try{
       const {data} = await instance.post(`/api/board/${boardId}`)
       console.log(data);
      }catch(error){
      console.log(error)
    }
  }
)



export const createPostAc = (data) => {
  return async function (dispatch) {
    const formData = new FormData();

    const request = {
      title : data.title,
      contents : data.contents
    }
    const json = JSON.stringify(request);
    const blob = new Blob([json], { type : "application/json"});

    formData.append('file',data.file)
    formData.append('request', blob)
    await instance.post('/api/post/board',formData,{
      headers : {
        "Content-Type": "multipart/form-data",
      }
    })
      .then((response) => {
        // console.log(response);
        // dispatch(uploadPost())
        alert("등록 완료");
      })
      .catch((error) => {
        // console.log(error);
      });
  };
};


export const loadpostsAc = () => {
  return function (dispatch) {
    instance.get('/api/board', { params: { lastBoardId : 999 , size: 15 } })
      .then(response => {
        //   console.log(response.data, "redux_data");
        dispatch(roadPosts(response.data));
        // console.log(response.data,"나도모르지")
      })
      .catch(error => {
        // console.log("get error", error)
      })
  };
};


export const loadDetailAc = (boardId) => {
  return function (dispatch) {
    instance.get(`/api/board/detail/${boardId}`)
      .then(response => {
        console.log(response, "redux_data");
        dispatch(loadDetail(response));
      })
      .catch(error => {
        console.log("get error", error)
      })

  };
};

export const loadMoreContentDB = () => {
  return async function (dispatch, getState) {
    const board = getState().post.postList.data;
    // console.log(board,"resS")
    const lastIndex = board[board.length - 1].boardId
    // console.log(lastIndex,"last")
    await instance.get('/api/board', { params: { lastBoardId: lastIndex, size: 15 } })
    .then((response) => {
      // console.log(response,"resssss")
      const new_data = [...board, ...response.data.data];
      // console.log(new_data,"newdat")
      dispatch(roadPosts({ data: new_data }));
    });
    // console.log(board, lastIndex, '무스');
  };
};




export const UpdatePost = (data) => {
  return async function (dispatch) {
    const formData = new FormData();

    const request = {
      title : data.title,
      contents : data.contents
    }
    const json = JSON.stringify(request);
    const blob = new Blob([json], { type : "application/json"});

    formData.append('file',data.file)
    formData.append('request', blob)

    await instance
      .put(`/api/board/${data.boardId}`, formData,{
        headers : {
          "Content-Type": "multipart/form-data",
        }
      })
      .then((re) => {
        // console.log(re,"수정아")
      })
      .catch((err) => {
        // console.log(err);
      });
    // console.log(data.boardId, "수정아!")
  };
};





export const deletePostAc = (boardId) => {
  return async function (dispatch) {
    await instance
      .delete(`/api/board/${boardId}`)
      .then((response) => {
        // dispatch(deletePostAc(boardId));
      })
      .catch((err) => {
        // console.log(err);
      });
    // console.log(boardId, "삭제외않되")
  };
};





const postSlice = createSlice({
  name: "post",
  initialState: {
    postList: { data: [] },
    post: [],
    likeList : [],
  },
  reducers: {
    uploadPost: (state, action) => {
      state.postList.push(action.payload);
    },
    roadPosts: (state, action) => {
      state.postList = action.payload;
    },
    deletePost: (state, action) => {
      const new_post = state.postList.filter((v, i) => i !== action.payload);
      state.postList = new_post;
    },
    setLike: (state, action) => {
      state.post.likeNum = action.payload.likeNum;
      state.post.userLike = action.payload.userLike;
    },
    loadDetail: (state, action) => {
      state.postList = action.payload
    },
    changeTradeState: (state, action) => {
      state.postList = state.postList.map((post) => {
        if (post.postId === action.payload.id) {
          post.tradeState = action.payload.tradeState;
        }
        return post;
      });
    },
    loadDetail: (state, action) => {
      state.postList = action.payload;
    }
  },
  extraReducers:{
    [likeChange.fulfilled]: (state, action) =>{
      state.likeList = action.payload
    },
  }
});

const { roadPosts, loadDetail } = postSlice.actions;
export default postSlice.reducer;
