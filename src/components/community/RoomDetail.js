import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { subMessage, delMessage } from "../../store/modules/community";
import Header from "../public/Header";
// import ChattingInfo from "./ChattingInfo";


function RoomDetail() {
  const { state } = useLocation();
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const getMessages = useSelector((state) => state.community.messages);

  console.log(getMessages)


  useEffect(() => {
    return (() => {
      dispatch(delMessage());
      disconnects();
    })
  }, []);


  // const list = [];
  // const lists = () => {
  //   list.push(getMessages)
  //   console.log(list)

  // }

  // const getChttingData =(index)=>{
  //   sendData ={
  //     roomId:RoomList[index].roomId,
  //     sender : userInfo.nickname,
  //     profileImg: userInfo.profileImg,
  //     authorNickname : RoomList[index].authorNickname,
  //     authorProfileImg : RoomList[index].authorProfileImg,
  //     userCount : RoomList[index].userCount,
  //     comment : RoomList[index].comment,
  //     createdAt:RoomList[index].createdAt,
  //     timeLimit:RoomList[index].timeLimit
  //   }

  const title = '쓸까?말까?'
  const chatRef = useRef();
  const scrollRef = useRef();



  const sock = new SockJS('http://43.200.4.1/chatting', null, { transports: ["websocket", "xhr-streaming", "xhr-polling"] });
  // const sock = new SockJS('https://api.webprogramming-mj6119.shop/chatting', null, { transports: ["websocket", "xhr-streaming", "xhr-polling"] });
  let client = Stomp.over(sock);

  // 토큰
  let token = localStorage.getItem('accessToken');

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });

  }, [getMessages]);



  useEffect(() => {
    // 소켓 연결
    client.connect({ "token": token }, () => {
      // 채팅방 구독
      client.subscribe(`/sub/chat/room/${roomId}`, (res) => {
        let newMessage = JSON.parse(res.body);
        dispatch(subMessage(newMessage));
      })

      // 유저 정보 전송 데이터
      const info = {
        type: 'ENTER',
        roomId: roomId,
        sender: state.sender,
        profileImg: state.profileImg,
      }
      // 유저 정보 전송(입장메시지용)
      client.send(`/pub/chat/message`, {}, JSON.stringify(info));
    });

  }, [])

  //연결 해제
  function disconnects() {
    console.log("확인")
    if (client !== null) {
      client.send("/pub/chat/message", {}, JSON.stringify({ type: "QUIT", sender: state.sender }));
      client.disconnect();
    }
  }

  useEffect(() => {
    window.addEventListener("beforeunload", disconnects);
    console.log('새로고침 확인')
  }, [])




  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      myChat();
    }
  };
  // 채팅 전송
  const myChat = () => {
    const msg = chatRef.current.value;
    if (msg === '') {
      return
    }
    const masData = {
      type: 'TALK',
      roomId: roomId,
      message: msg,
      sender: state.sender,
      profileImg: state.profileImg,
    }
    client.send(`/pub/chat/message`, { "token": token }, JSON.stringify(masData))
    chatRef.current.value = null;
  }

  const userInput = `${state.sender}(으)로 댓글 달기 ...`



  //   <ChattingInfo
  //   profileImg={state.authorProfileImg}
  //   userName={state.authorNickname}
  //   comment={state.comment}
  //   time={state.timeLimit} 
  //   />
  // </Box>
  //   <ChattingInfo
  //   profileImg={state.authorProfileImg}
  //   userName={state.authorNickname}
  //   comment={state.comment}
  //   time={state.timeLimit}
  // />

  return (
    <ChatWrap>
      <Header title={title} />
      <Box className="boxx">
        <div>
          <ListInfo>
            <div>
              <span>LIVE</span>
              <img src="" alt="" />
            </div>
            <InfoText>
              <span>닉네임</span>
              집 앞 뛰면 3분거리..비닐수산 산다 만다?..
            </InfoText>
            <strong>00:00</strong>
          </ListInfo>
          <Vote>
            <button>쓰자!</button>
            <button>멈춰!</button>
          </Vote>
          <p>현재인원수<span>20</span></p>
        </div>
      </Box>
      <ChatBox className="chatbox">
        <Chatting ref={scrollRef}>
          {state.sender &&
            getMessages.map((el, i) =>
              el.type === "TALK" ?
                (
                  <div key={i} className={el.sender === state.sender ? "right" : "left"}>
                    <div className="img"><img src={el.profileImg} alt="프로필" /></div>
                    <div className="info">
                      <span>{el.sender}</span>
                      <p>{el.message}</p>
                    </div>
                  </div>) :
                <EnterMsg key={i}>
                  <span>{el.message.split('님')[0]}</span>
                  {el.message.substring(el.message.length - 13)}
                </EnterMsg>
            )
          }
        </Chatting>
      </ChatBox>
      <Enter>
        <Input
          type="text"
          maxLength="25"
          placeholder={userInput}
          ref={chatRef}
          onfocus="this.placeholder=''"
          onKeyPress={handleOnKeyPress}
        ></Input>
        <PostBtn onClick={myChat}>게시</PostBtn>
      </Enter>
    </ChatWrap>
  )
};


export default RoomDetail;

const ChatWrap = styled.div`

`
// 상단 투표 정보
const ListInfo = styled.div`

`
const InfoText = styled.p`


`
const Vote = styled.p`


`




const ChatBox = styled.div`
    width: 100%;
    overflow: overlay;
    height: 73vh;

`
const EnterMsg = styled.p`
  text-align: center;
  color: #26DFB3;
  font-size: 0.75rem; 
  margin-bottom: 15px;
  span{
    font-weight: 700;
    
  }
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

const Box = styled.div`

width: 100%;
height:140px;
background:#333;

`;
