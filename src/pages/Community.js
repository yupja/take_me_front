import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { allChattingListRS } from "../store/modules/community";
import ChattingList from "../components/community/ChattingList"
import Header from "../components/public/Header";

import styled from "styled-components";
import CommunityList from "../components/community/CommunityList";
import CommunityTab from "../components/community/CommunityTab";


const Community = () => {
  const title = "커뮤니티"
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(<CommunityTab />);
  const [chooseMenu, setChooseMenu] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/main")
    }

    dispatch(allChattingListRS());
  }, [])
  const topRoomList = useSelector(((state => state.community.allChattingList.top5)));

  return (
    <>
      <Wap >
        <Header title={title} tColor={state} backGround={"#fff"} />

        <MenuBar>
            <>
              <button 
                className="Choice"
                onClick={() => {
                  navigate("/community")
                  setChooseMenu(true)
                }}
                disabled
                >티끌자랑</button>
              <button 
              className="nonChice"
                onClick={() => {
                  navigate("/chattingList")
                  setChooseMenu(false)
                }}>쓸까말까</button>
            </>
        </MenuBar>

        <div style={{ width: "100%", height: "100%" }}>
          <CommunityContents>
            <CommunityTab/>
          </CommunityContents>
        </div>


      </Wap>
    </>
  )
};




const Wap = styled.div`

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
    cursor: pointer;
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
    cursor: pointer;
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

`;

export default Community;