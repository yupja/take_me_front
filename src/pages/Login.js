import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { LoginDB } from "../redux/modules/user";

import HeaderMenue from "../components/HeaderMenu";

function Login() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user)
  console.log(userState);
  console.log(localStorage.getItem("accessToken"));


  // 로그인 정보 가져오기
  const userId = useRef();
  const userPw = useRef();


  // 로그인 버튼 클릭시
  const login = (e) => {
    e.preventDefault();

    const loginInfo = {
      username: userId.current.value,
      password: userPw.current.value,
    }
    console.log(loginInfo);

    // 빈 항목 체크
    if (userId.current.value === "" || userPw.current.value === "") {
      window.alert("아이디 혹은 비밀번호가 입력되지 않았습니다.")
      return;
    }
    dispatch(LoginDB(loginInfo));
  }

  return (
    <>
      <div className="topWrap">
        <HeaderMenue state={state} />
      </div>
      <LoginWrap>
        <Title>안녕하세요.<br />데이-킵입니다.</Title>
        <p>서비스 이용을 위해 로그인해주세요.</p>
        <Form>
          <label htmlFor="userId">
            <input
              type="text"
              id="userId"
              placeholder="아이디를 입력해주세요."
              ref={userId}
            />
          </label>
          <label htmlFor="userPw">
            <input
              type="password"
              id="userPw"
              placeholder="비밀번호를 입력해주세요."
              ref={userPw}
            />
          </label>
          <InputBtn onClick={login}>로그인하기</InputBtn>
        </Form>
        <div>
          <Link to="/signup">회원가입</Link>
          <Link to="/user/findid">아이디 찾기</Link>
          <Link to="/user/findpw">비밀번호 찾기</Link>
        </div>
        <ul>
          <li>카카오로 시작하기</li>
          <li>구글로 시작하기</li>
          <li>네이버로 시작하기</li>
        </ul>
      </LoginWrap>
    </>
  )
};

export default Login;

const LoginWrap = styled.div`
width: 100%;
padding: 0 25px;
p{
  margin-bottom: 45px;
}
`

const Title = styled.h1`
margin-top: 33px;
font-size: 1.75rem;
line-height: 2.75rem;
`

const Form = styled.form`
width: 100%;
margin: 0 auto;
  
label{
  display: block;
  text-align: left;
}
p{
  margin:0;
  font-weight: 700;
}
input {
  outline: none;
  width:100%;
  background:#fff;
  border: none;
  padding: 16px 10px;
  font-size: 16px;
  margin-top: 10px;
  border-bottom: 1px solid #EAEEEF;
  box-sizing: border-box;
  border-radius: 2px;
}
input::placeholder {
  color: #C2C2C2;
}
`;

const InputBtn = styled.button`
  display: block;
  width: 100%;
  padding: 16px 10px;
  margin-top: 20px;
  background: #26DFA6;
  border: none;
  color:#fff;
  font-size: 18px;
  cursor: pointer;
  border-radius: 32px;
`;