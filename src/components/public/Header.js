import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ReactComponent as Close } from "../../assets/icons/Close.svg";
import Guide from "../community/Guide";

// import NavToggle from "./NavToggle";
const slider = keyframes`
  from {
    transform: translateX(0px);
    right: -60%
  }
  to {
    transform: translateX(0px);
    right: 0%
  }
`;



function Header({ title, tColor, backGround }) {
  const url = window.location.href;
  const [circle, setCircle] = useState();

  useEffect(() => {
    if (url.includes('save')) {
      setCircle("save")
    }
    if (url.includes('community') || url.includes('chattingList')) {
      setCircle("community")
    }
    if (url.includes('ranking')) {
      setCircle("ranking")
    }
    if (url.includes('mypage')) {
      setCircle("mypage")
    }
    if (url.includes('main')) {
      setCircle("main")
    }
  }, [url])


  const navigate = useNavigate();
  const [navToggles, setNavToggles] = useState(false);

  const [, , removeCookie] = useCookies(['refreshToken']);

  // 로그아웃
  const logout = (e) => {
    localStorage.clear();
    removeCookie('refreshToken', { path: '/' });
    window.location.href = '/login';
  }

  const onNav = (e) => {
    setNavToggles(true)
  }
  const closeNav = (e) => {
    setNavToggles(false)
  }

  const [showModal, setShowModal] = useState(false);

  const openGuide = () => {
    setShowModal(true)
  }
  const closeGuide = () => {
    setShowModal(false);
    setNavToggles(false)
  }




  return (
    <HeaderWrap style={{ background: `${backGround}` }}>
      <LeftArea>
        <h1 onClick={() => {
          navigate("/");
        }}>티끌</h1>
      </LeftArea>
      <Title style={{ color: `${tColor}` }}>{title}</Title>
      <HamArea onClick={onNav}>
        <NavBtn>
          <div>
            <span style={{ background: `${tColor}` }}></span>
            <span style={{ background: `${tColor}` }}></span>
            <span style={{ background: `${tColor}` }}></span>
            <span style={{ background: `${tColor}` }}></span>
          </div>
        </NavBtn>
      </HamArea>
      {navToggles ?
        <>
          <Popup>
            {showModal ?
              <Guide
                open={showModal}
                close={closeGuide}
              />
              : null}
            <NavWrap>
              <CloseBtn onClick={closeNav}>
                <Close />
              </CloseBtn>
              <Menu link={circle}>
                <li onClick={() => {
                  if (!localStorage.getItem("accessToken")) {
                    alert("로그인 후 이용이 가능해요.")
                  } else { navigate("/save"); }
                }}>
                  <span className="save">데일리 티끌</span>
                </li>
                <li onClick={() => {
                  if (!localStorage.getItem("accessToken")) {
                    alert("로그인 후 이용이 가능해요.")
                  } else { navigate("/community"); }
                }}>
                  <span className="community">커뮤니티</span>
                </li>
                <li onClick={() => {
                  if (!localStorage.getItem("accessToken")) {
                    alert("로그인 후 이용이 가능해요.")
                  } else { navigate("/ranking"); }
                }}>
                  <span className="ranking">랭킹</span>
                </li>
                <li onClick={() => {
                  if (!localStorage.getItem("accessToken")) {
                    alert("로그인 후 이용이 가능해요.")
                  } else { navigate("/mypage"); }
                }}>
                  <span className="my">MY</span>
                </li>
                <li onClick={() => {
                  navigate("/main");
                }}>
                  <span className="main">About</span>
                </li>
                <li className="guide" onClick={openGuide}>🏷 티끌 가이드 다시보기</li>
              </Menu>

              <Footer>
                {localStorage.getItem('accessToken') ?
                  <p onClick={logout}>로그아웃</p>
                  :
                  <div>
                    <p onClick={() => {
                      navigate("/signup");
                    }}>회원가입</p>
                    <p onClick={() => {
                      navigate("/login");
                    }}>로그인</p>
                  </div>
                }
                <Copyright>ⓒ 항해 7기 나를가조</Copyright>
              </Footer>
            </NavWrap>
          </Popup>
        </>
        : null
      }
    </HeaderWrap>
  );
}

export default Header;

const HeaderWrap = styled.div`
position: sticky;
top: 0;
max-width:440px;
width: 100%;
height: 44px;
background: rgba(0, 0, 0, 0);
z-index:888;
`;

const LeftArea = styled.div`
h1 {
  position: absolute;
  left: 25px;
  font-family: 'SEBANG_Gothic_Bold';
  line-height: 44px;
  color: #26DFA6;
  font-size: 1.25rem;
  cursor: pointer;
}
`;

const Title = styled.h1`
position:absolute;
left: 50%;
transform: translateX(-50%);
line-height: 44px;
font-family: 'SEBANG_Gothic_Bold';
font-size: 1.5rem;
`;

const HamArea = styled.div`
position:absolute;
top: 50%; right: 25px;
transform: translateY(-50%);
`;


const CloseBtn = styled.div`
width:1rem; //180px
height: 1rem;
margin-top: 10px;
position:absolute;
top: 0; right: 10px;

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




const Menu = styled.ul`
padding-top : 80px;
z-index: 100;
text-align: center;
li {
  font-size: 1.5rem;
  margin-bottom: 1.87rem;
  cursor: pointer;
}
li:first-child{
  color: #26DFB3;
}
li:last-child{
  color: #999;
  font-size: 1.125rem;
  margin: 3.12rem 0;
  font-family: 'SEBANG_Gothic_Bold';
}
span{
  position: relative;
  font-family: 'SEBANG_Gothic_Bold';
  :before{
    display: none;
    position: absolute;
    top: -5px; left: -10px;
    content: '';
    width: 6px;
    height: 6px;
    background: #26DFB3;
    border-radius: 50%;
  }
}

// 현재 페이지
.save::before{
  display: ${props => props.link === "save" && 'inline-block'};
}
.community::before{
  display: ${props => props.link === "community" && 'inline-block'};
}
.ranking::before{
  display: ${props => props.link === "ranking" && 'inline-block'};
}
.my::before{
  display: ${props => props.link === "mypage" && 'inline-block'};
}
.main::before{
  display: ${props => props.link === "main" && 'inline-block'};
}

`

// const Save = styled.span`

//  color: ${props => props.link === "save" && '#FF7272'};
// /* padding-top : 80px; */
// `


const NavWrap = styled.div`
width:70%; //180px
height: 100%;
background-color: #fff;
position: absolute;
top: 0; right: 0;

animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-name: ${slider};
  animation-fill-mode: forwards;

`;

const NavBtn = styled.div`

div {
  width:1rem;
  height: 12px;
  position: relative;
  cursor:pointer;
  }
  span {
    display:block;
    width:100%;
    height:1px;
    margin-bottom: 3px;
    transition:all .5s;
    background-color: #000;
  }
  span:last-child{
    margin-bottom: 0;
  }

`;

const Footer = styled.div`
position: absolute;
bottom: 10%;
left: 50%;
transform : translateX(-50%);
width: 55%;
text-align: center;
div{
  display: flex;
  justify-content: space-around;
}

p{
  font-size: 1.125rem;
  font-weight: 700;
  color: #999;
  letter-spacing: -0.5px;
  border-bottom : 1px solid #999;
  line-height: 1.23rem;
  display: inline-block;
  padding-bottom:2px;
  cursor: pointer;
}
p:nth-child(2) {
  color: #26DFA6;
  border-bottom : 1px solid #26DFA6;
}
`;

const Popup = styled.div`
flex-direction: column;
position: absolute;
background-color: rgba(0,0,0,0.7);
width: 100%;
height: 100vh;
/* max-height: 896px; */
`;

const Copyright = styled.div`
margin-top: 17px;
font-weight: 400;
font-size: 0.875rem;
line-height: 1.125rem;
color: #CCCCCC;
`;
