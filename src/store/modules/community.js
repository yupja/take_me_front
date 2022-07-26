import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { instance } from "../../shared/axios";



// [커뮤니티 채팅 API/보람]-----------------------------------------------------

// 오픈룸 조회 
export const loadChattingListRS = createAsyncThunk(
  'read/chatRoom',
  async (thunkAPI) => {
    try {
      const { data } = await instance.get('/api/chat/rooms/')
      return data.data;
    } catch (error) {
      console.log(error);
    }
  })

  //Top5 오픈룸 조회 

  export const topListRS = createAsyncThunk(
    'read/topList',
    async (thunkAPI) => {
      try {
        const { data } = await instance.get('/api/chat/room/top')
        console.log(data)
        return data.data;
      } catch (error) {
        console.log(error);
      }
    })



// 종료된 채팅 목록 조호 ㅣ
export const closedChttingListRS = createAsyncThunk(
  'read/closedChattingList',
  async (thunkAPI) => {
    try {
      const { data } = await instance.get('/api/closedChat/rooms')
      return data.data;
    } catch (error) {
      console.log(error);
    }
  })


//종료된 채팅 조회 상세로그
export const closedChttingLogRS = createAsyncThunk(
    'read/closedChattingLog',
    async (roomId, thunkAPI) => {
      try {
        const { data } = await instance.get(`/api/closedChat/room/${roomId}`)
        return data.data;
      } catch (error) {
        console.log(error);
      }
    })

// 찬반투표
  export const chattingVote = (voteData)=> {
      console.log(voteData)
      return async function(dispatch){
        try{
          await instance.post(`/api/chat/room/${voteData.roomId}/vote`, {
            prosCons : voteData.prosCons
          })
        }catch(error){
          console.log(error)          
        }
    }}

// [커뮤니티 채팅 API / 은진] -------------------------------------------------

// 방생성
export const createChatRoom = (sendData, navigate) => {
  return async function (dispatch) {
    await instance.post(`/api/chat/room`, {
      comment: sendData.comment,
      timeLimit: sendData.timeLimit
    })
    .then((res) => {
      const roodId = res.data.data.roomId
      navigate(`/chat/roomdetail/${roodId}`, {state:sendData});
    })
    .catch((error) => {
      console.log(error);
    });
  };
};

// 이전 메세지
export const getChatting = (data) => {
  return async function (dispatch) {
    await instance.get(`/api/chat/room/enter/${data}`)
      .then((res) => {
        console.log(res);
        // window.location.href = `/chat/roomdetail/${data}`;
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 정보 불러오기
export const myInfoData = (data) => {
  return async function (dispatch) {
    await instance.get(`/api/myChatInfo`)
      .then((res) => {
        dispatch(myInfo(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};









// [커뮤니티 POST API] -------------------------------------------------------

export const likeChange = createAsyncThunk(  // 라이크 변경
  'read/myLike',
  async (boardId) => {
    try {
      const { data } = await instance.post(`/api/board/${boardId}`)
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }
)



export const createPostAc = (data) => {
  return async function (dispatch) {
    const formData = new FormData();

    const request = {
      title: data.title,
      contents: data.contents
    }
    const json = JSON.stringify(request);
    const blob = new Blob([json], { type: "application/json" });

    formData.append('file', data.file)
    formData.append('request', blob)
    await instance.post('/api/post/board', formData, {
      headers: {
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
    instance.get('/api/board', { params: { lastBoardId: 999, size: 15 } })
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
      title: data.title,
      contents: data.contents
    }
    const json = JSON.stringify(request);
    const blob = new Blob([json], { type: "application/json" });

    formData.append('file', data.file)
    formData.append('request', blob)

    await instance
      .put(`/api/board/${data.boardId}`, formData, {
        headers: {
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





// [커뮤니티 Comment API]-----------------------------------------------------

export const createCommentAc = (data, boardId) => {
  return async function (dispatch) {
    await instance.post(`/api/board/${boardId}/comment`, data)
      .then(response => {
        window.location.reload();
        console.log("댓글등록")
      })
      .catch(error => {
        console.log("get error", error)
      })
  };

};


export const loadCommentAc = (boardId) => {
  return function (dispatch) {
    instance.get(`/api/board/${boardId}/comment`)
      .then(response => {
        console.log(response.data, "console load")
        dispatch(loadComment(response.data));
      })
      .catch(error => {
        console.log("get error", error)
      });
  };
}


export const updateCommentAc = (data) => {
  return function (dispatch) {
    console.log(data)
    instance.put(`/api/board/${data.boardId}/comment/${data.commentId}`, { "comment": data.comment })
      .then((response) => {
      }).catch((error) => {
        console.log(error)
      })

  }
};


export const deleteComment = (boardId, commentId) => {
  return async function (dispatch) {
    await instance
      .delete(`/api/board/${boardId}/comment/${commentId}`)
      .then((response) => {
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(commentId, "댓삭")
  };
};



const communitySlice = createSlice({
  name: "community",
  initialState: {
    // 채팅
    chattingList: [],
    topChttingList:[],
    closedChttingList: [],
    closedChttingLog : [], 
    getDayCountList: [],
    messages: [],
    myInfo: [],
    // 게시판
    postList: { data: [] },
    post: [],
    likeList: [],
    commentList: [],
  },
  reducers: {
    // 포스트 리듀서 
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
    myInfo: (state, action) => {
      state.myInfo = action.payload
    },


    // 코멘트 리듀서 
    loadComment: (state, action) => {
      state.commentList = action.payload;
    },
    createComment: (state, action) => {
      state.commentList.push(action.payload);
    },
    getDayCountList: (state, action) => {
      console.log(action.payload);
      state.getDayCountList = action.payload;
    },
    subMessage(state, action) {
      state.messages.push(action.payload);
      // state.messages = action.payload;
    },
  },
  
  extraReducers: {
    [loadChattingListRS.fulfilled]: (state, action) => {
      state.chattingList = action.payload
    },
    [likeChange.fulfilled]: (state, action) => {
      state.likeList = action.payload
    },
    // 종료된 채팅 리스트 
    [closedChttingListRS.fulfilled]: (state, action) => {
      state.closedChttingList = action.payload
    },
    // 종료된 채팅 개별로그 closedChttingLogRS
    [closedChttingLogRS.fulfilled]: (state, action) => {
      state.closedChttingLog = action.payload
    },
    [topListRS.fulfilled]: (state, action) => {
      state.topChttingList = action.payload
    },


  }

});

export const { loadComment, createComment, roadPosts, loadDetail, subMessage, getDayCountList, myInfo } = communitySlice.actions;
export default communitySlice.reducer;