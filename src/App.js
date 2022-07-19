import React, { useEffect } from "react";
import reset from "./public/css/reset.css";
import Router from "./shared/Router";
import { createGlobalStyle } from "styled-components";
import { getUserInfoDB}  from "../src/redux/modules/user"
import { useDispatch, useSelector } from "react-redux";
function App() {
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