import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../public/Header";

import {closedChttingLogRS, myInfoData} from "../../store/modules/community"

function RoomDetail() {
  const  roomId  = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(loadChattingListRS());
   dispatch(closedChttingLogRS(roomId.closedRoomId));
   dispatch(myInfoData())
  }, [])


  const title = '쓸까?말까?'

  //const chatRef = useRef();
  const getMessages = useSelector((state) => state.community.closedChttingLog);
  const userInfo = useSelector((state)=>state.community.myInfo)

  console.log(userInfo)
  console.log(getMessages)


  console.log(getMessages.authorNickname)

  return (
    <ChatWrap>
      <Header title={title} />
      <Box />
      <ChatBox>
        <Chatting>


        </Chatting>
      </ChatBox>
      <Enter>

      </Enter>
    </ChatWrap>
  )
};


export default RoomDetail;

const ChatWrap = styled.div`
`
const ChatBox = styled.div`

`
const Chatting = styled.div`
background: #fff;
width: 100%;
padding:20px 25px; 

.left, .right {
  display: flex;
  margin-bottom: 12px; 

  .img{
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 5px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid green;
}
img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
  .info{
    position: relative;
  }
  span{
    font-size: 0.75rem;
    line-height: 1.25rem;
    color: #666;
  }
  p{
    border: 1px solid #26DFA6;
    padding: 10px;
    top:1.25rem;
    border-radius: 100px;
    font-size: 0.75rem;
    line-height: 0.93rem;
  }
}
.right {
  flex-direction: row-reverse;
  .img { display: none; }
  span { display: none; }
  p { background: #DDFFF5; }
}


`
const MyChat = styled.div`

`
const Enter = styled.div`

max-width: 390px;
width: 100%;

padding: 5px 25px;
height: 12vw;
border: none;
background-color: #333333;
display: flex;
/* justify-content: center; */
align-items: center; 
position: fixed;
bottom: 0;

input:placeholder{
  color:#fff;
}
`;

const Input = styled.input`
width: 100%;
height: 2.5rem;
border: 1px solid #A9FFE4;
border-radius: 20px;
background-color: transparent;
color: white;
margin: 0 auto;
padding: 4vw;
:focus{
    outline: none;
}
`


const PostBtn = styled.button`
position: absolute;
right:0;
height: 10vw;
padding-right: 35px;
border: none;
background-color: transparent;
color: white;
font-size: 0.75rem;
font-weight:700;
`;

const Box = styled.button`
width: 100%;

height:140px;
background:#333;

`;
