import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";
import { userSecDB } from "../store/modules/user";
import { getInfo } from "../store/modules/info";
import { useCookies } from "react-cookie";

function MyPage() {
  const title="My"

  const [, , removeCookie] = useCookies(['refreshToken']);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.info.infoList);
  const [openModal, setOpenModal] = useState(false);
  const [pwAlertStr, setPwAlertStr] = useState('');


  useEffect(() => {
    dispatch(getInfo())
  }, [dispatch])

  const pwRef = useRef();

  const onPopup = (e) => {
    setOpenModal(true)
  };

  const closePopup = (e) => {
    setOpenModal(false)
  };

  // 탈퇴하기
  const secession = async () => {
    const pw = pwRef.current.value;
    const username = state.username;

    if (pw === '') {
      setPwAlertStr('비밀번호를 입력해주세요.')
      pwRef.current.focus();
      return;
    }
    await dispatch(userSecDB(pw, username, setOpenModal, setPwAlertStr))
    console.log("디스패치 끝!")
  };

  // 로그아웃
  const logout = (e) => {
    localStorage.clear();
    removeCookie('refreshToken', { path: '/' });
  }

  return (
    <>
      <Header title={title}/>
      <MyPageWrap>
        <MyInfo>
          <div><img src={state.profileImg} alt="" /></div>
          <p>{state.introDesc === null ?
            "기본 소개글" : state.introDesc
          }
          </p>
        </MyInfo>
        <MyMenu>
          <h2><span>{state.nickname}</span>님<br />환영합니다!🖐</h2>
          <MenuList>
            <li>
              <Link to="/favorite">
                <div><img src="" alt="" /></div>
                <p>즐겨찾기</p>
              </Link>
            </li>
            <li>
              <Link to="/history">
                <div><img src="" alt="" /></div>
                <p>히스토리</p>
              </Link>
            </li>
            <li>
              <Link to="/proflie">
                <div><img src="" alt="" /></div>
                <p>프로필 편집</p>
              </Link>
            </li>
          </MenuList>
          <Box>
            <h3>고객 지원</h3>
            <ul>
              <li>
                <div><img src="" alt="" /></div>
                <span>친구 초대하기</span>
              </li>
              <li>
                <div><img src="" alt="" /></div>
                <span>정보</span>
              </li>
              <li>
                <div><img src="" alt="" /></div>
                <span>고객의 소리</span>
              </li>
              <li onClick={() => setOpenModal(true)}>
                <div><img src="" alt="" /></div>
                <span>회원 탈퇴</span>
              </li>
            </ul>
          </Box>
        </MyMenu>
      </MyPageWrap>
      <LoginOutBtn onClick={logout}>로그아웃</LoginOutBtn>
      {openModal ?
        <PopupBack>
          <PopupWrap>
            <Title>회원 탈퇴</Title>
            <p>정말 탈퇴하시겠어요?😥</p>
            <Info>
              <div>
                <span>아이디</span>
                <input type="text" defaultValue={state.username} readOnly />
              </div>
              <div>
                <span>비밀번호</span>
                <input type="password" placeholder="비밀번호를 입력해 주세요." ref={pwRef} />
                <p>{pwAlertStr}</p>
              </div>
            </Info>
            <div>
              <button onClick={secession}>탈퇴하기</button>
              <button onClick={closePopup}>아니오</button>
            </div>
            <CloseBtn onClick={closePopup}>
              <span></span>
              <span></span>
            </CloseBtn>
          </PopupWrap>
        </PopupBack> : null
      }
    </>
  )
};


export default MyPage;

// 탈퇴 팝업
const PopupBack = styled.div`
position: fixed;
top: 0; left: 0;
width: 100%;
height: 100vh;
background: #333;
padding: 0 25px;
`

const PopupWrap = styled.div`
position: absolute;
top: 50%; left: 50%;
transform: translate(-50%,-50%);
width: 100%;
height: 200px;
background: #fff;
`

const Title = styled.h1`

`
const Info = styled.h1`

`




// 마이페이지
const MyPageWrap = styled.div`
width: 100%;
/* padding: 0 25px; */
`
const MyInfo = styled.div`
width: 100%;
height: 13rem;
padding: 10px;
text-align: center;
div {
  width: 7.5rem;
  height: 7.5rem;
  background: #d9d9d9;
  margin: auto;
  border-radius: 50%;
}
img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
p {
  padding-top: 10px;
  font-size: 1rem;
  color: #26DFA6;
  line-height: 1.43rem;
  font-weight: 700;
}
`
const MenuList = styled.ul`
  display: flex;
  justify-content: space-between;

  li{
    position: relative;
    width: 6.24rem;
    height: 6.24rem;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 4px 11px 0px rgba(0, 0, 0, 0.15);
  }
  a{
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
    text-decoration: none;
  }
  div {
    width:2.5rem;
    height: 2.5rem;
    margin: 0 auto;
    background: #D9D9D9;
    border-radius: 50%;
  }
  p{
    margin-top: 5px;
    font-size : 1rem;
    color: #333333;
    font-weight: 500;
  }
`
const MyMenu = styled.div`
height: 72.5vh;
background:#F8F8F8;
text-align: center;
padding:25px;

  h2 {
    font-size: 1.5rem;
    padding-bottom:25px;
    
  }
  span {
    color:#26DFA6;
    font-family: 'HS-Regular';
  }
`
const Box = styled.div`
width: 100%;
margin-top: 50px;
text-align: left;

h3 {
  font-size : 1.12rem;
  letter-spacing: -3px;
  margin-bottom: 20px;
  font-weight: 700;
}
ul {
  width: 100%;
  overflow: hidden;
}

li{
  width: 50%;
  float: left;
  margin-bottom: 10px;
}
div {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  background: #D9D9D9;
  border-radius: 50%;
}
span {
  padding-left: 5px;
  font-weight: 500;
  color: #666666;
  font-family: 'Noto Sans KR';
}
`
const LoginOutBtn = styled.div`
position: absolute;
bottom: 50px; left: 50%;
transform: translateX(-50%);
text-decoration: underline;
color: #999;
letter-spacing: -3px;
border: none;
background: none;
font-size: 1.12rem;
font-weight: 700;
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
