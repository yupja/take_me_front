import axios from "axios";
import { getCookie, setCookie, removeCookie } from "../redux/modules/cookie";

export const instance = axios.create({
  baseURL: "https://13.209.13.168"
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
  async function (error) {
    // const originalRequest = error.config;

    if (error.status === 401) { // 아니면 에러메시지도 가능(access토큰이 만료된 경우)
      refreshToken();
    }
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
  axios.post("http://13.209.13.168/api/user/reissue", token, {
    "Content-Type": "application/json",
    withCredentials: true,
  })
    .then((response) => { //새로운 토큰2개 재발급 완료시
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
      removeCookie('refreshToken');
      localStorage.clear();
      window.location.replace = "/";
      alert("세션 만료 다시 로그인 해주세요.");
    });
};

export default instance;