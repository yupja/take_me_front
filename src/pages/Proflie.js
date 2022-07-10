import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";


import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getInfo, infoUpdate } from "../redux/modules/info";

function Proflie() {
  const dispatch = useDispatch();
  const infoState = useSelector((state) => state.info.infoList);

  useEffect(() => {
    dispatch(getInfo())
    // console.log(infoState)
  }, [dispatch])


  const introDescRef = useRef(null);
  const nickRef = useRef();
  // const fileRef = useRef();

  console.log(infoState)
  const [image, setImage] = useState('');
  const [previewImg, setPreviewImg] = useState('');
  const [email, setEmail] = useState('');


  useEffect(() => {
    setImage(infoState.profileImg)
    setEmail(infoState.email)
    setPreviewImg(infoState.profileImg)
  }, [infoState])



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

  console.log(infoState.introDesc);



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


  return (
    <>
      <Header />
      <ProflieWrap>
        <MyInfo>
          <ProflieImg>
            <img src={image} alt="" />
            <label htmlFor="file">편집</label>
            <input type="file" id="file" className="icon"
              onChange={imageUpLoad}
              multiple="multiple"
              accept=".jpg, .png, image/jpeg, .svg" />
          </ProflieImg>
          <Nick><span>{infoState.nickname}</span>님</Nick>
          <Nick><input type="text" defaultValue={infoState.nickname} ref={nickRef} /> 님</Nick>
          <input type="text" className="word" ref={introDescRef} defaultValue={
            infoState.introDesc === null ?
              "기본 소개글" : infoState.introDesc
          }>
          </input>
          <SubInfo>
            <div>
              <span>아이디</span>
              <p>{infoState.username}</p>
            </div>
            <div>
              <span>이메일</span>
              <p>{email}</p>
              <button>변경</button>
            </div>
          </SubInfo>
        </MyInfo>
        <EditBtn onClick={infoChange}>적용하기</EditBtn>
        <LoginOutBtn >로그아웃</LoginOutBtn>
      </ProflieWrap>
    </>
  )
};


export default Proflie;

const ProflieWrap = styled.div`
width: 100%;
padding: 0 25px;
text-align: left;
`

const MyInfo = styled.div`
width: 100%;
padding: 10px;
text-align: center;

.word {
  padding: 10px;
  font-size: 0.87rem;
  color: #26DFA6;
  line-height: 1.12rem;
  font-weight: 700;
  border: 1px solid #ccc;
  border-radius : 5px;
}
`

const Nick = styled.h1`
font-size: 1.5rem;
margin: 15px 0 10px;
span {
  color:#26DFA6;
}
`

const ProflieImg = styled.div`
  position: relative;
  width: 10.6rem;
  height: 10.6rem;
  background: #d9d9d9;
  margin: auto;
  border-radius: 50%;
  label {
    position: absolute;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background: #666;
    width: 2.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
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
padding-top: 30px; 
text-align: left;

div {
}
span {
  font-size: 1rem;
}
p{
  display: inline-block;
  padding-left: 20px;
  font-weight: 600;
}

button{
  border: 1px solid #999;
  border-radius : 39px;
  padding: 5px 20px;
  color: #999999;
  background:none;
}
`

const EditBtn = styled.button`
position: absolute;
bottom: 80px; left: 50%;
transform: translateX(-50%);
color: #fff;
letter-spacing: -3px;
border: none;
background: #26DFA6;
font-size: 1.12rem;
font-weight: 700;
height: 50px;
line-height: 50px;;
border-radius: 32px;
width: 100%;
`
const LoginOutBtn = styled.button`
position: absolute;
bottom: 50px; left: 50%;
transform: translateX(-50%);
text-decoration: underline;
color: #999;
letter-spacing: -3px;
border: none;
background: none;
font-size: 1.12rem;
font-weight: 700;

`
