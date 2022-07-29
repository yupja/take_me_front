import React from "react";
import reset from "./styles/reset.css";
import Router from "./shared/Router";
import styled, { createGlobalStyle } from "styled-components";

function App() {
  return (
    // <Container>
    //   <Inner>
    <div>
        <GlobalStyle />
        <Router />
        </div>
    //   </Inner>
    // </Container>
  );
}


const GlobalStyle = createGlobalStyle`
${reset}; 
`;

export default App;

const Container = styled.div`
  display: "flex";
  justify-content: center;
  max-width: "1500px";
  width: "100%";
  height: "100%";
  
  position: absolute;

  width: 100%;
  height: 100%;
  background: url(https://s3.ap-northeast-2.amazonaws.com/amorossoprc.shop/W_06.Edit_2D_3-2.png);
  background-size: cover;
`;

const Inner = styled.div`

    position: "relative";
    border: "1px solid #cccccc";
    max-width: 440px;
    width: "100%";
    max-height: "896px";
    height: "100%";
    overflow-y: "scroll";
    background: white;
    `;

