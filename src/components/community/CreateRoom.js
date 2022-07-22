import React, { useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { createChatRoom } from "../../store/modules/community";
import { useDispatch } from "react-redux";


const CreateRoom = () => {
  const dispatch = useDispatch();
  const RoomName = useRef();

  // const roomCreate = async () => {
  //   try {
  //     const data = await axios.post('http://3.35.52.157/api/chat/room', { name: RoomName.current.value },
  //       { headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` } })
  //     console.log(data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // 찬반 생성시
  const createRoom = (e) => {
    e.preventDefault();
    console.log(RoomName.current.value)
    dispatch(createChatRoom(RoomName.current.value));
  }

  return (
    <>
      <Wrap>
        <p>방 이름</p>
        <input ref={RoomName}></input>
        <div>타이머 : 10분 고정</div>
      </Wrap>
      <Footer onClick={
        // roomCreate();
        createRoom
      }>방 개설하기</Footer>
    </>

  )
}



const Wrap = styled.div`
display: flex;
justify-content: space-around;;
align-items: center;
padding: 1rem;

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