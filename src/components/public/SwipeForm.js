import React, {useState, useRef, useEffect, useLayoutEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import styled from "styled-components";

import {ReactComponent as Timer} from "../../assets/icons/Timer.svg";
import { chattingVote, deleteChattingRoom } from "../../store/modules/community"
import Loading from "../public/Loading";

import TimerFunction from "../public/Timer"

const SwipeForm = (props) =>{
    const swifeRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();
    const [timeOutLimit , setTimeOutLimit] = useState(true);
    const [vote, setVote] = useState();
    const userInfo = useSelector((state)=>state.community.myInfo)
    const [ready, setReady] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

  useEffect(() => {

    setTimeout(() => {
      setReady(false)
    }, 100)

    if(!timeOutLimit){
      dispatch(deleteChattingRoom(props.roomId));
      setTimeout(() => {
         window.location.reload();
      }, 2000)
    }


  }, [timeOutLimit])

    const getChttingData =(index)=>{
      const sendData ={
          roomId:props.topRoomList[index].roomId,
          sender : userInfo.nickname,
          profileImg: userInfo.profileImg,
          authorNickname : props.topRoomList[index].authorNickname,
          authorProfileImg : props.topRoomList[index].authorProfileImg,
          userCount : props.topRoomList[index].userCount,
          comment : props.topRoomList[index].comment,
          minutes : Math.floor(props.topRoomList[index].leftTime/60),
          seconds : Math.floor(props.topRoomList[index].leftTime%60),
      }
    
      navigate(`/chat/roomdetail/${sendData.roomId}`, {state:sendData});
    
      }

  return  ready ? <Loading /> : (
    
    <>
    {props.topRoomList.length===0? 
    <Wrap>
      <div style={{display:"flex", height:"100%", color:"white",  justifyContent :"center", alignItems:"center"}}>
        <div>
          <h1>준비된 채팅방이 없어요</h1>
        </div>
      </div>
    </Wrap>
    
    :
    <>
    <Wrap>
    {props.topRoomList?.map((item, idx)=>( 
    <ChattingList>
        {/* style={{transform: `translateX(${(-100 / props.topRoomList.length+2) * (currentIndex)}%)`}}>  */}
       <SwipeItem>
         <div className="chatInfoArea"
           onClick={() => {
             getChttingData(idx);
           }}>
           <div className="imgBox">
             Live
             <img src={item.authorProfileImg} />
           </div>

           <div className="contentsBox">
             <span>
               <span className="innerSpan">
                 {item.authorNickname}</span> {item.comment}</span>
             <div className="timerArea">
               <Timer />

               <TimerFunction
                setTimeOutLimit={setTimeOutLimit}
                station = "chattingInfo"
                roomId={item?.roomId}
                 min={Math.floor(item?.leftTime/60)}
                 sec={Math.floor(item?.leftTime%60)}
                  />
             </div>
           </div>
         </div>


         <div className="bottomArea">
         {vote ===0?
            <>
              <button
              onClick={() => { 
                setVote(1)
                dispatch(chattingVote(1,props.roomId))
                }}>쓸까?</button>
              <button
              onClick={() => { 
                setVote(2)
                dispatch(chattingVote(2,props.roomId ))
                }}>말까?</button>
            </>
            : ""}

            {vote === 1 ?
            <>
              <button style={{
                background: "#26DFA6",
                color: "white"
              }}
              disabled
              >쓸까?</button>
              <button onClick={() => { 
                setVote(2)
                dispatch(chattingVote(2,props.roomId ))
               }}>말까?</button>
            </>
              :""}


            {vote==2 ?
            <>
              <button onClick={() => { 
                setVote(1)
                dispatch(chattingVote(1,props.roomId))
              }}>쓸까?</button>

              <button style={{
                background: "#26DFA6",
                color: "white"
              }}
                disabled
              >말까?</button>
            </>
              :
              ""
            }

         </div>

       </SwipeItem>
     </ChattingList>


    ))}  
    </Wrap>
    </>
    }


    </>
  )
} 

const Wrap = styled.div`
max-width: 440px;
width: 100%;
max-height: 140px;
height: 100%;
background: #333333;



`;

const SwipeItem = styled.div`

width:350px;
max-height: 108px;
height: 100%;
white-space: nowrap;
border-radius: 5px;


background: white;



.chatInfoArea{
display: flex;
flex-direction: row;

.imgBox{
  display: flex;
  padding: 0.5rem 0.5rem 0 0.5rem;

    img{
      width: 54px;
      height: 54px;
      border-radius:50%;
    }
  }
}

.contentsBox{
  padding-top: 1rem;
  width: 100%;
  max-height: 60px;
  display: flex;
  justify-content: space-between;;

  span{

    display: flex;
    overflow-y:scroll;

    .innerSpan{
      display: flex;
      font-weight: 500;
      font-size: 1rem;
      margin-right: 5px;
    }
  }
  .timerArea{
    display: flex;
    padding: 0 0.5rem 0 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;

  }

}

.bottomArea{
display: flex;
justify-content: space-evenly;
align-items: center;
padding: 0.3rem 0 0.3rem 0;

  span{
    font-size: 1.2rem;
  }

  button{
  width: 40%;
  padding: 0.4rem;
  font-size: 1rem;
  border-radius: 30px;
  border: 1px solid #26DFA6;
  color: #26DFA6;

  }

}


`;



const ChattingList = styled.div`


padding: 0.6rem 0.8rem 0 0.8rem;
border: 1px solid #333333;
max-width: 390px;
width: 100%;
max-height: 140px;
height: 100%;

`;



const SlideTrack = styled.ul`
  display: flex;
  width: 100%;
  height: 400px;
  padding: 0;
  margin: 0;
  transform: ${({
    slideItemWidth,
    slideMargin,
    slideX,
    previewRatio,
    currentIndex,
    slideToShow,
  }) =>
    `translateX(calc((${slideItemWidth} + ${slideMargin}px) * ${
      currentIndex - (slideToShow - 1) / 2
    } * -1 - ${
      1 - (previewRatio || 1)
    } * (${slideItemWidth}) +  ${slideX}px))`};
  &:not(.no-effect) {
    transition: transform ${({ transitionSpeed }) => transitionSpeed}ms;
  }
  gap: ${({ slideMargin, slideToShow }) =>
    slideToShow > 1 ? slideMargin : 0}px;
  > li {
    flex: 0 0 ${({ slideItemWidth }) => `calc(${slideItemWidth})`};
  }
`;



export default SwipeForm;