import React, { useRef, useState } from "react";
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux/es/exports";
import { useLocation, useParams } from "react-router-dom";
// import { changePw } from "../store/modules/user";
import { changePw } from "../store/modules/login";

import Header from "../components/public/Header";

function FindPwChange() {
  // const { token } = useParams();
  const location = useLocation();
  const sch = location.search;
  console.log(sch);
  const params = new URLSearchParams(sch);
  const accessToken = params.get('accessToken');
  console.log(accessToken);
  const username = params.get('username');
  console.log(username);
  // &username=eunjin0708
  // console.log('토큰 :', tokens, '아이디 :', username)

  localStorage.setItem("accessToken", accessToken);

  const dispatch = useDispatch();

  // dispatch(getUserId()); tokens
  const state = useSelector((state) => state.login);


  const [findPwPop, setfindPwPop] = useState(false);

  const pwRef = useRef();
  const pwCheckRef = useRef();

  const [userPwAlert, setUserPwAlert] = useState('');
  const [userPwAChecklert, setUserPwCheckAlert] = useState('');

  const pwCheckStr = /(?=.*\d)(?=.*?[#?!@$%^&*-])(?=.*[a-zA-ZS]).{8,}/;


  const pwCheck = () => {
    const pw = pwRef.current.value;

    console.log(pw)
    if (pwCheckStr.test(pw)) {
      setUserPwAlert("")
    } else {
      setUserPwAlert("영문, 숫자 1개이상, 특수문자 포함, 8자리 이상 입력해주세요.")
    }
  }

  const pwChecks = () => {
    const pw = pwRef.current.value;
    const pwCheck = pwCheckRef.current.value;

    if (pw === pwCheck) {
      setUserPwCheckAlert("")
    } else {
      setUserPwCheckAlert("두 비밀번호가 일치하지 않습니다")
    }
  }


  // 버튼 클릭시 결과 컴포넌트 보이게
  const pwCheckResult = async (e) => {
    const pw = pwRef.current.value;
    const checkPw = pwCheckRef.current.value;
    const findInfo = {
      username: username,
      password: pw,
      checkPassword: checkPw,
    }
    if (pw === '' || checkPw === '') {
      alert("비밀번호를 확인해주세요")
      return;
    }
    if (pw.search(/\s/) != -1) {
      setUserPwAlert("공백 없이 입력해주세요.");
      return;
    }
    if (pw !== checkPw) {
      alert("비밀번호를 확인해주세요");
      return;
    }
    if (userPwAlert === '' && userPwAChecklert === '') {
      console.log("다음!")
      await dispatch(changePw(findInfo))
      // setfindPwPop(true) // 디스패치 먼저 실행 후 결과 팝업 생성

    } else {
      alert("비밀번호를 확인해주세요")
    }
  }

  return (
    <>
      <Header />
      <FindWrap>
        <h2>새로운 비밀번호를<br />입력해주세요</h2>
        <form>
          <label htmlFor="userPw">
            <input type="password" id="userPw" placeholder="비밀번호" ref={pwRef} onChange={pwCheck} />
          </label>
          <p>{userPwAlert}</p>
          <label htmlFor="checkPassword">
            <input type="password" id="checkPassword" placeholder="비밀번호 변경" ref={pwCheckRef} onChange={pwChecks} />
          </label>
          <p>{userPwAChecklert}</p>
        </form>
        <button onClick={pwCheckResult}>로그인하기</button>
      </FindWrap>
      {findPwPop ? (
        <>팝업창</>
        // {state.result ?
        //   <div>
        //     팝업내용 {state.respMsg}성공
        //   </div>
        //   : <div>
        //     팝업내용 {state.respMsg}실패
        //   </div>
        // }
      ) : null
      }
    </>
  )
}

export default FindPwChange;


const FindWrap = styled.div`
padding: 0 25px;
margin-top: 10rem;

h2 {
  font-size:1.75rem;
  line-height: 2.31rem;
  margin-bottom: 20px;
}
input {
  border: none;
  border-bottom: 1px solid #ddd;
  font-size:1.25rem;
  padding: 20px 10px;
  width: 100%;
  margin-bottom: 5px;
}
input::placeholder{
  color: #ccc;
}
p{
  margin-top: 5px;
  color: #FF7272;
}
button{
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
