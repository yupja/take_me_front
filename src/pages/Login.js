import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LoginDB } from "../store/modules/user";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import LoginGoogle from "../components/LoginGoogle";
import LoginKakao from "../components/LoginKakao";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user)

  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState();
  const [modalName, setModalName] = useState("");


  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };


  // 로그인 정보 가져오기
  const userId = useRef();
  const userPw = useRef();


  const [navToggles, setNavToggles] = useState(false);
  const [ModalStr, setModalStr] = useState('');

  // const onNav = (e) => {
  //   setNavToggles(true)
  // }
  const closeNav = (e) => {
    setNavToggles(false)
  }

  // 로그인 버튼 클릭시
  const login = async (e) => {
    //e.preventDefault();

    console.log("로그인");
    
    const loginInfo = {
      username: userId.current.value,
      password: userPw.current.value,
    }

    // 빈 항목 체크
    if (userId.current.value === "" || userPw.current.value === "") {
      setModalStr('아이디 또는 비밀번호를\n 확인해 주세요')
      setNavToggles(true)
      return;
    }
    await dispatch(LoginDB(loginInfo, setModalStr, setNavToggles));

    //navigate('/')

  }

  return (
    <>
      <div className="topWrap">
        <Header />
      </div>
      <LoginWrap>
        <Title>안녕하세요.<br /><span>티끌</span>입니다.</Title>
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
          <InputBtn onClick={()=>{
            login()
            navigate("/save");
            }}>로그인하기</InputBtn>
        </Form>
        <Licks>
          <Link to="/signup">회원가입</Link>
          <span>
            <Link to="/user/findid">아이디·</Link>
            <Link to="/user/findpw">비밀번호 찾기</Link>
          </span>
        </Licks>
        <Social>
          <li>
            <LoginKakao />
          </li>
          <li>
            <LoginGoogle />
          </li>
          {/* <li>네이버로 시작하기</li> */}
        </Social>

      </LoginWrap>
      {navToggles ?
        <ModalWrap>
          <ModalBox>
            <div className="icon"></div>
            <CloseBtn onClick={closeNav}>
              <span></span>
              <span></span>
            </CloseBtn>
            <h3>{ModalStr}</h3>
            <button onClick={closeNav}>닫기</button>
          </ModalBox>
        </ModalWrap>
        : null
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
span{
  font-family: 'HS-Regular';
  color:#26DFA6;
  font-size: 2.31rem;
  letter-spacing: -0.5px;
  padding-right: 5px;
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
  padding: 16px 10px;
  font-size: 16px;
  margin-top: 10px;
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
  color:#999;
  font-size:0.87rem;
  font-weight:500;
  text-decoration: underline;
}
`

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

// 모달
const ModalWrap = styled.div`
width: 100%;
height: 100vh;
padding: 0 25px;
position: fixed;
top: 0; left: 0;
background: rgba(0,0,0,0.7);
`
const ModalBox = styled.div`
position: absolute;
top: 50%; left: 50%;
transform: translate(-50%,-50%);
width: 90%;
height: 12.12rem;
background: #fff;
border-radius: 5px;
text-align: center;

.icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: #d9d9d9;
  margin:  10px auto 0;
}
 h3 {
  font-size: 1.5rem;
  padding: 20px 0;
  white-space: pre-wrap;
 }
 button {
  font-size:0.93rem;
  color: #fff;
  width: 100%;
  background: #26DFA6;
  padding: 15px 0;
  position: absolute;
  bottom: 0; left: 0;
 }
`

const CloseBtn = styled.div`
width:1rem; //180px
height: 1rem;
margin-top: 10px;
position:absolute;
top: 0; right: 3%;

span {
  display:block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width:100%;
  height:2px;
  background-color: #999999;
}
span:first-child{
  transform: rotate(45deg) translateX(0%);
  }
span:last-child{
  transform: rotate(135deg) translateX(0%);
  }
`;