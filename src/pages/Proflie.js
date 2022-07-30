import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";


import Header from "../components/public/Header";
import { useDispatch, useSelector } from "react-redux";
import { getInfo, infoUpdate } from "../store/modules/info";
import { ReactComponent as Edit } from "../assets/icons/EditMint.svg";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { emailCheckDB } from "../store/modules/user";
import { nickCheckDB } from "../store/modules/user";

function Proflie() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const title = '프로필 편집'
  const infoState = useSelector((state) => state.info.infoList);


  useEffect(() => {
    dispatch(getInfo());
    if (!localStorage.getItem("accessToken")) {
      navigate("/main")
    }
  }, [dispatch])


  const introDescRef = useRef(null);
  const nickRef = useRef();
  // const fileRef = useRef();

  const [image, setImage] = useState('');
  const [previewImg, setPreviewImg] = useState('');
  const [email, setEmail] = useState('');


  useEffect(() => {
    setImage(infoState.profileImg)
    setEmail(infoState.email)
    setPreviewImg(infoState.profileImg)
  }, [infoState])

  //소셜 아이디 확인
  const idCheck = () => {
    if (infoState.username?.includes('google')) {
      return 'google 회원';
    }
    if (infoState.username?.includes('kakao')) {
      return 'kakao 회원';
    }
    return infoState.username
  }


  // 이미지 업로드
  const imageUpLoad = async (e) => {
    imagePreview(e.target.files[0]);
    setPreviewImg(e.target.files[0]);
  }


  const infoChange = (e) => {
    const introDesc = introDescRef.current.value;
    const nick = nickRef.current.value;

    const formData = new FormData();
    console.log(introDesc);
    formData.append('image', previewImg);

    const changeInfo = {
      introDesc: introDesc, // 미작성시 그대로 저장!
      nickname: nick,
      email: email,
    }
    const json = JSON.stringify(changeInfo);
    const blob = new Blob([json], { type: "application/json" });
    formData.append('changeInfo', blob);

    console.log(changeInfo);

    dispatch(infoUpdate(formData));

  }

  const [, , removeCookie] = useCookies(['refreshToken']);


  // 미리보기
  const imagePreview = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage(reader.result);
        resolve();
      }
    })
  }

  // 이메일 중복체크 / 토클
  const emailRef = useRef();
  const [userNickAlert, setUserNickAlert] = useState('');

  const [onToggle, setOnToggle] = useState(false);
  const [focus, setFocus] = useState(true);
  const [checkEmail, setCheckEmail] = useState("disabled");
  const [resultAlert, setResultAlert] = useState("");
  const [userIdAlert, setUserIdAlert] = useState("disabled");

  const active = (e) => {

    setOnToggle(true);
    setFocus(false);
    console.log("실행!")

  }

  const emailCheck = (e) => {
    const emailText = emailRef.current.value;
    const emailCheckStr = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (emailCheckStr.test(emailText)) {
      dispatch(emailCheckDB(emailText, setResultAlert))
    } else {
      setResultAlert("🚨이메일 형식으로 적어주세요")
    }
  }

  // 로그아웃
  const logout = (e) => {
    localStorage.clear();
    removeCookie('refreshToken', { path: '/' });
    navigate('/login')
  }
  // 닉네임 중복검사
  // const onNickChange = () => {
  //   const nick = nickRef.current.value;
  //   if (nickCheckStr.test(nick)) {
  //     setUserNickAlert("")
  //   } else {
  //     setUserNickAlert("🚨 2~12글자, 특수문자를 제외하고 작성해주세요.")
  //     // 한글, 영문, 특수문자 (- _ .) 포함한 2 ~ 12글자 닉네임
  //   }
  // }
  const nickCheckStr = /^[a-zA-Zㄱ-힣0-9-_.]{2,12}$/;

  const nickCheck = (e) => {
    e.preventDefault();
    const nick = nickRef.current.value;
    if (nickCheckStr.test(nick)) {
      dispatch(nickCheckDB(nick, setUserNickAlert))
    } else {
      alert("2~12글자, 특수문자를 제외하고 작성해주세요.")
      // 한글, 영문, 특수문자 (- _ .) 포함한 2 ~ 12글자 닉네임
    }
  }

  // 이메일 중복검사 팝업

  const [navToggles, setNavToggles] = useState(false);
  const [ModalStr, setModalStr] = useState('');


  const closeNav = (e) => {
    setNavToggles(false);
    setResultAlert("");
  }

  const changeEmail = (e) => {
    e.preventDefault();
    const emailText = emailRef.current.value;
    if (resultAlert.includes("사용")) {
      setEmail(emailText);
      console.log(emailText)
      setNavToggles(false);
    } else {
      setResultAlert("중복체크를 확인해주세요!")
    }
  }


  const emailEdit = (e) => {
    e.preventDefault();
    setNavToggles(true)
  }




  return (
    <>
      {navToggles ?
        <ModalWrap>
          <ModalBox>
            <h1>이메일 변경</h1>
            <CloseBtn onClick={closeNav}>
              <span></span>
              <span></span>
            </CloseBtn>
            <div className="cont">
              <input type="text" defaultValue={email} ref={emailRef} onChange={() => { setResultAlert('') }} />
              <button onClick={emailCheck}>중복체크</button>
            </div>
            {resultAlert}
            <button className="change" onClick={changeEmail}>변경하기</button>
          </ModalBox>
        </ModalWrap>
        : null
      }
      <Header title={title} />
      <ProflieWrap>
        <MyInfo>
          <ProflieImg>
            <div><img src={image} alt="" /></div>
            <label htmlFor="file">
              <Edit />
            </label>
            <input type="file" id="file" className="icon"
              onChange={imageUpLoad}
              multiple="multiple"
              accept=".jpg, .png, image/jpeg, .svg" />
          </ProflieImg>
          <Nick>
            <div>
              <input type="textarea" defaultValue={infoState.nickname} ref={nickRef} />
              <button onClick={nickCheck}>중복체크</button>
              {userNickAlert}
            </div>
            <span className="box"> 님</span>
          </Nick>
          <input type="text" className="word" maxLength="32" ref={introDescRef} defaultValue={
            infoState.introDesc === null ?
              "기본 소개글" : infoState.introDesc
          }>
          </input>
        </MyInfo>
        <SubInfo>
          <div>
            <span>아이디</span>
            <p>{idCheck()}</p>
          </div>
          <div>
            <span>이메일</span>
            <h2 className="email">{email}</h2>
            <div className="editBtn" onClick={active}>
              <Edit onClick={emailEdit} />
            </div>
          </div>
        </SubInfo>
        <Btn>
          <EditBtn onClick={infoChange}>적용하기</EditBtn>
          <LoginOutBtn onClick={logout}>로그아웃</LoginOutBtn>

        </Btn>
      </ProflieWrap>
    </>
  )
};


export default Proflie;

const ProflieWrap = styled.div`
width: 100%;
height: 95.6%;;
/* padding: 0 25px; */
text-align: left;
background : #F8F8F8;
`

const MyInfo = styled.div`
width: 100%;
height: 19.6rem;
padding: 10px;
text-align: center;
background: #fff;
padding: 20px 25px;

.word {
  padding: 10px;
  font-size: 0.87rem;
  color: #26DFA6;
  line-height: 1.12rem;
  font-weight: 700;
  border: 1px solid #ccc;
  border-radius : 5px;
  width: 100%;
  letter-spacing: -0.15px;
  font-weight: 500;
  font-family: 'Noto Sans KR', sans-serif;
}
input:focus {
  outline: #ccc;
}
`

const Nick = styled.div`
font-weight: bold;
font-size: 1.5rem;
margin: 10px 0px;
div {
  color:#26DFA6;
  display: inline;
  position: relative;
}
.box{
  display: inline;
}
input{
  border: 1px solid #ccc;
  background: #fff;
  color: #26DFA6;
  width: 91%;
  font-weight: 700;
  font-size:1.365rem;
  padding-left: 15px;
  border-radius: 2.43rem;
}
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
`

const ProflieImg = styled.div`
  position: relative;
  width: 10.6rem;
  height: 10.6rem;
  background: #d9d9d9;
  margin: auto;
  border-radius: 50%;
  div {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    overflow: hidden;
  }
  label {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background: #666;
    width: 2.5rem;
    height: 2.5rem;
  }
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .icon{
    position: absolute;
    right: 0; bottom:0;
    border-radius: 50%;
    background: #666;
  }
  input[type="file"] {
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
}
`

const SubInfo = styled.div`
padding: 30px 25px; 
text-align: left;

div {
  position: relative;
  margin-bottom: 20px;
}
span {
  font-size: 1rem;
}
p{
  display: inline-block;
  padding-left: 20px;
  font-weight: 700;
}

div.editBtn{
  position: absolute;
  right: 0; top: 5%;

  path {
    fill: #333;
  }
}
.email{
  display: inline-block;
  margin-left : 20px;
  font-weight: 700;
  font-size: 1rem;
  color: #000;
}
  .result {
  display: inline-block;
  padding-left: 66px;
}
`

const Btn = styled.div`
padding: 0 25px;
position: absolute;
bottom: 40px; left: 50%;
transform: translateX(-50%);
width: 100%;
text-align: center;
`
const EditBtn = styled.button`
/* position: absolute;
bottom: 80px; left: 50%;
transform: translateX(-50%); */
color: #fff;
border: none;
background: #26DFA6;
font-size: 0.93rem;
font-weight: 700;
height: 50px;
line-height: 50px;;
border-radius: 32px;
width: 100%;
`
const LoginOutBtn = styled.button`
text-decoration: underline;
color: #999;
letter-spacing: 0.03px;
border: none;
background: none;
font-size: 1.12rem;
font-weight: 700;
padding: 22px 0;

`


// 모달
const ModalWrap = styled.div`
width: 100%;
height: 100vh;
padding: 0 25px;
position: fixed;
top: 0; left: 0;
background: rgba(0,0,0,0.7);
z-index: 999;
`
const ModalBox = styled.div`
position: absolute;
top: 50%; left: 50%;
transform: translate(-50%,-50%);
width: 90%;
height: 12.12rem;
background: #fff;
border-radius: 5px;
overflow: hidden;

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
