import React from "react";
import SockJS from 'sockjs-client';
import StompJS from "stompjs";

import axios from "axios";
import styled from "styled-components";
import DayModal from "../public/DayModal"
import CreateRoom from "../community/CreateRoom"

axios.defaults.withCredentials = true;


//  소켓js , stompjs 인스톨 
//  서버와 연결할 클라이언트 connection 생성
//   메세지 전송 전 subscriber 와  publicher 지정


const RoomData = [{
    contents : "집 앞 뛰면 3분거리 비닐우산 산다 만다?",
    time : "10:00",
    roomNumber:12345,
},
{
    contents : "나 지금 소떡소떡이 너무 먹고싶어요 ",
    time : "08:00",
    roomNumber:12345,
},
{
    contents : "오늘 올영 세일인데... 정샘물쿠션 할인함요..",
    time : "05:00",
    roomNumber:12345,
},
{
    contents : "님들 오늘 너무 힘들어서 택시타고 싶어..",
    time : "10:00",
    roomNumber:12345,
}





]


function Chatting(){

    const RoomId ="";
    const name = React.useRef();

    
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalState, setModalState] = React.useState();
    const [modalName, setModalName] = React.useState("");
    const openModal = () => { setModalOpen(true); };
    const closeModal = () => { setModalOpen(false); };





    // const sendDataList ={
    //     type:"ENTER",
    //     roomId:"26cfd44b-267d-4bdd-ae99-8c35522a1fa0",
    //     sender:"이보람",
    //     message:"하이"
    // }


    const createRoom = async()=> {
    // const formData= new FormData();

    // formData.append("name" , "방을만들게따");
    try {
        const data = await axios.get('http://43.200.4.1:3000/chat/rooms',
        {
            withCredentials: true
        })
        //console.log(data)
    } catch (error) {
        console.log(error)
    }

}


    
    console.log(RoomData)
    const sendMessege = async () =>{
        // const sock = new SockJS('http://43.200.4.1:3000/');
        // let client = StompJS.over(sock);
        // client.connect({},  ()=>{
        //     client.subscribe('chat/room',JSON.stringify(sendDataList) )
        // })
    }
    return(
        <>
            <Wrap>

                {RoomData && RoomData.map((item, itemIndex) => {
                    return (
                        <>
                            <ChattingList>
                                <img src="" />
                                {item.contents}
                                {item.time}
                            </ChattingList>
                        </>
                    )
                })}


            </Wrap>

            <RoomCreate>

                <button  type="button" onClick={() => {
                    // openModal();
                    // setModalName("쓸까?말까? 만들기")
                    createRoom()
                    // setModalState(
                    // <CreateRoom close={closeModal}/>)
                }}>쓸까?말까? 만들기</button>
            </RoomCreate>
            <DayModal open={modalOpen}
                close={closeModal}
                header={modalName}>
                {modalState}
            </DayModal>
        </>

    )
}
export default Chatting;





const Wrap = styled.div`
width: 100%;
height: 100%;
padding: 1rem;
`;

const ChattingList = styled.div`
height: 50%;
border: 1px solid gray;
margin-bottom: 1rem;
`;


const RoomCreate = styled.div`
display: flex;
justify-content: center;
position: fixed;
width: 100%;
bottom: 20%;


button{
    width: 80%;

    background: #FFB7D9;
    color: white;
    padding: 1rem;
    border-radius:30px;
}
`;
