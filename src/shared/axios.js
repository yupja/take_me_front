import axios from "axios";

export const instance = axios.create({
  baseURL: ""
});

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config;
  }, (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
