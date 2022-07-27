import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { createChatRoom } from "../../store/modules/community";

import { ReactComponent as Minus } from "../../assets/icons/Minus.svg";
import { ReactComponent as Plus } from "../../assets/icons/Plus.svg";
import { useNavigate } from "react-router-dom";


const CreateRoom = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comment = useRef();
  const [count, setCount] = useState(1);
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  const getChttingData = (index) => {
    if (comment.current.value === '') {
      comment.current.focus();
      return;
    }


    getTime();
    if(minutes===""){
    const sendData = {
        sender: props.nickname,
        profileImg: props.profileImg,
        authorNickname: props.nickname,
        authorProfileImg: props.profileImg,
        userCount: Number(0),
        comment: comment.current.value,
        timeLimit: count,
        minutes:minutes,
        seconds:seconds
  
      }
  
      dispatch(createChatRoom(sendData, navigate));}


  }


  const getTime = () => {
    const createTime = new Date();
    createTime.setMinutes(createTime.getMinutes() + count)
    const currentTime = new Date();
    let diff = (createTime - currentTime)
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    diff -= diffHours * (1000 * 60 * 60);
    let diffMin = Math.floor(diff / (1000 * 60));
    diff -= diffMin * (1000 * 60);
    const diffSec = Math.floor(diff / 100000);

    setMinutes(diffMin);
    setSeconds(diffSec);
  }



  return (
    <>
      <Wrap>
        <TimeLimit>
          <button onClick={() => { count > 1 && setCount(count - 1) }}><Minus /></button>
          {count} 분
          <button onClick={() => { count < 10 && setCount(count + 1) }}><Plus /></button>
        </TimeLimit>
        <textarea ref={comment} maxLength="79" />
      </Wrap>
      <Footer onClick={getChttingData}>공유하기</Footer>
    </>

  )
}



const Wrap = styled.div`
align-items: center;
padding: 1rem;
textarea {
  width: 100%;
    height: 6.5rem;
    line-height: 1.31rem;
    padding: 9px;
    border: 1px solid #ccc;
    border-radius : 5px;
    margin-top: 10px;
    resize: none;
    outline: #26DFA6;
} 
`;

const TimeLimit = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 19px;
margin: auto;
width: 9.125rem;
height: 3.75rem;
border: 1px solid #6a8eff;
border-radius: 3.68rem;
font-weight: 700;
font-size: 1.25rem;
color: #333;
text-align: center;
`;

const Footer = styled.button`
padding: 1rem;
width: 100%;
background: #26DFA6;
text-align: right;
color: white;
font-weight: bold;
display: flex;
justify-content: center;
`;

export default CreateRoom