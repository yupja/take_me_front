import React, { useRef, useState } from "react";
import styled from 'styled-components'
import { Link } from "react-router-dom";


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
      <div><img src="" alt="" /></div>
      {
        !props.findIdResult?.result ?
          <h2>회원가입 정보가 없습니다.</h2> :
          props.findIdResult.provider === "general" ?
            <h2>고객님의 아이디는 {props.findIdResult.userFindId}입니다.</h2> :
            <h2>고객님은 {providerStr} 가입 고객입니다.</h2>
      }
      <Link to="/login">로그인하기</Link>
    </>
  )
}

export default FindidResult;
