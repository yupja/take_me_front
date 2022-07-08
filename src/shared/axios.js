import axios from "axios";
import { getCookie, setCookie, removeCookie } from "../redux/modules/cookie";

export const instance = axios.create({
  baseURL: "http://3.37.61.13/"
});

instance.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    config.withCredentials = true;

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`
    }
    return config;
  }, (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    console.log(response);
    return response;
  },
  function (error) {
    console.log(error.config.url)
    console.log(error.config.data)
    const check = error.config.url
    const checks = error.config.data
    // const originalRequest = error.config;
    if (check.includes('/api/myInfo') && checks === undefined) {
      refreshToken();
    }
    return Promise.reject(error);
  }
);



// 토큰 재발급
const refreshToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = getCookie('refreshToken');

  const token = {
    accessToken: accessToken,
    refreshToken: refreshToken
  }
  // console.log("토큰재발급할거야", token);
  axios.post("http://13.209.13.168/api/user/reissue", token, {
    "Content-Type": "application/json",
    withCredentials: true,
  })
    .then((response) => { //새로운 토큰2개 재발급 완료시
      console.log(response);

      console.log("재발급 완료")
      localStorage.clear();
      removeCookie('refreshToken');

      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      localStorage.setItem("accessToken", accessToken);
      setCookie('refreshToken', refreshToken, {
        path: "/",
        secure: true,
        sameSite: 'none',
      })
    })
    .catch(function (error) { // refreshToken도 만료시 재로그인
      console.log(error)
      removeCookie('refreshToken');
      localStorage.clear();
      // window.location.replace = "/";
      alert("세션 만료 다시 로그인 해주세요.");
    });
};

export default instance;