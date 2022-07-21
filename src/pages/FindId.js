import React, { useRef, useState } from "react";
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import FindidResult from "../components/login/FindIdResult";
import { useSelector } from "react-redux/es/exports";
import { findIdDB } from "../store/modules/user";
import Header from "../components/public/Header";


const FindId = () => {

  const dispatch = useDispatch();
  const state = useSelector((state) => state.user.findIdResult);


  const [findId, setFindId] = useState(false);

  const emailRef = useRef();

  const [userEmailAlert, setUserEmailAlert] = useState('');
  const emailCheckStr = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  const emailCheck = () => {
    const email = emailRef.current.value;

    console.log(email)
    if (emailCheckStr.test(email)) {
      setUserEmailAlert("통과:)")
    } else {
      setUserEmailAlert("이메일 형식을 맞춰주세요")
    }
  }


  // 버튼 클릭시 결과 컴포넌트 보이게
  const onResult = async (e) => {
    const email = emailRef.current.value;
    if (userEmailAlert === '통과:)') {
      console.log("다음!")
      await dispatch(findIdDB(email))
      setFindId(true)
    } else {
      setUserEmailAlert("이메일을 입력해주세요!")
    }
  }

  return (
    <>
      <Header />
      {!findId ?
        (
          <FindWrap>
            <div>
              <h2>아이디를 찾기 위해<br />정보를 입력해주세요</h2>
              <input type="text" placeholder="이메일" ref={emailRef} onChange={emailCheck} />
              <p>{userEmailAlert}</p>
            </div>
            <button onClick={onResult}>다음</button>
          </FindWrap>) :
        < FindidResult findIdResult={state} />
      }
    </>
  )
}

export default FindId;


const FindWrap = styled.div`
padding: 0 25px;
margin-top: 10rem;
position: relative;

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
  position: fixed;
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
