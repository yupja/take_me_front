import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/configStore';
import { CookiesProvider } from 'react-cookie';

import styled from 'styled-components';
import { height } from '@mui/system';

// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// serviceWorkerRegistration.register();
const Image = styled.div`
  background-image: url("https://s3.ap-northeast-2.amazonaws.com/amorossoprc.shop/W_06.Edit_2D_3-2.png");
  background-size: 100% 100%;
  width: 100%;
  height: 320px;
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <CookiesProvider>
      <Image style={{
        display: "flex",
        justifyContent: 'center',
        maxWidth: "1500px",
        width: "100%",
        height: "100%",
        
         }}>
        <div style={{
          position: "relative",
          // border: "1px solid #cccccc",
          maxWidth: "414px",
          width: "100%",
          maxHeight: "896",
          height: "100%",
          overflowY: "scroll",
          background: "white"
        }}>
          <App />
        </div>
      </Image>
    </CookiesProvider>
  </Provider>
);

