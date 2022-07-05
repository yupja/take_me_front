import React, { useEffect, useState } from "react";
import reset from "./public/css/reset.css";
import Router from "./shared/Router";
import { createGlobalStyle } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// import { getUserInfoDB } from "./redux/modules/user";

function App() {
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLogin, setisLogin] = useState(false);
  const getToken = localStorage.getItem('accessToken');
  useEffect(() => {
    if (getToken) {
      setisLogin(true);
      // dispatch(getUserInfoDB()); // 정보 요청 오류수정중
    }
  }, [])

  return (
    <div className="App">
      <GlobalStyle />
      <Router />
    </div>
  );
}

const GlobalStyle = createGlobalStyle`
${reset}; 
`;

export default App;