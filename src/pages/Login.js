import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { LoginDB } from "../store/modules/login";

import Header from "../components/public/Header";
import LoginGoogle from "../components/login/LoginGoogle";
import LoginKakao from "../components/login/LoginKakao";
import FindId from "../components/login/FindId";
import FindPw from "../components/login/FindPw";
import UserModalForm from "../components/public/UserModalForm";

// import { ReactComponent as Check } from "../assets/icons/Check.svg";

function Login() {
  const { name } = useParams();
  const state = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const title = "로그인"

  // 로그인 정보 가져오기
  const userId = useRef();
  const userPw = useRef();

  // const [navToggles, setNavToggles] = useState(false);
  const [ModalStr, setModalStr] = useState('');

  // const closeNav = () => {
  //   setNavToggles(false)
  // }
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };


  // 로그인
  const login = (e) => {
    e.preventDefault();
    if (userId.current.value === "" || userPw.current.value === "") {
      setModalStr('아이디 또는 비밀번호를\n 확인해 주세요')
      openModal()
      return;
    }
    const loginInfo = {
      username: userId.current.value,
      password: userPw.current.value,
    }
    const urlData = {
      signupUrl: state,
      loginUrl: window.location.href
    }
    dispatch(LoginDB(loginInfo, setModalStr, openModal, navigate, urlData));
  }

  return (
    <>
      {name === "findid" && <FindId />}
      {name === "findpw" && <FindPw />}
      {name === undefined &&
        <>
          <div className="topWrap">
            <Header title={title} />
          </div>
          <LoginWrap>
            <Title>안녕하세요.<br /><span className="logo">티끌</span><span>입니다.</span></Title>
            <p>서비스 이용을 위해 로그인해주세요.</p>
            <Form>
              <label htmlFor="userId">
                <input
                  type="text"
                  id="userId"
                  placeholder="아이디"
                  ref={userId}
                />
              </label>
              <label htmlFor="userPw">
                <input
                  type="password"
                  id="userPw"
                  placeholder="비밀번호"
                  ref={userPw}
                />
              </label>
              <InputBtn onClick={login}>로그인하기</InputBtn>
            </Form>
            <Licks>
              <Link to="/signup">회원가입</Link>
              <span>
                <Link to="/login/findid">아이디·</Link>
                <Link to="/login/findpw">비밀번호 찾기</Link>
              </span>
            </Licks>
            <Social>
              <li>
                <LoginKakao />
              </li>
              <li>
                <LoginGoogle />
              </li>
            </Social>
          </LoginWrap>
          <UserModalForm open={modalOpen} close={closeModal} header={"icon"} footer={"닫기"} >
            <h3>{ModalStr}</h3>
          </UserModalForm>
        </>
      }
    </>
  )
};

export default Login;


const LoginWrap = styled.div`
width: 100%;
padding: 0 25px;
p{
  margin: 10px 0 45px;
  color: #999;
  letter-spacing: -0.5px;
}
`

const Title = styled.h1`
margin-top: 33px;
font-size: 1.75rem;
line-height: 2.43rem;
font-weight: 500;
span {
  font-weight: 700;
  letter-spacing: -0.05em;
}
span.logo{
  font-family: 'Cafe24Ohsquare';
  color:#26DFA6;
  font-size: 2.31rem;
  padding-right: 5px;
  font-weight:500;
}
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
  padding: 20px 10px;
  font-size: 16px;
  border-bottom: 1px solid #EAEEEF;
  box-sizing: border-box;
  border-radius: 2px;
}
input::placeholder {
  color: #ddd;
}
`

const Licks = styled.div`
position: relative;
left: 50%;
transform: translateX(-50%);
display: inline-block;
margin-top: 20px;
span {
  margin-left: 10px;
}
a{
  display: inline-block;
  color:#999;
  font-size:0.87rem;
  font-weight:500;
  letter-spacing: -0.03em;
  text-decoration: underline;
  text-underline-position: under;
}
`

const InputBtn = styled.button`
  display: block;
  width: 100%;
  padding: 16px 10px;
  margin-top: 40px;
  background: #26DFA6;
  border: none;
  color:#fff;
  font-size: 18px;
  cursor: pointer;
  border-radius: 32px;
  font-weight: 700;
`;


const Social = styled.ul`
margin-top: 4.06rem;
position: relative;
left: 50%;
transform: translateX(-50%);
display: flex;
justify-content: center;

li{
  display: inline-block;
  margin: 0 20px;
  text-align: center;
}
`