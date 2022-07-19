import React from 'react';
import styled from "styled-components";
import { ReactComponent as Kakao } from "../assets/icons/Kakao.svg";
const KAKAO_CLIENT_ID = process.env.REACT_APP_KAKAO_ID;

function LoginKakao(props) {

  const REDIRECT_URI = "https://api.webprogramming-mj6119.shop/login/oauth2/code/kakao";

  const KAKAO_AUTH_URL = `http://webprogramming-mj6119.shop/oauth2/authorization/kakao?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  //const KAKAO_AUTH_URL = `https://www.tikkeeul.com/oauth2/authorization/kakao?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <SocialWrap>
      <a href={KAKAO_AUTH_URL}>
        <div><Kakao className='icon' /></div>
        카카오로<br />시작하기
      </a>
    </SocialWrap>
  );
}

export default LoginKakao;

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