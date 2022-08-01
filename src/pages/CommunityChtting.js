import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { allChattingListRS } from "../store/modules/community";
import ChattingList from "../components/community/ChattingList"
import Header from "../components/public/Header";
import styled from "styled-components";


const Community = () => {
  const title = "커뮤니티"
  const {state} = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(<ChattingList />);
  const [chooseMenu,  setChooseMenu] = useState(true);
 
  useEffect(()=>{
    if(!localStorage.getItem("accessToken")){
      navigate("/main")
    } 
    dispatch(allChattingListRS());

    },[])
    const topRoomList = useSelector(((state => state.community.allChattingList.top5)));

  return  (
  <> 
  <Wap >
    <Header title={title} color={state}/>

        <MenuBar>
          {chooseMenu?
          <>
            <div className="nonChice"
            onClick={()=>{
              navigate("/community")
            setChooseMenu(true)
          }}>티끌자랑</div>
          <div className="choice"
            onClick={()=>{
             setChooseMenu(<ChattingList/>)
            setChooseMenu(false)
          }}>쓸까말까</div>
          </>
          :
          ""

          
          }

        </MenuBar>


        {/* <TimeList>
  

              {topRoomList.length===0? 
              <div style={{
                color:"white",
                width: "100%",
                display: "flex",
                justifyContent:"center",
                textAlign:"center"
                
            }}> 진행중인 채팅이 없어요 </div>
              :       
              <>
              <Top5Wrap>                   
                <InnerWrap>
                {topRoomList&&topRoomList?.map((item, idx)=>(
                  <>
                    <ChattingInfo
                      roomId={item.roomId}
                      prosCons={item.prosCons}
                      leftTime={item.leftTime}
                      />
                  </>
                ))}
                </InnerWrap>
              </Top5Wrap>
              </>
              
              }

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


const Top5Wrap = styled.div`
max-width: 440px;
width: 100%;
max-height: 140px;
height: 100%;
display: flex;
align-items: center;
padding: 0 0 0 1rem;
`;

const InnerWrap = styled.div`
width:360px;
max-height: 120px;
height: 100%;
white-space: nowrap;
border-radius: 5px;


background: white;
`;

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
background: #333333;

/* background: #000000; */
box-shadow:initial;
overflow-x:scroll;


&::-webkit-scrollbar {
    display: none;
  }

`;




const CommunityContents = styled.div`
width: 100%;
overflow-y: scroll ;
display: flex;

&::-webkit-scrollbar {
    display: none;
  }

`;

export default Community;