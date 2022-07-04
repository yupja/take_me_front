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
        .put(`/board/${boardId}}`,boardId)
        .then((re) => {
        })
        .catch((err) => {
          console.log(err);
        });
        console.log(boardId,"수정아!")
    };
  };


export const deletePost = (boardId) => {
    return async function (dispatch) {
      await instance
        .delete(`/board/${boardId}`)
        .then((response) => {
        })
        .catch((err) => {
          console.log(err);
        });
    console.log(boardId,"나와제발")
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
    setLike: (state, action) => {
      state.post.likeNum = action.payload.likeNum;
      state.post.userLike = action.payload.userLike;
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

const { uploadPost, roadPosts, changeTradeState, setLike } = postSlice.actions;
export default postSlice.reducer;
