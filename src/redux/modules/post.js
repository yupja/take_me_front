import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";
import axios from "axios";



// 메인화면 포스트 리드
// export const loadMainposts = () => {
//   return async function (dispatch) {
//      try{
//         const {data} = await instance.get('/board')
//         dispatch(roadPosts(data));
//         console.log(data,"redux")
//      }catch(err){
//         console.log(err);
//       };
//   };
// };



export const createPostAc = (post) => {
  return function (dispatch) {
    instance.post('/board', post)
      .then((response) => {
        console.log(response);
        dispatch(uploadPost())
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
    instance.get('/board')
      .then(response => {
        //   console.log(response.data, "redux_data");
        dispatch(roadPosts(response.data));
      })
      .catch(error => {
        console.log("get error", error)
      })
  };
};


export const UpdatePost = (boardId) => {
  return async function (dispatch) {
    await instance
      .put(`/board/${boardId}}`, boardId)
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
      .delete(`/board/${boardId}`)
      .then((response) => {
        dispatch(deletePostAc(boardId));
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(boardId, "삭제외않되")
  };
};

export const loadDetailAc = (boardIdex) => {
  return function (dispatch) {
      instance.get(`/board/${boardIdex}`)
      .then(response => {
        console.log(response.data, "redux_data");
        dispatch(loadDetail(response.data));
      })
      .catch(error => {
        console.log("get error", error)
      })
      
  };
};




const postSlice = createSlice({
  name: "post",
  initialState: {
    postList: [],
    post: {},
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
  },
});

const { uploadPost, roadPosts, changeTradeState, loadDetail } = postSlice.actions;
export default postSlice.reducer;
