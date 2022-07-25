import React from "react";
import reset from "./styles/reset.css";
import Router from "./shared/Router";
import { createGlobalStyle } from "styled-components";

function App() {
  return (
      <div className="mobile">
      <GlobalStyle />
      <Router />
      </div>

  );
}




const GlobalStyle = createGlobalStyle`
${reset}; 
`;

export default App;