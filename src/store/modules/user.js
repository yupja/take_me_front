import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "./cookie";
import instance from "../../shared/axios";
import { Navigate } from "react-router-dom";


//login
export const LoginDB = (loginInfo, setModalStr, setNavToggles, navigate, urlData) => {
  return async function (dispatch) {
    console.log(loginInfo);
    await instance.post("/api/user/login", loginInfo)
      .then((response) => {
        console.log(response);
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;

        localStorage.setItem("accessToken", accessToken);
        setCookie('refreshToken', refreshToken, {
          path: "/",
          secure: true,
          sameSite: 'none',
        })
        console.log(urlData, "??")

        // window.location.href = "/save"
        navigate('/save', { state: urlData })
        dispatch(isLogin(true))

      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data.status === 500) {
          setModalStr('로그인 실패! 아이디 또는 비밀번호를 확인해 주세요');
          setNavToggles(true);
        }
      });
  }
};



// 로그인한 사용자 정보 조회 (모든 페이지? 필요한 페이지만 요청?)
export const getUserInfoDB = () => {
  return async function (dispatch) {
    await instance.get("/api/myInfo", {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      .then((response) => {
        const username = response.data.data.username;
        const nickname = response.data.data.nickname;
        const email = response.data.data.email;

        const userInfo = {
          username: username,
          nickname: nickname,
          email: email
        }
        // console.log(userInfo)
        dispatch(infoList(userInfo))

      })
      .catch((error) => {
        console.log(error);
      });
  };
};


// 회원가입 (유저 등록)
export const addUserDB = (userInfo, signupUrl, navigate) => {
  return async function (dispatch) {
    console.log(userInfo);
    await instance.post("/api/user/register", userInfo)
      .then((response) => {
        navigate("/login", { state: signupUrl })
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 아이디 중복 체크
export const idCheckDB = (id, setUserIdAlert, setIdColor) => {
  return async function (dispatch) {
    await instance.post("/api/user/register/checkUsername", { username: id })
      .then((res) => {
        if (res.data.result === true) {
          setUserIdAlert("사용 가능한 아이디입니다")
          setIdColor('blue')
        } else {
          setUserIdAlert("중복된 아이디입니다")
          setIdColor('red')
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };
};

// 이메일 중복 체크
export const emailCheckDB = (email, setUserEmailAlert, setEmailColor) => {
  return async function (dispatch) {
    console.log(email);
    await instance.post("/api/user/register/checkEmail", { email: email })
      .then((res) => {
        if (res.data.result === true) {
          setUserEmailAlert("사용 가능한 이메일입니다")
          setEmailColor('blue')
        } else {
          setUserEmailAlert("중복된 이메일입니다")
          setEmailColor('')
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  };
};

// 닉네임 중복 체크
export const nickCheckDB = (nick, setUserNickAlert, setNickColor) => {
  return async function (dispatch) {
    console.log(nick);
    await instance.post("/api/user/register/checkNickname", { nickname: nick })
      .then((res) => {
        console.log(res)
        if (res.data.result === true) {
          setUserNickAlert("사용 가능한 닉네임입니다")
          setNickColor('blue')
        } else {
          setUserNickAlert("중복된 닉네임입니다")
          setNickColor('')
        }
      })
      .catch((error) => {
        console.log(error)
      });
  };
};

// 아이디 찾기
export const findIdDB = (email) => {
  return async function (dispatch) {
    console.log(email);
    await instance.post("/api/user/findId", { email: email })
      .then((res) => {
        console.log(res);
        if (res.data.result === false) {
          const result = res.data.result;
          dispatch(findIdResult(result))
        } else {
          const findInfo = {
            userFindId: res.data.data.userId,
            provider: res.data.data.provider,
            result: res.data.result,
          }
          dispatch(findIdResult(findInfo))
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  };
};

// 비밀번호 찾기
export const findPwDB = (info, setfindPwPop) => {
  return async function (dispatch) {
    console.log(info);
    await instance.post("/api/user/findPassword", info)
      .then((res) => {
        console.log(res)
        dispatch(findPwResult(res.data.respMsg));
      })
      .catch((error) => {
        console.log(error)
        window.alert(error.response.data.message);
      });
  };
};

// 비밀번호 변경 post요청
export const changePw = (data, token) => {
  return async function (dispatch) {
    console.log(data, token);
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    await instance.post("/api/user/changePassword", data, {
      headers: headers
    })
      .then((res) => {
        console.log(res)
        // dispatch(findPwResult(res.data.respMsg));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 탈퇴
export const userSecDB = (data, setPwStr, pwAlert) => {
  return async function (dispatch) {
    console.log(data);
    await instance.post("/api/user/resign", data)
      .then((response) => {
        console.log(response)

        // 토큰 삭제
        const deleteCookie = function (name) {
          document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
        }
        deleteCookie('refreshToken');
        localStorage.clear();

        dispatch(result(true));
        window.location.href = '/login';
      })
      .catch((error) => {
        console.log(error);
        setPwStr('잘못된 비밀번호입니다.')
      });
  };
};


// 리듀서 
const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    infoList: [],
    findIdResult: [],
    findPwResult: "",
    idCheckResult: "",
    result: false,
  },
  reducers: {
    isLogin: (state, action) => {
      console.log(action.payload);
      state.isLogin = action.payload;
    },
    infoList: (state, action) => {
      state.infoList = action.payload;
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
    result: (state, action) => {
      console.log("리듀서끝!")
      console.log(action.payload);
      state.result = action.payload;
    },

  }
});

// export const userActions = userSlice.actions;
export const { isLogin, infoList, findIdResult, findPwResult, idCheckResult, result } = userSlice.actions;
export default userSlice.reducer;