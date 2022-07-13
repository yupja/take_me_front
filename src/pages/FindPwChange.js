import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { useParams } from "react-router-dom";
import { changePw } from "../redux/modules/user";
import { useLocation } from 'react-router-dom';

const FindPwChange = () => {
  const { token } = useParams();
  const [tokens, username] = token.split('&')
  // console.log('토큰 :', tokens, '아이디 :', username)


  const dispatch = useDispatch();

  // dispatch(getUserId()); tokens
  const state = useSelector((state) => state.user);



  const [findPwPop, setfindPwPop] = useState(false);

  const pwRef = useRef();
  const pwCheckRef = useRef();

  const [userPwAlert, setUserPwAlert] = useState('');
  const [userPwAChecklert, setUserPwCheckAlert] = useState('');

  const pwCheckStr = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/;


  const pwCheck = () => {
    const pw = pwRef.current.value;

    console.log(pw)
    if (pwCheckStr.test(pw)) {
      setUserPwAlert("")
    } else {
      setUserPwAlert("영문, 숫자, 특수문자를 최소 1개씩 혼합하여 입력해주세요")
    }
  }

  const pwChecks = () => {
    const pw = pwRef.current.value;
    const pwCheck = pwCheckRef.current.value;

    if (pw === pwCheck) {
      setUserPwCheckAlert("")
    } else {
      setUserPwCheckAlert("비밀번호가 일치하지 않습니다")
    }
  }


  // 버튼 클릭시 결과 컴포넌트 보이게
  const pwCheckResult = async (e) => {
    const pw = pwRef.current.value;
    const checkPw = pwCheckRef.current.value;
    const findInfo = {
      username: username, // url에서 가져오기
      password: pw,
      checkPassword: checkPw,
    }
    if (pw === '' || checkPw === '') {
      alert("비밀번호를 확인해주세요")
      return;
    }
    if (userPwAlert === '' && userPwAChecklert === '') {
      console.log("다음!")
      await dispatch(changePw(findInfo, tokens))
      setfindPwPop(true) // 디스패치 먼저 실행 후 결과 팝업 생성
    } else {
      alert("비밀번호를 확인해주세요")
    }
  }

  return (
    <>
      <h2>새로운 비밀번호를<br />입력해주세요</h2>
      <form>
        <label htmlFor="userPw">
          <input type="password" id="userPw" placeholder="비밀번호를 입력해주세요" ref={pwRef} onChange={pwCheck} />
        </label>
        <p>{userPwAlert}</p>
        <label htmlFor="checkPassword">
          <input type="password" id="checkPassword" placeholder="비밀번호를 다시 입력해주세요" ref={pwCheckRef} onChange={pwChecks} />
        </label>
        <p>{userPwAChecklert}</p>
      </form>
      <button onClick={pwCheckResult}>로그인하기</button>
      {state.result ?
        <div>
          팝업내용 {state.respMsg}성공
        </div>
        : <div>
          팝업내용 {state.respMsg}실패
        </div>
      }
    </>
  )
}

export default FindPwChange;
