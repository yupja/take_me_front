import React, { useEffect } from "react";
import SockJS from 'sockjs-client';
import StompJS from "stompjs";

import styled from "styled-components";


const ChattingWindow = (props) =>{
    const sockJS = new SockJS('http://43.200.4.1');
    let client = StompJS.over(sockJS);

    const logInToken = {
        token : localStorage.getItem("accessToken")
    }


    console.log(logInToken)

    const messageRef = React.useRef();
    const RoomId = "2f9caf2e-ed19-4e4a-8eff-ab3fb229a370";

    React.useEffect(() => {
        client.connect({logInToken} ,
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