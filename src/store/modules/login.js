import { createSlice } from "@reduxjs/toolkit";
import { setCookie, deleteCookie } from "../../shared/cookie";
import instance from "../../shared/axios";


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
        navigate('/save', { state: urlData })

      })
      .catch((error) => {
        console.log(error.response.data);
        const errCode = error.response.data.status;
        if (errCode === 500 || errCode === 400) {
          setModalStr("아이디 또는 비밀번호를\n 확인해주세요.");
          setNavToggles(true);
        }
      });
  }
};



// 로그인한 사용자 정보 조회
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
        console.log(userInfo)
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
          setUserIdAlert("👍사용 가능한 아이디입니다")
          setIdColor('#26DFA6')
        } else {
          setUserIdAlert("중복된 아이디입니다")
          setIdColor('#FF7272')
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
    await instance.post("/api/user/register/checkEmail", { email: email })
      .then((res) => {
        console.log(res)
        if (res.data.result === true) {
          setUserEmailAlert("👍사용 가능한 이메일입니다")
          setEmailColor('#26DFA6')
        } else {
          setUserEmailAlert("중복된 이메일입니다")
          setEmailColor('#FF7272')
        }
      })
      .catch((error) => {
        console.log(error)
      });
  };
};

// 닉네임 중복 체크
export const nickCheckDB = (nick, setUserNickAlert, setNickColor) => {
  return async function (dispatch) {
    await instance.post("/api/user/register/checkNickname", { nickname: nick })
      .then((res) => {
        console.log(res)
        if (res.data.result === true) {
          setUserNickAlert("👍사용 가능한 닉네임입니다")
          setNickColor('#26DFA6')
        } else {
          setUserNickAlert("중복된 닉네임입니다")
          setNickColor('#FF7272')
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
        console.log(error);
      });
  };
};

// 비밀번호 찾기
export const findPwDB = (info, setfindPwPop, setStr) => {
  return async function (dispatch) {
    console.log(info);
    await instance.post("/api/user/findPassword", info)
      .then((res) => {
        console.log(res)
        setStr(res.data.respMsg)
        // dispatch(findPwResult(res.data.respMsg));
        setfindPwPop(true)
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
export const userSecDB = (data, setPwStr) => {
  return async function (dispatch) {
    console.log(data);
    await instance.post("/api/user/resign", data)
      .then((response) => {
        if (!response.data.result) {
          return setPwStr('잘못된 비밀번호입니다.');
        }
        deleteCookie('refreshToken');
        localStorage.clear();

        dispatch(result(true));
        window.location.href = '/login';
      })
      .catch((error) => {
        console.log(error);
        setPwStr('잘못된 비밀번호입니다.');
      });
  };
};


// 리듀서 
const userSlice = createSlice({
  name: "login",
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
      state.isLogin = action.payload;
    },
    infoList: (state, action) => {
      state.infoList = action.payload;
    },
    findIdResult: (state, action) => {
      state.findIdResult = action.payload;
    },
    findPwResult: (state, action) => {
      state.findPwResult = action.payload;
    },
    idCheckResult: (state, action) => {
      state.idCheckResult = action.payload;
    },
    result: (state, action) => {
      state.result = action.payload;
    },

  }
});

// export const userActions = userSlice.actions;
export const { isLogin, infoList, findIdResult, findPwResult, idCheckResult, result } = userSlice.actions;
export default userSlice.reducer;