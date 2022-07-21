import React, { useEffect } from "react";
import SockJS from 'sockjs-client';
import StompJS from "stompjs";
import { useLocation } from "react-router";
import styled from "styled-components";


const ChattingWindow = () =>{
  const {state} = useLocation();
  const RoomId = state;
  console.log(RoomId)

  const sockJS = new SockJS('http://3.35.52.157/chatting');
  let client = StompJS.over(sockJS);

    const logInToken = {
        token : localStorage.getItem("accessToken")
    }

    const messageRef = React.useRef();
    

    React.useEffect(() => {
        client.connect( {"token" : localStorage.getItem("accessToken")},
            ()=>{client.subscribe(`/chat/room/enter/${RoomId}}`, (data)=>{
            })
        })
    }, [])




  const sendMessege = async () => {
    const sendDataList ={
        message: messageRef.current.value
      }
    }
  
  return (
    <>
        <Wrap>
            <input ref={messageRef}></input>
            <button onClick={()=>{
                sendMessege();
            }}>전송</button>
        </Wrap>
  </>)
}

const Wrap = styled.div`
display: flex;
justify-content: center;
padding: 2rem;
`;
export default ChattingWindow