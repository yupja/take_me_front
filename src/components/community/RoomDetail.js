import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { subMessage, myInfoData } from "../../store/modules/community";
import { getUserInfoDB } from "../../store/modules/user";
import ChattingInfo from "./ChattingInfo";
import Header from "../public/Header";

function RoomDetail() {
  const { state } = useLocation();
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const getMessages = useSelector((state) => state.community.messages);
  const myInfo = useSelector((state) => state.community.myInfo);

  console.log(state);

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

  const [chat, setChat] = useState([])


  // ***********임시 데이터**************** //
  const nick = 'Eunjin';
  const img = "aaa.jpg";


  const sock = new SockJS('https://api.webprogramming-mj6119.shop/chatting', null, { transports: ["websocket", "xhr-streaming", "xhr-polling"] });
  let client = Stomp.over(sock);

  // 토큰
  let token = localStorage.getItem('accessToken');

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }, [getMessages]);

  useEffect(() => {
    // 유저 데이터 get
    dispatch(myInfoData());

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
        sender: nick,
        profileImg: img,
        userCount: 3,
      }
      // 유저 정보 전송(입장메시지용)
      client.send(`/pub/chat/message`, {}, JSON.stringify(info));
    });



  }, [])

  //연결 해제
  function disconnects() {
    console.log("확인")
    if (client !== null) {
      client.send("/pub/chat/message", {}, JSON.stringify({ type: "QUIT", sender: nick }));
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
      sender: nick,
      profileImg: img,
    }
    client.send(`/pub/chat/message`, { "token": token }, JSON.stringify(masData))
    chatRef.current.value = null;
  }

  const userInput = `${myInfo.nickname}(으)로 댓글 달기 ...`


  //은진님 이거 집어넣으시면 돼요 ㅋㅋ 제가 레이아웃 확인해서 보내드리려고 했는데 어디가 어딘지 모르겠네여어... 
  //   <ChattingInfo
  //   profileImg={state.authorProfileImg}
  //   userName={state.authorNickname}
  //   comment={state.comment}
  //   time={state.timeLimit} 
  //   />
  // </Box>

  return (
    <ChatWrap>
      <Header title={title} />
      <Box />
      <ChatBox className="chatbox">
        <Chatting ref={scrollRef}>
          {myInfo?.nickname &&
            getMessages.map((el, i) =>
              el.type === "TALK" ?
                (
                  <div key={i} className={el.sender === myInfo.nickname ? "right" : "left"}>
                    <div className="img"><img src="https://mblogthumb-phinf.pstatic.net/MjAyMTAxMjJfNzMg/MDAxNjExMzIzMzU1NDgw.nhAuTdE8OjYs0wZAb8qpMAsUaUIZXeRKJ0zDLs5oaKIg.iONiFE4qhr5wuB2FwDe4yfO3oC9gBbOjDaCyGXxiLMkg.JPEG.sohyeon612/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%ED%8C%8C%EC%9D%BC%EF%BC%8D2.jpg?type=w800" alt="프로필" /></div>
                    <div className="info">
                      <span>닉네임</span>
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
