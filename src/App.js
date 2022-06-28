import reset from "./public/css/reset.css";
import { createGlobalStyle, ThemeProvider } from "styled-components";

function App() {
  return (
    <div className="App">
      <GlobalStyle />

    </div>
  );
}

const GlobalStyle = createGlobalStyle`
${reset}; 
`;

export default App;