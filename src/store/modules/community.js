import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { instance } from "../../shared/axios";



// [커뮤니티 채팅 API/보람]-----------------------------------------------------
export const allChattingListRS = createAsyncThunk(
  `read/chattingList`,
  async (thunkAPI) => {
    try {
      const { data } = await instance.get('/api/chat/rooms/all')
      return data;
    } catch (error) {
      console.log(error);
    }
  })

 
//룸디테일 
  export const roomInfoRS = createAsyncThunk(
    `read/roomInfo`,
    async (roomId, thunkAPI) => {
      try {
        const { data } = await instance.get(`/api/chat/room/${roomId}`)
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



  export const closedChttingInfinityLoad = createAsyncThunk(
    'read/closedChattingListInfinity',
    async (getState, thunkAPI) => {
      try {

          const chattingList = getState().community.allChattingList.closedChatRooms;
          const lastIndex = chattingList[chattingList.length-1].chatRoomId;
          const { data } = await instance.get(`/api/chat/allRoom/`,{
            params: 
            { chatRoomId: lastIndex, size: 5 } 
          })
  
          const newData = [...chattingList, ...data.data];
          return newData;
        
    } catch (error) {
       alert("마지막 게시물입니다")
       
      }
    })


    // export const loadMoreContentDB = () => {
    //   return async function (dispatch, getState) {
    //     const board = getState().community.postList.data;
    //     const lastIndex = board[board.length - 1].boardId
    //     await instance.get('/api/board', { params: { lastBoardId: lastIndex, size: 15 } })
    //       .then((response) => {
    //         const new_data = [...board, ...response.data.data];
    //         dispatch(roadPosts({ data: new_data }));
    //       });
    //   };
    // };
    
    
    


  
export const deleteChattingRoom = (roomId, navigate) => {
  return async function (dispatch) {
    try {
      await instance.get(`/api/chat/room/${roomId}/save`)
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteLobyChat = (roomId, navigate) => {
  return async function (dispatch) {
    try {
      await instance.get(`/api/chat/room/${roomId}/save`)
    } catch (error) {
      console.log(error)
    }
  }
}


// 찬반투표
export const chattingVote = (vote, roomId) => {
  return async function (dispatch) {
    try {
      await instance.post(`/api/chat/room/${roomId}/vote`, {
        prosCons: vote
      })
      dispatch(allChattingListRS())
    } catch (error) {
      console.log(error)
    }
  }
}






// [커뮤니티 채팅 API / 은진] -------------------------------------------------

// 방생성
export const createChatRoom = (sendData, navigate) => {
  return async function (dispatch) {
    await instance.post(`/api/chat/room`, {
      comment: sendData.comment,
      timeLimit: sendData.timeLimit
    })
      .then((res) => {
        const roomId = res.data.data.roomId
        const sendingData ={
          roomId : roomId,
          sender : sendData.sender,
          profileImg : sendData.profileImg,
          minutes : sendData.minutes,
          prosCons : sendData.prosCons,
          seconds : sendData.seconds,
          station : sendData.station
        }
        navigate(`/chat/roomdetail/${roomId}`, { state: sendingData });
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
       })
      .catch((error) => {
      });
  };
};


export const loadpostsAc = () => {
  return function (dispatch) {
    instance.get('/api/board', { params: { lastBoardId: 999, size: 15 } })
      .then(response => {
        dispatch(roadPosts(response.data));
      })
      .catch(error => {
      })
  };
};


export const loadDetailAc = (boardId) => {
  return function (dispatch) {
    instance.get(`/api/board/detail/${boardId}`)
      .then(response => {
        // console.log(response, "redux_data");
        dispatch(loadDetail(response));
      })
      .catch(error => {
        console.log("get error", error)
      })

  };
};

export const loadMoreContentDB = () => {
  return async function (dispatch, getState) {
    const board = getState().community.postList.data;
    const lastIndex = board[board.length - 1].boardId
    await instance.get('/api/board', { params: { lastBoardId: lastIndex, size: 15 } })
      .then((response) => {
        const new_data = [...board, ...response.data.data];
        dispatch(roadPosts({ data: new_data }));
      });
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
      })
      .catch((err) => {
      });
  };
};





export const deletePostAc = (boardId) => {
  return async function (dispatch) {
    await instance
      .delete(`/api/board/${boardId}`)
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
      });
  };
};





// [커뮤니티 Comment API]-----------------------------------------------------

export const createCommentAc = (data, boardId) => {
  return async function (dispatch) {
    await instance.post(`/api/board/${boardId}/comment`, data)
      .then(response => {
        dispatch(loadCommentAc(boardId));

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
        dispatch(loadComment(response.data));
      })
      .catch(error => {
        console.log("get error", error)
      });
  };
}


export const updateCommentAc = (data) => {
  return function (dispatch) {
    instance.put(`/api/board/${data.boardId}/comment/${data.commentId}`, { "comment": data.comment })
      .then((response) => {
        dispatch(loadCommentAc(data.boardId));
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
        dispatch(loadCommentAc(boardId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};



const communitySlice = createSlice({
  name: "community",
  initialState: {
    allChattingList:[],
    closedChttingLog: [],
    roomInfo:[],
    getDayCountList: [],
    messages: [],
    myInfo: [],
    // 게시판
    postList: { data: [] },
    post: [],
    postId:[],    
    likeList: [],
    commentList: {data : []},
  },
  reducers: {
    // 포스트 리듀서 
    getPostId:(state,action) =>{
      state.postId.push(action.payload);
    },
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

    // 채팅 메시지
    subMessage(state, action) {
      state.messages.push(action.payload);
      // state.messages = action.payload;
    },
    // 채팅 메시지 삭제
    delMessage(state, action) {
      console.log("dho")
      state.messages = [];
      // state.messages = action.payload;
    },

  },

  extraReducers: {
    
    [closedChttingInfinityLoad.fulfilled]: (state, action) => {
      state.allChattingList.closedChatRooms = action.payload
    },
    [allChattingListRS.fulfilled]: (state, action) => {
      state.allChattingList = action.payload
    },
    [roomInfoRS.fulfilled]: (state, action) => {
      state.roomInfo = action.payload
    },
    [likeChange.fulfilled]: (state, action) => {
      state.likeList = action.payload
    },
    [closedChttingLogRS.fulfilled]: (state, action) => {
      state.closedChttingLog = action.payload
    }


  }

});

export const {  
  loadComment, createComment, roadPosts, loadDetail, subMessage, 
  getDayCountList, myInfo, delMessage, getPostId } = communitySlice.actions;
export default communitySlice.reducer;