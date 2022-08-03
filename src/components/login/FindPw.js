import React, { useRef, useState } from "react";
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { findPwDB } from "../../store/modules/login";
import { useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import Header from "../public/Header";
import { ReactComponent as Check } from "../../assets/icons/Check.svg";


const FindPw = () => {

  const title = "비밀번호 찾기"

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.user);

  const [findPwPop, setfindPwPop] = useState(false);
  const [resultPop, setResultPop] = useState(false);


  const emailRef = useRef();
  const idRef = useRef();

  const [str, setStr] = useState('');
  const [userIdAlert, setUserIdAlert] = useState('');
  const [userEmailAlert, setUserEmailAlert] = useState('');

  const emailCheckStr = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const idCheckStr = /^[a-z0-9_-]{3,10}$/;

  const emailCheck = (e) => {
    const email = emailRef.current.value;

    if (emailCheckStr.test(email)) {
      setUserEmailAlert("통과:)")
    } else {
      setUserEmailAlert("이메일 형식을 확인해주세요")
    }
  }


  const idCheck = (e) => {
    const id = idRef.current.value;

    console.log(id)
    if (idCheckStr.test(id)) {
      setUserIdAlert("통과")
    } else {
      setUserIdAlert("아이디 형식을 맞춰주세요")
    }
  }


  // 버튼 클릭시 결과
  const onResult = async () => {
    const id = idRef.current.value;
    const email = emailRef.current.value;

    const findInfo = {
      username: id,
      email: email,
    }
    if (userEmailAlert === '통과:)' && userIdAlert === '통과') {
      await dispatch(findPwDB(findInfo, setfindPwPop, setStr))
      // setfindPwPop(true) // 디스패치 먼저 실행 후 결과 팝업 생성
    } else {
      setStr("아이디와 이메일을\n확인해주세요")
      setResultPop(true)
    }
  }

  return (
    <>
      <Header title={title} />
      <FindWrap>
        <h2>비밀번호를 찾기 위해<br />정보를 입력해주세요</h2>
        <input type="text" placeholder="아이디" ref={idRef} onChange={idCheck} />
        <p>{userIdAlert}</p>
        <input type="text" placeholder="이메일" ref={emailRef} onChange={emailCheck} />
        <p>{userEmailAlert}</p>
        <button onClick={onResult}>다음</button>
      </FindWrap>

      {findPwPop ? (
        <>
          <ModalWrap>
            <ModalBox>
              <div className="icon"><Check /></div>
              <CloseBtn onClick={() => navigate('/login')}>
                <span></span>
                <span></span>
              </CloseBtn>
              <h3>{str}</h3>
              <button onClick={() => navigate('/login')}>확인</button>
            </ModalBox>
          </ModalWrap>
        </>
      ) : null
      }
      {resultPop ? (
        <>
          <ModalWrap>
            <ModalBox>
              <div className="icon"><Check /></div>
              <CloseBtn onClick={() => setResultPop(false)}>
                <span></span>
                <span></span>
              </CloseBtn>
              <h3 className="result">{str}</h3>
              <button onClick={() => setResultPop(false)}>확인</button>
            </ModalBox>
          </ModalWrap>
        </>
      ) : null
      }
    </>
  )
}

export default FindPw;


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


// 모달
const ModalWrap = styled.div`
width: 100%;
height: 100%;
padding: 0 25px;
position: absolute;
top: 0; left: 0;
background: rgba(0,0,0,0.7);
z-index: 999;
`
const ModalBox = styled.div`
position: absolute;
top: 50%; left: 50%;
transform: translate(-50%,-50%);
width: 90%;
background: #fff;
border-radius: 5px;
text-align: center;

.icon {
  width: 2.5rem;
  height: 2.5rem;
  margin:  10px auto 0;
  svg {
    width: 40px;
    height: 40px;
  }
  path {
    fill:#26DFA6;
  }
}
 h3 {
  font-size: 1.5rem;
  padding: 30px 0;
  white-space: pre-wrap;
 }
 .result{
  line-height: 1.8rem;
 }
 button {
  font-size:0.93rem;
  color: #fff;
  width: 100%;
  background: #26DFA6;
  padding: 15px 0;
  bottom: 0; left: 0;
 }
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