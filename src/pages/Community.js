import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

import CommunityTab from "../components/community/CommunityTab";
import Chatting from "../components/community/Chatting"
import Header from "../components/public/Header";
import SwipeRooms from "../components/public/SwipeForm"

import styled from "styled-components";
import user from "../store/modules/user";


const Community = () => {
  const title = "커뮤니티"
  const {state} = useLocation();

  const navigate = useNavigate();
  const [page, setPage] = useState(<CommunityTab />);



  return (
  <> 
    <Header title={title} color={state}/>
      
      <MenuBar>
        <div onClick={()=>{
          setPage(<CommunityTab />)
        }}>티끌자랑</div>
        <div onClick={()=>{
          setPage(<Chatting/>)
        }}>쓸까말까</div>
      </MenuBar>


        <TimeList>
          <SwipeRooms />
        </TimeList>

      <div style={{ width: "100%" }}>
         <CommunityContents>
          {page}
        </CommunityContents>
      </div>
  </>
  )
};




const MenuBar = styled.div`
display: flex;
justify-content: center;
justify-content: space-evenly;
margin-top: 5%;
width : 100%;




div{
    width: 45%;
    border: 1px solid #CCCCCC;
    text-align: center;
    padding: 10px;
    border-bottom: none;
    border-radius: 10px 10px 0px 0px;
}
`;


const TimeList = styled.div`
width: 100%;
height: 20%;
display: flex;
align-items: center;
justify-content: center;
background: #000000;
box-shadow:initial;
overflow-x:scroll;

div{
  border-radius: 10px;
}

&::-webkit-scrollbar {
    display: none;
  }

`;




const CommunityContents = styled.div`
width: 100%;
display: flex;
`;

export default Community;