import styled from "styled-components";

import { useLocation } from "react-router";
import { Link } from "@mui/material";

import Header from "../components/Header";

function MyPage() {
  const { state } = useLocation();

  return (
    <>
      <Header />
      <MyPageWrap>
        <MyInfo>
          <div><img src="" alt="" /></div>
          <p>
            내가 나를 소개하는 글을 적어보도록 하겠습니다.
            바로 이자리에 말이죠 글자는 2줄로 지정 해보겠습니다.
          </p>
        </MyInfo>
        <MyMenu>
          <h2><span>석구</span>님<br />환영합니다!🖐</h2>
          <ul>
            <li>
              <Link to="/">
                <div><img src="" alt="" /></div>
                <p>즐겨찾기</p>
              </Link>
            </li>
            <li>
              <Link to="/">
                <div><img src="" alt="" /></div>
                <p>히스토리</p>
              </Link>
            </li>
            <li>
              <Link to="/">
                <div><img src="" alt="" /></div>
                <p>프로필 편집</p>
              </Link>
            </li>
          </ul>
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
              <li>
                <div><img src="" alt="" /></div>
                <span>회원 탈퇴</span>
              </li>
            </ul>
          </Box>
          <button>로그아웃</button>
        </MyMenu>
      </MyPageWrap>
    </>
  )
};


export default MyPage;

const MyPageWrap = styled.div`
width: 100%;
/* padding: 0 25px; */
`
const MyInfo = styled.div`
width: 100%;
padding: 10px;
text-align: center;
div {
  width: 7.5rem;
  height: 7.5rem;
  background: #d9d9d9;
  margin: auto;
  border-radius: 50%;
}
p {
  padding-top: 10px;
  font-size: 0.87rem;
  color: #26DFA6;
  line-height: 1.12rem;
  font-weight: 700;
}
`
const MyMenu = styled.div`
background:#F8F8F8;
text-align: center;
padding:25px;

  h2 {
    font-size: 1.5rem;
  }
  span {
    color:#26DFA6;
  }
  ul {
    display: flex;
    justify-content: space-between;
  }
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
  }
  div {
    width:2.5rem;
    height: 2.5rem;
    background: #D9D9D9;
    border-radius: 50%;
    margin: 0 auto;
  }
`
const Box = styled.div`

`