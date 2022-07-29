import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/public/Header";
import { userSecDB } from "../store/modules/user";
import { getInfo } from "../store/modules/info";
import { useCookies } from "react-cookie";

import { ReactComponent as Star } from "../assets/icons/Star.svg";
import { ReactComponent as EditIProfile } from "../assets/icons/EditIProfile.svg";
import { ReactComponent as Ghost } from "../assets/icons/Ghost.svg";
import { ReactComponent as Withdrawal } from "../assets/icons/Withdrawal.svg";
import { ReactComponent as Invi } from "../assets/icons/Invi.svg";
import { ReactComponent as InfoIcon } from "../assets/icons/Info.svg";
import { ReactComponent as Consu } from "../assets/icons/Consu.svg";
import { ReactComponent as Close } from "../assets/icons/Close.svg";

function MyPage() {
  const title = "MY"
  const navigate = useNavigate();

  const [, , removeCookie] = useCookies(['refreshToken']);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.info.infoList);
  const [openModal, setOpenModal] = useState(false);
  const [pwAlertStr, setPwAlertStr] = useState('');
  const [pwStr, setPwStr] = useState('비밀번호를 입력해 주세요.');


  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/main")
    }
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
  const secession = async (e) => {
    e.preventDefault();
    const pw = pwRef.current.value;
    const username = state.username;

    if (pw === '') {
      setPwAlertStr('비밀번호를 입력해주세요.')
      pwRef.current.focus();
      return;
    }
    const data = {
      username: username,
      password: pw
    }
    await dispatch(userSecDB(data, setPwStr, setPwAlertStr))
    pwRef.current.value = null;
    console.log("디스패치 끝!")
  };

  // 로그아웃
  const logout = (e) => {
    localStorage.clear();
    removeCookie('refreshToken', { path: '/' });
    navigate('/login')
  }

  return (
    <>
      <Header title={title} />
      <MyPageWrap>
        <MyInfo>
          <div><img src={state.profileImg} alt="" /></div>
          <p>{state.introDesc === null ?
            "기본 소개글" : state.introDesc
          }
          </p>
        </MyInfo>
        <MyMenu>
          <h2><span>{state.nickname}</span> 님<br />환영합니다!🖐</h2>
          <MenuList>
            <li>
              <Link to="/favorite">
                <div><Star className="starIcon" /></div>
                <p>즐겨찾기</p>
              </Link>
            </li>
            <li>
              <Link to="/history">
                <div><Ghost /></div>
                <p>히스토리</p>
              </Link>
            </li>
            <li>
              <Link to="/proflie">
                <div><EditIProfile /></div>
                <p>프로필 편집</p>
              </Link>
            </li>
          </MenuList>
          <Box>
            <h3>고객 지원</h3>
            <ul>
              {/* <li>
                <div><Invi /></div>
                <span>친구 초대하기</span>
              </li>
              <li>
                <div><Consu /></div>
                <span>티끌 정보</span>
              </li> */}
              <a href="https://forms.gle/qYoVUmbNwkNz2m957" target="_blank" rel="noreferrer">
                <li>
                  <div><InfoIcon /></div>
                  <span>고객의 소리</span>
                </li>
              </a>
              <li onClick={() => setOpenModal(true)}>
                <div><Withdrawal /></div>
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
                <div>
                  <input type="password" placeholder={pwStr} ref={pwRef} />
                </div>
              </div>
            </Info>
            <Btn>
              <button onClick={secession}>탈퇴하기</button>
              <button className="closeBtn" onClick={closePopup}>아니오</button>
            </Btn>
            <CloseBtn onClick={closePopup}>
              <Close />
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
position: absolute;
top: 0; left: 0;
width: 100%;
height: 100vh;
padding: 0 25px;
background: rgba(0, 0, 0, 0.7);
padding: 0 25px;
z-index: 999;
`

const PopupWrap = styled.div`
position: relative;
top: 50%; left: 50%;
transform: translate(-50%,-50%);
width: 100%;
background: #fff;
border-radius: 5px;
text-align: center;
overflow: hidden;

p {
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 2rem;
  margin: 10px 0;
}
`

const Title = styled.h1`
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.25rem;
  line-height:60px;
`

const Info = styled.div`
div {
  display: flex;
  padding: 5px 10px;
  text-align: center;
  justify-content: space-between;
  align-items: center;
}
div>div {
  padding:0;
  display: block;
}
span {
  width: 30%;
  font-weight: 400;
  color: #333;
}
input {
  text-align: center;
  /* padding: */
  line-height: 40px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius : 39px;
  color: #333;
}
input::placeholder{
  color:#ccc;
}
`

const Btn = styled.div`
margin-top: 1.875rem;
button {
  width: 50%;
  color: #fff;
  font-size:1.125rem;
  font-weight: 700;
  background: #ccc;
  padding:1rem 0;
  cursor: pointer;
}
.closeBtn{
  background: #26dfa6;
}

`



// 마이페이지
const MyPageWrap = styled.div`
width: 100%;
height: 95.1%;
background: #F8F8F8;
/* padding: 0 25px; */
`
const MyInfo = styled.div`
width: 100%;
height: 13rem;
padding: 10px 25px;
text-align: center;
background: #fff;
div {
  position: relative;
  width: 7.5rem;
  height: 7.5rem;
  background: #d9d9d9;
  margin: auto;
  border-radius: 50%;
  overflow: hidden;
}
img{
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}
p {
  padding: 15px 10px;
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
    cursor: pointer;
  }
  a{
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
    text-decoration: none;
  }
  div {
    width:4.37rem;
    height: 4.37rem;
    margin: 0 auto;
    background: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 11px 0px rgba(0, 0, 0, 0.15);
  }
  /* li:nth-child(2) div{
  } */
  .starIcon{
    width: 2.5rem;
    height : 2.5rem;
  }
  p{
    margin-top: 5px;
    font-size : 1rem;
    color: #333333;
    font-weight: 500;
  }
`
const MyMenu = styled.div`
background:#F8F8F8;
text-align: center;
padding:20px 25px;

  h2 {
    padding-bottom:23px;
    font-size: 1.5rem;
    font-weight: 700;
  }
  span {
    color:#26DFA6;
    font-family: 'SEBANG_Gothic_Bold';
    font-size:1.75rem;
  }
`
const Box = styled.div`
width: 100%;
margin-top: 50px;
text-align: left;

h3 {
  font-size : 1.12rem;
  letter-spacing: -0.3px;
  margin-bottom: 20px;
  font-weight: 700;
}
ul {
  width: 100%;
  overflow: hidden;
}

li{
  display: flex;
  width: 50%;
  float: left;
  margin-bottom: 15px;
  align-items: center;
  cursor: pointer;
}
div {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  margin-right: 10px;
}
span {
  padding-left: 5px;
  font-weight: 500;
  color: #666666;
  font-family: 'Noto Sans KR';
  font-size:1rem;
}
`

const LoginOutBtn = styled.div`
position: absolute;
bottom: 50px; left: 50%;
transform: translateX(-50%);
color: #999;
border: none;
background: none;
font-size: 1.12rem;
font-weight: 700;
line-height: 1.3rem;
border-bottom: 1px solid #999;
cursor: pointer;
`

const CloseBtn = styled.div`
width:1rem; //180px
height: 1rem;
margin-top: 10px;
position:absolute;
top: 0; right: 3%;
cursor: pointer;

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
