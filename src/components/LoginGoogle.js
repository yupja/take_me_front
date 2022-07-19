import React from 'react';
import styled from "styled-components";
import { ReactComponent as Google } from "../assets/icons/Google.svg";
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_ID;

function LoginGoogle(props) {

  const GOOGLE_REDIRECT_URI = "https://api.webprogramming-mj6119.shop/login/oauth2/code/google";
  const GOOGLE_AUTH_URL = `https://www.tikkeeul.com/oauth2/authorization/google?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile`;

  return (
    <SocialWrap>
      <a href={GOOGLE_AUTH_URL}>
        <div><Google className='icon' /></div>
        구글로<br />시작하기
      </a>
    </SocialWrap>
  );
}

export default LoginGoogle;

const SocialWrap = styled.div`

div {
  position: relative;
  width: 3.12rem;
  height: 3.12rem;
  border:1px solid #ddd;
  border-radius: 50%;
  background: #fff;
  margin-bottom: 10px;
  .icon{
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
  }
}
a{
  color:#999;
  font-size:0.87rem;
    line-height: 1rem;
}
`