import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "./cookie";

export const instance = axios.create({
  baseURL: "https://api.webprogramming-mj6119.shop"
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
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error)
    const errMsg = error.response.data.code
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
    .then((response) => {
      console.log(response);

      deleteCookie('refreshToken');
      localStorage.clear();

      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      localStorage.setItem("accessToken", accessToken);

      setCookie('refreshToken', refreshToken, {
        path: "/",
        secure: true,
        sameSite: 'none',
      });
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
      deleteCookie('refreshToken');
      localStorage.clear();

      window.location.href = '/login';
    });
};

export default instance;