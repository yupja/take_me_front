import React, { useRef, useState } from "react";
import styled from 'styled-components'
import { Link } from "react-router-dom";

import { ReactComponent as Key } from "../../assets/icons/Key.svg";


const FindidResult = (props) => {

  let providerStr = ""
  if (props.findIdResult?.provider === "kakao") {
    providerStr = "카카오";
  } else if (props.findIdResult?.provider === "google") {
    providerStr = "구글";
  } else {
    providerStr = "네이버";
  }

  return (
    <>
      <ResultWrap>
        <Cont>

          <div><Key /></div>
          {!props.findIdResult?.result ?
            <h2>회원가입<br />정보가 없습니다.</h2> :
            props.findIdResult.provider === "general" ?
              <h2>고객님의 아이디는<br /><span>{props.findIdResult.userFindId}</span>입니다.</h2> :
              <h2>고객님은<br /><span>{providerStr}</span> 가입 고객입니다.</h2>
          }
        </Cont>
        <Link to="/login" className="btn">로그인하기</Link>
      </ResultWrap>
    </>

  )
}

export default FindidResult;

const ResultWrap = styled.div`
text-align: center;

h2{
  margin-top: 65px;
  font-size:1.75rem;
  line-height: 2.31rem;
}
span{
  color: #26DFA6;
  font-size:1.75rem;
}
.btn{
  display: block;
  position: absolute;
  bottom: 6.25rem;
  left: 50%;
  transform: translateX(-50%);
  padding:15px 0;
  width: 90%;
  color: #fff;
  background: #26DFA6;
  border-radius: 32px;
  text-align: center;
}

`
const Cont = styled.div`
position: absolute;
top: 42%; left: 50%;
transform: translate(-50%,-50%);
width: 80%;


`

