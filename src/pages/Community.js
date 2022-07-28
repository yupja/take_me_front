import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { topListRS } from "../store/modules/community";
import ChattingList from "../components/community/ChattingList"
import Header from "../components/public/Header";
import SwipeRooms from "../components/public/SwipeForm"

import styled from "styled-components";
import CommunityList from "../components/community/CommunityList";
import CommunityTab from "../components/community/CommunityTab";


const Community = () => {
  const title = "커뮤니티"
  const {state} = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoad, setLoad] = useState(false);
  // const [page, setPage] = useState(<CommunityList />);
  const [page, setPage] = useState(<CommunityTab />);

  useEffect(()=>{

      dispatch(topListRS());
    },[isLoad])
  const topRoomList = useSelector(((state => state.community.topChttingList)));
  console.log(topRoomList)



  return (
  <> 
  <Wap >
    <Header title={title} color={state}/>

        <MenuBar>
          <div onClick={()=>{
            setPage(<CommunityList />)
          }}>티끌자랑</div>
          <div onClick={()=>{
            setPage(<ChattingList/>)
          }}>쓸까말까</div>
        </MenuBar>

{/* 
        <TimeList>
          <SwipeRooms topRoomList={topRoomList}/>
        </TimeList> */}

        <div style={{ width: "100%", height:"100%" }}>
          <CommunityContents>
            {page}
          </CommunityContents>
        </div>


      </Wap>
  </>
  )
};




const Wap = styled.div`
max-width: 390px;
max-height: 844px;
`;

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
max-height: 140px;
height: 100%;
display: flex;
align-items: center;

/* background: #000000; */
box-shadow:initial;
overflow-x:scroll;


&::-webkit-scrollbar {
    display: none;
  }

`;




const CommunityContents = styled.div`
width: 100%;
display: flex;
`;

export default Community;