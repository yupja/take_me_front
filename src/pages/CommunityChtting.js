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


const Community = () => {
  const title = "커뮤니티"
  const {state} = useLocation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(<ChattingList />);
  const [chooseMenu,  setChooseMenu] = useState(true);
  useEffect(()=>{

      dispatch(topListRS());
    },[])
  const topRoomList = useSelector(((state => state.community.topChttingList)));
  console.log(topRoomList)



  return (
  <> 
  <Wap >
    <Header title={title} color={state}/>

        <MenuBar>
          {chooseMenu?
          <>
            <div className="Choice"
            onClick={()=>{
            setPage(<CommunityList />)
            setChooseMenu(true)
          }}>티끌자랑</div>
          <div className="nonChice"
            onClick={()=>{
            setPage(<ChattingList/>)
            setChooseMenu(false)
          }}>쓸까말까</div>
          </>
          :
          <>
          <div className="nonChice"
            onClick={()=>{
            setPage(<CommunityList />)
            setChooseMenu(true)
          }}>티끌자랑</div>
          <div className="Choice"
              onClick={()=>{
            setPage(<ChattingList/>)
            setChooseMenu(false)
          }}>쓸까말까</div>
          
          
          </>}

        </MenuBar>


        <TimeList>
          <SwipeRooms topRoomList={topRoomList}/>
        </TimeList>

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




.choice{
    width: 45%;
    border: 1px solid #26DFA6;
    background: white ;
    text-align: center;
    padding: 10px;
    border-bottom: none;
    border-radius: 10px 10px 0px 0px;
}
.nonChice{
    width: 45%;
    border: 1px solid #CCCCCC;
    color : #666666;
    background: #EFEFEF;
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