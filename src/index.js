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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <CookiesProvider>
      <div style={{
        display: "flex",
        justifyContent: 'center',
        maxWidth: "1500px",
        width: "100%",
        height: "100%",
      }}>
        <div style={{
          position: "relative",
          top: "44px",
          border: "1px solid #cccccc",
          maxWidth: "390px",
          width: "100%",
          maxHeight: "844px",
          height: "100%",
          // overflow: "hidden"
        }}>
          <App />
        </div>
      </div>
    </CookiesProvider>
  </Provider>
);

