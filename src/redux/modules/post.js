import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";




export const likeChange = createAsyncThunk(  // 라이크 변경
  'read/myLike',
  async(boardId) => {
    try{
       await instance.post(`/api/board/${boardId}`)
      
    }catch(error){
      console.log(error)
    }
  }
)



export const createPostAc = (data) => {
  return function (dispatch) {
    instance.post('/api/post/board',data)
      .then((response) => {
        console.log(response);
        dispatch(uploadPost(data))
        alert("등록 완료");
      })
      .catch((error) => {
        console.log(error);
        alert("error")
      });
  };
};




export const loadpostsAc = () => {
  return function (dispatch) {
    instance.get('/api/board')
      .then(response => {
        //   console.log(response.data, "redux_data");
        dispatch(roadPosts(response.data));
      })
      .catch(error => {
        console.log("get error", error)
      })
  };
};


export const loadDetailAc = (boardIdex, boardId) => {
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




export const UpdatePost = (boardId) => {
  return async function (dispatch) {
    await instance
      .put(`/api/board/${boardId}`, boardId)
      .then((re) => {
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(boardId, "수정아!")
  };
};





export const deletePostAc = (boardId) => {
  return async function (dispatch) {
    await instance
      .delete(`/api/board/${boardId}`)
      .then((response) => {
        dispatch(deletePostAc(boardId));
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(boardId, "삭제외않되")
  };
};





const postSlice = createSlice({
  name: "post",
  initialState: {
    postList: {data:[]},
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
      state.postList = action.payload;
    },
    changeTradeState: (state, action) => {
      state.postList = state.postList.map((post) => {
        if (post.postId === action.payload.id) {
          post.tradeState = action.payload.tradeState;
        }
        return post;
      });
    },
    loadDetail : (state, action)=>{
      state.postList = action.payload;
    }
  },
  // extraReducers:{
  //   [likeLoad.fulfilled]: (state, action) =>{
  //     state.likeList = action.payload
  //   }
  // }
});

const { uploadPost, roadPosts, changeTradeState, loadDetail } = postSlice.actions;
export default postSlice.reducer;
