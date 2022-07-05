import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "./cookie";
import instance from "../../shared/axios";
import axios from "axios";


//login
export const LoginDB = (loginInfo) => {
  return async function (dispatch) {
    console.log(loginInfo);
    await axios.post("http://13.209.13.168/api/user/login", loginInfo, {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      // .then(onLoginSuccess)
      .then((response) => {
        console.log(response)

        const accessToken = response.data.accessToken;
        // const refreshToken = response.data.refreshToken;

        localStorage.setItem("accessToken", accessToken);
        // setCookie('refreshToken', refreshToken, {
        //   path: "/",
        //   secure: true,
        //   sameSite: 'none',
        // })
        dispatch(isLogin(true))
      })
      .catch((error) => {
        console.log("로그인 실패")
      });
  };
};


// 로그인한 사용자 정보 조회 (모든 페이지? 필요한 페이지만 요청?)
export const getUserInfoDB = () => {
  return async function (dispatch) {
    await instance.get("http://13.209.13.168/api/user/myInfo", {
      // headers: { Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJldW5qaW4xMjMiLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjU3MDI5NDQ0fQ.P3OhSc80UVY5QfaPVebjf7EDyBzpE8tiMzb5HwMB-366KkluXT-U7cR-feMqfjHOzjbWTHlAiGHHAXp06_qOGg` }
    })
      .then((response) => {
        console.log(response);
        const username = response.data.username;
        const nickname = response.data.nickname;
        const email = response.data.email;

        dispatch(userInfo({
          username: username,
          nickname: nickname,
          email: email
        }))
      })
      .catch((error) => {
        // window.alert(error);
      });
  };
};

// 회원가입 (유저 등록)
export const addUserDB = (userInfo) => {
  return async function (dispatch) {
    console.log(userInfo);
    await axios.post("http://13.209.13.168/api/user/register", userInfo, {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      .then((response) => {
        console.log("유저 등록 성공");
        // window.location.reload()
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  };
};

// 아이디 중복 체크
export const idCheckDB = (id, setUserIdAlert) => {
  return async function (dispatch) {
    await axios.post("http://13.209.13.168/api/user/register/checkUsername", { username: id }, {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      .then((response) => {
        setUserIdAlert(response.data.respMsg)
        // alert(response.data.respMsg);
        // dispatch(idCheckResult(response.data.result))
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  };
};

// 이메일 중복 체크
export const emailCheckDB = (email) => {
  return async function (dispatch) {
    console.log(email);
    await axios.post("http://13.209.13.168/api/user/register/checkEmail", { email: email }, {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data.respMsg);

      })
      .catch((error) => {
        window.alert(error);
      });
  };
};

// 닉네임 중복 체크
export const nickCheckDB = (nick) => {
  return async function (dispatch) {
    console.log(nick);
    await axios.post("http://13.209.13.168/api/user/register/checkNickname", { nickname: nick }, {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data.respMsg);
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  };
};

// 아이디 찾기
export const findIdDB = (email) => {
  return async function (dispatch) {
    console.log(email);
    await axios.post("http://13.209.13.168/api/user/findId", { email: email }, {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data.userId);
        const userFindId = response.data.userId;
        const provider = response.data.provider;
        dispatch(findIdResult(userFindId, provider))
      })
      .catch((error) => {
        window.alert(error);
      });
  };
};

// 비밀번호 찾기
export const findPwDB = (info) => {
  return async function (dispatch) {
    console.log(info);
    await axios.post("http://13.209.13.168/api/user/findPassword", info, {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      .then((response) => {
        dispatch(findPwResult(response.data.respMsg));
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  };
};

// 비밀번호 변경 post요청
export const changePw = (data) => {
  return async function (dispatch) {
    await axios.post("http://13.209.13.168/api/user/changePassword", (data), {
      "Content-Type": "application/json",
      withCredentials: true,
      // Authorization : `Bearer ${accessToken}`, //토큰담아서 보내기
    })
      .then((response) => {
        dispatch(findPwResult(response.data.respMsg));
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  };
};

// 리듀서 
const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    userInfo: [],
    findIdResult: [],
    findPwResult: "",
    idCheckResult: ""
  },
  reducers: {
    isLogin: (state, action) => {
      console.log(action.payload);
      state.isLogin = action.payload;
    },
    userInfo: (state, action) => {
      console.log(action.payload);
      state.userInfo = action.payload;
    },
    findIdResult: (state, action) => {
      console.log(action.payload);
      state.findIdResult = action.payload;
    },
    findPwResult: (state, action) => {
      console.log(action.payload);
      state.findPwResult = action.payload;
    },
    idCheckResult: (state, action) => {
      console.log(action.payload);
      state.idCheckResult = action.payload;
    },

  }
});

// export const userActions = userSlice.actions;
export const { isLogin, userInfo, findIdResult, findPwResult, idCheckResult } = userSlice.actions;
export default userSlice.reducer;