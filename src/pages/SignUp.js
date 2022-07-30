import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Header from "../components/public/Header";
import { emailCheckDB, idCheckDB, nickCheckDB, addUserDB } from "../store/modules/user";

function SignUp(e) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const title = "회원가입";
  const signupUrl = window.location.href


  // 회원가입 정보 가져오기
  const emailRef = useRef();
  const idRef = useRef();
  const nickRef = useRef();
  const pwRef = useRef();
  const pwCheckRef = useRef();

  const emailCheckStr = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const idCheckStr = /^(?=.*[a-z])(?=.*\d)[a-z\d]{3,10}$/;
  const nickCheckStr = /^[a-zA-Zㄱ-힣0-9-_.]{2,12}$/;
  const pwCheckStr = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/;


  // 유효성 알림
  const [userIdAlert, setUserIdAlert] = useState('');
  const [userPwAlert, setUserPwAlert] = useState('');
  const [userPwAChecklert, setUserPwCheckAlert] = useState('');
  const [userEmailAlert, setUserEmailAlert] = useState('');
  const [userNickAlert, setUserNickAlert] = useState('');

  // 유효성 알림
  const [idColor, setIdColor] = useState(null);
  const [pwColor, setPwColor] = useState('');
  const [pwCheckColor, setPwCheckColor] = useState('');
  const [emailColor, setEmailColor] = useState('');
  const [nickColor, setNickColor] = useState('');

  // // 중복체크 전 유효성 확인
  const [emailStrCheck, setemailStrCheck] = useState(true);
  const [idStrCheck, setidStrCheck] = useState(true);
  const [nickStrCheck, setnickStrCheck] = useState(true);

  // 이용약관 동의
  const [oneChecked, setOneChecked] = useState(false);
  const [twoChecked, setTwoChecked] = useState(false);

  const oneCheck = (e) => {
    setOneChecked(current => !current);
  }
  const twoCheck = (e) => {
    setTwoChecked(current => !current);
  }

  //팝업창
  const [navToggles, setNavToggles] = useState(false);
  const [ModalStr, setModalStr] = useState('');
  const [resultAlert, setResultAlert] = useState("");

  const closeNav = (e) => {
    setNavToggles(false);
    setResultAlert("");
  }



  //************** 형식 체크 **************//
  // 이메일
  const onEmailChange = () => {
    const email = emailRef.current.value;
    if (emailCheckStr.test(email)) {
      setUserEmailAlert("");
      setemailStrCheck(false);
      setEmailColor(null);
    } else {
      setUserEmailAlert("🚨 이메일 형식으로 작성해주세요.")
      setemailStrCheck(true);
      setEmailColor('red');
      if (email === '') {
        setUserEmailAlert('')
        setEmailColor(null);
      }
    }
  }

  // 아이디
  const onIdChange = () => {
    const id = idRef.current.value;
    if (idCheckStr.test(id)) {
      setUserIdAlert("");
      setidStrCheck(false);
      setIdColor(null);
    } else {
      setUserIdAlert("🚨 3~10글자,영문,숫자로 작성해주세요.")
      setidStrCheck(true);
      setIdColor('red');
      if (id === '') {
        setUserIdAlert('')
        setIdColor(null);
      }
    }
  }


  // 닉네임
  const onNickChange = () => {
    const nick = nickRef.current.value;
    if (nickCheckStr.test(nick)) {
      setUserNickAlert("");
      setnickStrCheck(false);
      setNickColor(null)
    } else {
      setUserNickAlert("🚨 2~12글자, 특수문자를 제외하고 작성해주세요.")
      setnickStrCheck(true);
      setNickColor('red')
      if (nick === '') {
        setUserNickAlert('')
        setNickColor(null);
      }
    }
  }


  // 비밀번호
  const onPwChange = () => {
    const pw = pwRef.current.value;
    console.log(pw);
    if (pwCheckStr.test(pw)) {
      if (pw.search(/\s/) != -1) {
        setUserPwAlert("공백 없이 입력해주세요.");
        setPwColor('red');
      } else {
        setUserPwAlert("");
        setPwColor(null);
      }
    } else {
      setUserPwAlert("🚨 비밀번호는 영대문자, 소문자, 숫자, 특수문자를 포함해 총 8글자 이상이어야 합니다.");
      setPwColor('red');
      if (pw === '') {
        setUserPwAlert('')
        setPwColor(null);
      }
    }
  }


  // 비밀번호 확인
  const onPwCheckChange = () => {
    const pw = pwRef.current.value;
    const pwCheck = pwCheckRef.current.value;
    if (pwCheck === pw) {
      setUserPwCheckAlert("");
      setPwCheckColor(null);
    } else {
      setUserPwCheckAlert("🚨두 비밀번호가 일치하지 않습니다.")
      setPwCheckColor('red');
      if (pwCheck === '') {
        setUserPwCheckAlert('')
        setPwCheckColor(null);
      }
    }
  }


  //************** 중복체크 **************//
  // 아이디
  const idCheck = (e) => {
    e.preventDefault();
    const id = idRef.current.value;
    if (userIdAlert.includes(""))
      dispatch(idCheckDB(id, setUserIdAlert, setIdColor))
  }
  // 이메일
  const emailCheck = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    dispatch(emailCheckDB(email, setUserEmailAlert, setEmailColor))
  }
  // 닉네임
  const nickCheck = (e) => {
    e.preventDefault();
    const nick = nickRef.current.value;
    dispatch(nickCheckDB(nick, setUserNickAlert, setNickColor))
  }


  // 회원가입
  const signup = async () => {
    const userId = idRef.current.value;
    const userEmail = emailRef.current.value;
    const userNick = nickRef.current.value;
    const userPw = pwRef.current.value;
    const userPwCheck = pwCheckRef.current.value;
    console.log(userPw, userPwCheck)

    // 유효성 검사
    if (userEmail === "" || userId === '' || userNick === "" || userPw === "" || userPwCheck === "") {
      setResultAlert("모든 항목은 필수입니다😊");
      setNavToggles(true);
      return;
    }
    if (!userIdAlert.includes('사용 가능한') || userIdAlert === '') {
      setResultAlert("아이디 중복체크 해주세요");
      setNavToggles(true);
      idRef.current.focus();
      return;
    }
    if (userPw !== userPwCheck || userPwAlert.includes('8')) {
      setResultAlert("비밀번호 형식과 일치여부를 확인해주세요");
      setNavToggles(true);
      pwRef.current.focus();
      return;
    }
    if (!userEmailAlert.includes('사용 가능한') || userEmailAlert === '') {
      setResultAlert("이메일 중복체크 해주세요");
      setNavToggles(true);
      emailRef.current.focus();
      return;
    }
    if (!userNickAlert.includes('사용 가능한') || userNickAlert === '') {
      setResultAlert("닉네임 중복체크 해주세요");
      setNavToggles(true);
      nickRef.current.focus();
      return;
    }
    if (!oneChecked) {
      setResultAlert("이용약관 동의가 필요합니다😊");
      setNavToggles(true);
      return;
    }
    if (!twoChecked) {
      setResultAlert("개인정보 수집 및 활용 동의가 필요합니다😊");
      setNavToggles(true);
      return;
    }

    const userInfo = {
      username: userId,
      email: userEmail,
      nickname: userNick,
      password: userPw,
      Checkpassword: userPwCheck,
    }

    dispatch(addUserDB(userInfo, signupUrl, navigate));
  }






  return (
    <>
      <div className="topWrap">
        <Header title={title} />
      </div>
      <SignWrap>
        <Title><span>티끌</span>회원가입을 위해<br />정보를 입력해 주세요.</Title>
        <Form idStr={idColor} pwStr={pwColor} pwCheckStr={pwCheckColor} emailStr={emailColor} nickStr={nickColor}>
          <label htmlFor="userId">
            <div>
              <input
                type="text"
                id="userId"
                placeholder="아이디"
                ref={idRef}
                onChange={onIdChange} />
              <CheckBtn onClick={idCheck} disabled={idStrCheck}>중복체크</CheckBtn>
            </div>
            <p className="idResult">{userIdAlert}</p>
          </label>

          <label htmlFor="userPw">
            <input
              type="password"
              id="userPw"
              placeholder="비밀번호"
              ref={pwRef}
              onChange={onPwChange} />
            <p className="pwResult">{userPwAlert}</p>
          </label>

          <label htmlFor="checkPassword">
            <input
              type="password"
              id="checkPassword"
              placeholder="비밀번호 확인"
              ref={pwCheckRef}
              onChange={onPwCheckChange} />
            <p className="pwCheckResult">{userPwAChecklert}</p>
          </label>

          <label htmlFor="userEmail">
            <div>
              <input
                type="text"
                id="userEmail"
                placeholder="이메일"
                ref={emailRef}
                onChange={onEmailChange} />
              <CheckBtn onClick={emailCheck} disabled={emailStrCheck}>중복체크</CheckBtn>
            </div>
            <p className="emailResult">{userEmailAlert}</p>
          </label>

          <label htmlFor="userNick">
            <div>
              <input
                type="text"
                id="userNick"
                placeholder="닉네임"
                ref={nickRef}
                onChange={onNickChange} />
              <CheckBtn onClick={nickCheck} disabled={nickStrCheck}>중복체크</CheckBtn>
            </div>
            <p className="nickResult">{userNickAlert}</p>
          </label>
          <InfoCheck>
            <label>
              <div>
                <input
                  type="checkbox"
                  name="info"
                  value="서비스 약관"
                  onChange={oneCheck}
                />
                <span>이용약관 동의</span>
              </div>
              <button>내용보기</button>
            </label>
            <label>
              <div>
                <input
                  type="checkbox"
                  name="info"
                  value="개인정보"
                  onChange={twoCheck}
                />
                <span>개인정보 수집 및 활용 동의</span>
              </div>
              <button>내용보기</button>
            </label>
          </InfoCheck>
          <InputBtn type="button" onClick={signup}>가입 하기</InputBtn>
        </Form>
      </SignWrap>
      {navToggles ?
        <ModalWrap>
          <ModalBox>
            <h1>가입하기</h1>
            <CloseBtn onClick={closeNav}>
              <span></span>
              <span></span>
            </CloseBtn>
            <div className="cont">
              {resultAlert}
            </div>
            <button className="change" onClick={closeNav}>닫기</button>
          </ModalBox>
        </ModalWrap>
        : null
      }
    </>
  )
};

export default SignUp;


const SignWrap = styled.div`
width: 100%;
padding: 0 25px;
`

const Title = styled.h1`
margin: 30px 0 25px;
font-size: 1.75rem;
line-height: 2.31rem;
font-weight:500;
letter-spacing: -0.05em;
span{
  font-family: 'Cafe24Ohsquare';
  font-weight: 700;
  font-size: 2rem;
  color: #26DFA6;
  padding-right: 5px;
}
`

const Form = styled.form`
width: 100%;
margin: 20px auto 0;

label{
  position: relative;
  display: block;
  text-align: left;
}
label>div {
  position: relative;
}
p{
  font-size: 0.87rem;
  line-height: 17px;
  letter-spacing: -0.02em;
}
input {
  outline: none;
  width:100%;
  background:#fff;
  border: none;
  padding: 16px 10px;
  font-size: 1.25rem;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
  border-radius: 2px;
}
input#user_id {
  width: 70%;
}
input::placeholder {
  color: #ccc;
}

// 유효성 검사 결과 텍스트 색상
p.idResult {
  color: ${props => props.idStr || '#FF7272'};
  padding: ${props => props.idStr && "5px 0 0 10px"};
}
#userId ~ button {
  color: ${props => props.idStr === '#26DFA6' ? "#ccc" : "#999"};
}

p.pwResult {
  color: ${props => props.pwStr || '#FF7272'};
  padding: ${props => props.pwStr && "5px 0 0 10px"};
}
p.pwCheckResult {
  color: ${props => props.pwCheckStr || '#FF7272'};
  padding: ${props => props.pwCheckStr && "5px 0 0 10px"};
}

p.emailResult {
  color: ${props => props.emailStr || '#FF7272'};
  padding: ${props => props.emailStr && "5px 0 0 10px"};
}
#userEmail ~ button {
  color: ${props => props.emailStr === '#26DFA6' ? "#ccc" : "#999"};
}

p.nickResult {
  color: ${props => props.nickStr || '#FF7272'};
  padding: ${props => props.nickStr && "5px 0 0 10px"};
}
#userNick ~ button {
  color: ${props => props.nickStr === '#26DFA6' ? "#ccc" : "#999"};
}


`;

const InfoCheck = styled.div`
margin: 20px 10px;

div {
  display: flex;
  align-items: center;
}
 input {
  width: 16px;
  height: 16px;
  margin-right: 5px;
 }
 label {
  display:flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #666;
  margin-bottom : 14px;
 }
 span {
  padding: 0 0 3px; 
 }
 button {
  color:#26DFB3;
 }
`;

const InputBtn = styled.button`
  display: block;
  width: 100%;
  padding: 16px 10px;
  margin-top: 30px;
  background: #26DFA6;
  border: none;
  border-radius: 32px;
  color:#fff;
  font-size: 18px;
  cursor: pointer;
`;

const CheckBtn = styled.button`
  position: absolute;
  top: 50%; right: 3%;
  transform: translateY(-50%);
  border: 1px solid #D8D8D8;
  padding: 5px 10px;
  background: #fff;
  color: #999999;
  font-size: 0.87rem;
  border-radius: 60px;
  
`;

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
height: 11.5rem;
background: #fff;
border-radius: 5px;
overflow: hidden;
text-align : center;

h1 {
  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;
  line-height:62px;
}
 h3 {
  font-size: 1.5rem;
  padding: 20px 0;
  white-space: pre-wrap;
 }
 div.cont{
  position: relative;
  margin: 0 10px;
  padding: 15px 0;
  border-bottom : 1px solid #ddd;
  button{
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 4.43rem;
    text-align: center;
    color: #999;
    padding: 3px 5px;
    font-weight: 500;
    font-size: 0.875rem;
    border: 1px solid #dbdbdb;
    border-radius: 3.12rem;
  }
 }
 input {
  width: 75%;
  background : none;
  border: none;
  text-align: center;
 }
 input:focus{
  outline:none;
 }
 button.change {
  font-size:0.93rem;
  font-weight: 700;
  color: #fff;
  width: 100%;
  background: #26DFA6;
  padding: 16px 0;
  position: absolute;
  bottom: 0; left: 0;
 }
`

const CloseBtn = styled.div`
width:15px;
height: 15px;
position:absolute;
top: 13px; right: 5%;

span {
  display:block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width:100%;
  height:1px;
  background-color: #999999;
}
span:first-child{
  transform: rotate(45deg) translateX(0%);
  }
span:last-child{
  transform: rotate(135deg) translateX(0%);
  }
`;
