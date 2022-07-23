import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

import CommunityTab from "../components/community/CommunityTab";
import Chatting from "../components/community/Chatting"
import Header from "../components/public/Header";

import styled from "styled-components";


const Community = () => {
  const title = "커뮤니티"


  const navigate = useNavigate();
  const [page, setPage] = useState(<CommunityTab />);


  return (
    <div className="wrap">
      <TopWrap>
      <Header title={title} />
      </TopWrap>
      
      <MenuBar>
        <div onClick={()=>{
          setPage(<CommunityTab />)
        }}>티끌자랑</div>
        <div onClick={()=>{
          setPage(<Chatting/>)
        }}>쓸까말까</div>
      </MenuBar>

      <div style={{ width: "100%" }}>
        <RealTimeBox>
          <TimeList></TimeList>
        </RealTimeBox>

        <CommunityContents>
          {page}
        </CommunityContents>
      </div>
    </div>

  )
};


const TopWrap = styled.div`
display: flex;
width: 100%;
height: 6vh;
padding: 10px;
flex-direction: column;
align-items: center;
`;


const MenuBar = styled.div`
display: flex;
justify-content: center;
justify-content: space-evenly;
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

const RealTimeBox = styled.div`
display: flex;
justify-content: center;
align-items: center;

width: 100%;
background: #F5F5F5;
height: 4%;
`;

const TimeList = styled.div`
width: 96%;
height: 85%;
display: flex;
align-items: center;
justify-content: center;
background: white;
box-shadow:initial;
border-radius: 10px;
`;




const CommunityContents = styled.div`

`;

export default Community;