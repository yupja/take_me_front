import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";


import Header from "../components/public/Header";
import { useDispatch, useSelector } from "react-redux";
import { getInfo, infoUpdate } from "../store/modules/info";
import { ReactComponent as Edit } from "../assets/icons/EditMint.svg";
import { useCookies } from "react-cookie";

import { emailCheckDB } from "../store/modules/user";
import { nickCheckDB } from "../store/modules/user";

function Proflie() {
  const dispatch = useDispatch();
  const title = '프로필 편집'
  const infoState = useSelector((state) => state.info.infoList);


  useEffect(() => {
    dispatch(getInfo());
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
    const emailCheckStr = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    console.log("검사시작!")
    const email = emailRef.current.value;
    if (emailCheckStr.test(email)) {
      console.log("검사통과")
      dispatch(emailCheckDB(email, setResultAlert))
      setOnToggle(false);
      setFocus(true);
      console.log(onToggle, focus);
    } else {
      setResultAlert("🚨이메일 형식으로 적어주세요")
    }
  }

  // 로그아웃
  const logout = (e) => {
    localStorage.clear();
    removeCookie('refreshToken', { path: '/' });
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



  return (
    <>
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
          <input type="text" className="word" ref={introDescRef} defaultValue={
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
            <input type="text" className="email" defaultValue={email} disabled={focus} ref={emailRef} />
            <p className="result">{resultAlert}</p>
            <div className="editBtn" onClick={active}>
              {onToggle === true ? <button onClick={emailCheck}>중복체크</button> : <Edit />}
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
height: 95vh;
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
  background: none;
  border: none;
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
