import React, { useState, useRef, useEffect } from "react";
import { useBeforeunload } from "react-beforeunload";
import styled from "styled-components";
import { Link, useParams, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { subMessage, delMessage, deleteChattingRoom, chattingVote,
      allChattingListRS } from "../../store/modules/community";
import Header from "../public/Header";
import TimerFunction from "../public/Timer"


function RoomDetail() {
  useBeforeunload((event) => event.preventDefault());
  const { state } = useLocation();
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const title = '쓸까?말까?'
  const chatRef = useRef();
  const scrollRef = useRef();
  const getMessages = useSelector((state) => state.community.messages);
  const roomList = useSelector(((state => state.community.allChattingList.chatRooms)));
  const [vote, setVote] = useState(state.prosCons)
  const [timeOutLimit , setTimeOutLimit] = useState(true);
  const navigate = useNavigate();



  useEffect(() => {
    dispatch(allChattingListRS());


    // if (state.minutes > 10 || state.minutes <= 0) {
    //   setTimeout(() => {
    //     client.disconnect();
    //     dispatch(deleteChattingRoom(roomId));
    //   }, 100)

    // } else 
    if (!timeOutLimit) {
      setTimeout(() => {
        client.disconnect();
        navigate("/chattingList")
      }, 100)
    }

  scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    
  }, [getMessages, timeOutLimit]);



  useEffect(() => {
  return (() => {
      dispatch(delMessage())
      disconnects();
    })

  }, [])


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



  



  const sock = new SockJS('https://api.webprogramming-mj6119.shop/chatting', null, { transports: ["websocket", "xhr-streaming", "xhr-polling"] });
  let client = Stomp.over(sock);

  // 토큰
  let token = localStorage.getItem('accessToken');


  //연결 해제
  function disconnects() {
    if (client !== null) {
      client.send("/pub/chat/message", {}, JSON.stringify({ type: "QUIT", sender: state.sender }));
      client.disconnect();
    }
  }


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


  return (
    <ChatWrap>
      <Header title={title} />


      {roomList&&roomList.map((item, idx) =>(
        <>
        {item.roomId === state.roomId?
           <>
           <Box>
            <ListInfo>
            <div className="userInfo">
              <div className="profileBox">
                <span className="live">LIVE</span>
                <div className="profile"><img src={item.authorProfileImg} alt="" /></div>
              </div>
              <InfoText>
                <span>{item.authorNickname} </span>
                {item.comment}
              </InfoText>
            </div>
            <strong>
              <TimerFunction
                min={state.minutes}
                sec={state.seconds}
                setTimeOutLimit={setTimeOutLimit}
                station={"room"}
              />
            </strong>
          </ListInfo>
  
          <Vote>
            {vote===0?
              <>
              <NonChoice
              onClick={()=>{
                dispatch(chattingVote(Number(1), item.roomId))
                setVote(Number(1))
              }}
              >쓸까?</NonChoice>
            <NonChoice
              onClick={()=>{
                dispatch(chattingVote(Number(2),item.roomId))
                setVote(Number(2))
              }}>말까?</NonChoice>
              </>
          :
          ""
           }
  
           {vote===1? 
             <>
             <Choice
             onClick={()=>{
               dispatch(chattingVote(Number(1),item.roomId))
               setVote(Number(1))
             }}
             >쓸까?</Choice>
           <NonChoice
             onClick={()=>{
               dispatch(chattingVote(Number(2),item.roomId))
               setVote(Number(2))
             }}>말까?</NonChoice>
             </>
            :
            ""
            }
  
  
           {vote===2? 
           <>
            <NonChoice
              onClick={()=>{
                dispatch(chattingVote(Number(1),item.roomId))
                setVote(Number(1))
              }}
              >쓸까?</NonChoice>
            <Choice
              onClick={()=>{
                dispatch(chattingVote(Number(2),item.roomId))
                setVote(Number(2))
              }}>말까?</Choice>
              </>
              :
              ""
              }
  
  
          </Vote>
  
          <p className="count">조회수 <span>{item.userCount}</span></p>
        </Box> 
  
          </>
          :
          ""}
        </>
     
      ))}

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
      {timeOutLimit ?
        <>
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
        </>
        : ""}

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
border: none;
background-color: #333333;
display: flex;
align-items: center; 
position: absolute;
bottom: 0;

input:placeholder{
  color:#fff;
}
`;

const Input = styled.input`
width: 100%;
border: 1px solid #A9FFE4;
border-radius: 40px;
background-color: transparent;
color: white;
margin: 0 auto;
padding: 0.81rem;
:focus{
    outline: none;
}
`


const PostBtn = styled.button`
position: absolute;
right: 2.25rem;
height: 10vw;
border: none;
background-color: transparent;
color: white;
font-size: 0.75rem;
font-weight:700;
`;

const Box = styled.div`
width: 100%;
background:#333;
padding: 1.25rem 1.5rem;
color: #fff;
p.count{
  font-size:0.87rem;
  margin: 1rem 0 0 0;
  span{
    color: #999;
  }
}
`;

// 상단 투표 정보
const ListInfo = styled.div`
display: flex;
justify-content: space-between;
div.userInfo{
  display: flex;
}
div.profileBox {
  position: relative;
  width:2.5rem;
  height: 2.5rem;
  margin-right: 0.625rem;
  flex-shrink: 0;
  
  span {
  position: absolute;
  top:0; left: 0;
  display: inline-block;
  /* width: 1.37rem;
  height:0.625rem; */
  padding: 3px 5px;
  background: #FF7272;
  color: #fff;
  font-weight: 700;
  font-size: 0.43rem;
  text-align: center;
  border-radius: 1.93rem;
  z-index: 10;
}
}
.profile {
  position: relative;
  width:2.5rem;
  height: 2.5rem;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}
img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width:100%;
  height: 100%;
}
strong {
  font-family: 'Cafe24Ohsquareair';
  color: #26DFA6;
  font-size:1.5rem;
  font-weight: 700;
  padding-top: 0.93rem;
}

`
const InfoText = styled.p`
  font-size: 0.875rem;
  line-height: 1.06rem;
  padding-right: 1.87rem;
span{
  font-weight: 700;
}

`
const Vote = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin: 0.62rem 0;
`;

const Choice = styled.button`
display: flex;
background: #26DFA6;
padding: 0.5rem 4rem 0.6rem 4rem;
border-radius: 50px;
color: #ffffff;
border: 1px solid #26DFA6;
`;

const NonChoice = styled.button`
  display: flex;

  background: #333333;
  padding: 0.5rem 4rem 0.6rem 4rem;
  border-radius: 50px;
  color: #26DFA6;
  border: 1px solid #26DFA6;
`;


