import React, {useRef} from "react";
import SockJS from 'sockjs-client';
import StompJS from "stompjs";
import axios from "axios";
import styled from "styled-components";


//  소켓js , stompjs 인스톨 
//  서버와 연결할 클라이언트 connection 생성
//   메세지 전송 전 subscriber 와  publicher 지정


function Chatting(){


    // client.connect({}, () =>{
    //     client.subscribe(`/${formData}`)
    // })

    const RoomId ="";
    const name = useRef();
    const formData = new FormData();
    formData.append("name", "이름")


    const sendDataList ={
        type:"ENTER",
        roomId:"26cfd44b-267d-4bdd-ae99-8c35522a1fa0",
        sender:"이보람",
        message:"하이"
    }


    const createRoom = async () => {
        try {
            const data = await axios.post('http://54.180.159.97/chat', formData)
            // { headers :  { "Content-Type": "form-data" }})
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    
    const sendMessege = async () =>{
        const sock = new SockJS('ws://54.180.159.97/ws/chat');
        let client = StompJS.over(sock);
        client.connect({},  ()=>{
            client.subscribe('/ws/chat',JSON.stringify(sendDataList) )
        })
    }
    return(
        <Wrap>
            <RoomCreate>
                <input ref={name} placeholder="방 이름 입력"></input>
                <button onClick={()=>{
                    createRoom();
                }}>방 생성하기</button>
            </RoomCreate>

            <ChattingArea>
                <ChattingOutput>
                    <ChattingInput>
                        <input></input>
                        <button onClick={()=>{
                            sendMessege();
                        }}>메세지?</button>

                    </ChattingInput>
                </ChattingOutput>
            </ChattingArea>
        </Wrap>

    )
}
export default Chatting;


const Wrap = styled.div`
width: 100%;
height: 100%;
`;

const RoomCreate = styled.div`
display: flex;
padding: 2rem;
height: 10vh;

button{
    background: green;
    color: white;
    
}
`;

const ChattingArea = styled.div`
padding: 2rem;
`;

const ChattingOutput = styled.div`
`;

const ChattingInput = styled.div`
`;