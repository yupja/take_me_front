import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getChatting, subMessage } from "../../store/modules/community";

function RoomDetail() {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const chatRef = useRef();
  const getMessages = useSelector((state) => state.chat);
  console.log(getMessages);



  const sock = new SockJS('http://3.35.52.157/chatting', null, { transports: ["websocket", "xhr-streaming", "xhr-polling"] });

  let client = Stomp.over(sock);

  let headers = { Authorization: localStorage.getItem('accessToken') };
  let token = localStorage.getItem('accessToken');

  useEffect(() => {
    // dispatch(getChatting(roomId))// 이전 채팅 목록 불러오기

    client.connect({ "token": token }, () => {
      client.subscribe(`/sub/chat/room/${roomId}`, (res) => { // 메세지 수신
        console.log(res)
        const newMessage = JSON.parse(res.body);
        console.log(newMessage);
        dispatch(subMessage(newMessage));
      });

      //여기서 구독한 유저 정보를 먼저 보내준다
      // client.send('/pub/chat/enter', {}, JSON.stringify({ roomId: roomId, writer: username }))

    })
  }, [])



  const myChat = (e) => {
    // setChat(chatRef.current.value)
    const msg = chatRef.current.value;

    client.send(`/pub/chat/message`, { "token": token }, JSON.stringify({ type: 'TALK', roomId: roomId, message: msg }))

    chatRef.current.value = null;
  }




  return (
    <ChatWrap>
      <ChatBox>
        <Chatting>
          {/* {getMessages.map((el, i) => (
            <div key={i}>
              <div className="img"><img src="https://mblogthumb-phinf.pstatic.net/MjAyMTAxMjJfNzMg/MDAxNjExMzIzMzU1NDgw.nhAuTdE8OjYs0wZAb8qpMAsUaUIZXeRKJ0zDLs5oaKIg.iONiFE4qhr5wuB2FwDe4yfO3oC9gBbOjDaCyGXxiLMkg.JPEG.sohyeon612/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%ED%8C%8C%EC%9D%BC%EF%BC%8D2.jpg?type=w800" alt="프로필" /></div>
              <span>닉네임</span>
              <p>{el.message}</p>
            </div>
          ))} */}
        </Chatting>
      </ChatBox>
      <Enter>
        <Input type="text" ref={chatRef}></Input>
        <PostBtn onClick={myChat}>게시</PostBtn>
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
div{
  width: 100%;
}
.img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}
img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
span {
  font-size: 12px;
  color: #666;
}
p{
  border: 1px solid #26DFA6;
  width: 90%;
  padding: 10px;
  border-radius: 100px !important;
}

`
const MyChat = styled.div`

`
const Enter = styled.div`
width: 100%;
height: 12vw;
border: none;
background-color: #333333;
display: flex;
/* justify-content: center; */
align-items: center; 
position: fixed;
bottom: 0;
`;

const Input = styled.input`
width: 90%;
height: 90%;
border: 1px solid #A9FFE4;
border-radius: 30vw;
background-color: transparent;
color: white;
margin: 0 auto;
padding: 4vw;
:focus{
    outline: none;
}
`

const PostBtn = styled.button`
width: 10vw;
height: 10vw;
border: none;
background-color: transparent;
color: white;
position: absolute;
float: left;
left: 83%;
`;
