import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Header from "../components/public/Header";

import { ReactComponent as PiggyBank } from "../assets/icons/PiggyBank.svg";
import { ReactComponent as ConinHand } from "../assets/icons/CoinHand.svg";
import Hand from "../assets/img/Hand.png";

function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useLocation();
  // console.log(state, "state")
  const title = "티끌 모아 태산"

  const links = () => {
    if (localStorage.getItem('accessToken')) {
      console.log("로그인 상태!")
      navigate('/save')
    } else {
      console.log("로그인 필요 상태!")
      navigate('/login')
    }
  }

  return (
    <>
      <Header title={title} tColor={"#000000"} />
      <MainWrap>
        <section>
          <h1>
            내 소비를 이롭게<br />
            목표달성을 의미있게<br />
            <span>티끌</span>과 함께
          </h1>
        </section>
        <section className="bg">
          <PiggyBank />
          <h2>
            내가 생각 없이 쓴 작은 돈<br />
            이걸로 뭘 할 수 있지?<br /><br />
            이제껏 몰랐던,<br /><br />
            역저금통 서비스<br />
            <span>티끌</span>과 함께라면<br />
            의미 있는 아끼기 습관!
          </h2>
        </section>
        <section className="textLeft">
          <ConinHand />
          <div className="left">
            택시비를 안썼더라면...<br />
            고무줄을 안샀더라면...<br />
            카라멜마끼아또를 안먹었더라면...<br />
            배달을 시키지 않았더라면...
          </div>

          <Dot><div>.</div><div>.</div><div>.</div></Dot>
          <img src={Hand} alt="로고" />
          <strong>
            <span>티끌 모아 태산!</span><br />
            내가 이돈 참았으면<br />
            살 수 있습니다!
          </strong>
          <p onClick={links} className="btn">티끌 모으러 가보자!</p>
        </section>
        <footer>
          <a href="https://forms.gle/qYoVUmbNwkNz2m957" target="_blank" rel="noopener noreferrer">개발자&디자이너에게 한마디✉</a>
          <p>
            SERVICE OPEM DATE. 2022.07.27<br />
            ⓒ 항해 7기 나를가조  All Rights Reserved.
          </p>
        </footer>
      </MainWrap>
    </>
  )
}
export default Main;




const Dot = styled.div`
    width: 5px;
    margin: 20px auto 0;
    padding:0;
div{
  height: 10px;
  text-align: center;
}
`
const MainWrap = styled.div`
width: 100%;
text-align: center;
section,footer{
  width: 100%;
  padding: 30px 25px;
}
section>div.left{
  padding:15px 0 0;
  text-align: left;
}
section.bg{
  background: #26DFB3;
  color: #fff;
  span{
    color:#fff;
  font-family: 'SEBANG Gothic OTF';
  font-weight: 700;
  font-size: 22px;
line-height: 28px;
  }
}
section.textLeft{
  font-size: 21px;
  line-height: 29px;
  font-weight: 500;
span{
  width: 2px;
}
}

h1 {
  padding: 20px 0;
  font-weight: 700;
  font-size: 26px;
  line-height: 34px;
span{
  color: #26DFB3;
}
}
h2{
  font-size: 22px;
  line-height: 28px;
  color: #fff;
  margin-top: 15px;
}
img {
  margin: 50px auto 0;
  display: block;
}
strong{
  display: block;
  font-size : 31px;
  font-weight: 700;
  line-height: 34px;
  margin: 38px 0;

  span {
    font-family: 'SEBANG Gothic OTF';
    color: #26DFB3;
  }
}
// 버튼
.btn {
  width: 100%;
  background: #26DFB3;
  color: #fff;
  display: inline-block;
  border-radius: 2rem;
  font-size: 1.125rem;
  font-weight: 700;
  padding: 0.93rem 0;
  text-align: center;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
  margin-bottom: 60px;
  cursor: pointer;
}

footer {
  background: #EFEFEF;
  a{
    color: #26DFB3;
    font-weight: 700;
    border-bottom: 1px solid #26DFB3;
  }
  p{
    color: #999;
    font-size: 14px;
    line-height: 18px;
    margin-top: 30px;
  }
}


`