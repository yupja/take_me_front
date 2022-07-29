import React from "react";
import reset from "./styles/reset.css";
import Router from "./shared/Router";
import styled, { createGlobalStyle } from "styled-components";

function App() {
  return (
    // <Container>
    //   <Inner>
      <>
        <GlobalStyle />
        <Router />
        </>


  );
}


const GlobalStyle = createGlobalStyle`
${reset}; 
`;

export default App;


