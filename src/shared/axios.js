import axios from "axios";
import { getCookie, setCookie, removeCookie } from "../store/modules/cookie";
import { useCookies } from "react-cookie";

export const instance = axios.create({
  // baseURL: "https://api.webprogramming-mj6119.shop"
  // baseURL: "http://13.209.13.168"
  // baseURL: "http://3.35.52.157"
  baseURL: "http://13.209.74.40"
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
    // console.log(response);
    return response;
  },
  function (error) {
    console.log(error)
    const errMsg = error.response.data.code
    // const originalRequest = error.config;
    if (errMsg === 444) {
      refreshToken();
      return;
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
  instance.post("/api/user/reissue", token, {
    "Content-Type": "application/json",
    withCredentials: true,
  })
    .then((response) => { //새로운 토큰2개 재발급 완료시
      console.log(response);
      console.log("재발급 완료")
      const [, , removeCookie] = useCookies(['refreshToken']);

      localStorage.clear();
      removeCookie('refreshToken', { path: '/' });

      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      localStorage.setItem("accessToken", accessToken);
      setCookie('refreshToken', refreshToken, {
        path: "/",
        secure: true,
        sameSite: 'none',
      });
      window.location.replace("/")
    })
    .catch((error) => { // refreshToken도 만료시 재로그인
      //window.alert("로그아웃이 되었습니다. 다시 로그인해주세요!")
      
      const [, , removeCookie] = useCookies(['refreshToken']);
      removeCookie('refreshToken', { path: '/' });
      localStorage.clear();
      window.location.replace("/")
      
      alert("세션 만료 다시 로그인 해주세요.");
    });
};

export default instance;