import React, { useRef } from "react";
import axios from "axios";
import styled from "styled-components";


const CreateRoom = () => {
  const RoomName = useRef();

  const roomCreate = async () => {
    try {
      const data = await axios.post('http://3.35.52.157/chat/room', {name : RoomName.current.value},
      { headers: { 'Authorization':  `Bearer ${localStorage.getItem("accessToken")}`}})
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Wrap>
         <p>방 이름</p> 
         <input ref={RoomName}></input>
      </Wrap>
      <Footer onClick={() => {
        roomCreate();
        }}>방 개설하기</Footer>
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