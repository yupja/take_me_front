import React, {useState, useRef, useEffect, useLayoutEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import styled from "styled-components";

import {ReactComponent as Timer} from "../../assets/icons/Timer.svg";
import { chattingVote } from "../../store/modules/community"


import TimerFunction from "../public/Timer"

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return undefined;
    }
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}


const SwipeForm = (props) =>{
    const swifeRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loop, setLoop] = useState(null);
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();
    const [vote, setVote] = useState(props.prosCons);

    const userInfo = useSelector((state)=>state.community.myInfo)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const chageVote = () =>{
      let sendData={}
      if(vote){
        setVote(false)
        sendData={
          roomId: props.roomId,
          prosCons : false
        }
        dispatch(chattingVote(sendData))
  
      }else if(!vote){
        setVote(true)
        sendData={
          roomId: props.roomId,
          prosCons : true
        }
        dispatch(chattingVote(sendData))
    }}

    const getChttingData =(index)=>{
      const sendData ={
          roomId:props.topRoomList[index].roomId,
          sender : userInfo.nickname,
          profileImg: userInfo.profileImg,
          authorNickname : props.topRoomList[index].authorNickname,
          authorProfileImg : props.topRoomList[index].authorProfileImg,
          userCount : props.topRoomList.userCount,
          comment : props.topRoomList[index].comment,
          createdAt:props.topRoomList[index].createdAt,
          timeLimit:props.topRoomList[index].timeLimit
      }
    
      navigate(`/chat/roomdetail/${sendData.roomId}`, {state:sendData});
    
      }

    const setInfiniteSlide = (datas, slideToAdd) => {
      const newSlides = [...datas];
      const size = datas.length;
      for (let i = 0; i < slideToAdd; i += 1) {
        const first = {
          ...datas[i % size],
          id: datas.length + i,
        };
        const last = {
          ...datas[datas.length - 1 - (i % size)],
          id: -(i + 1),
        };
        newSlides.unshift(last);
        newSlides.push(first);
      }
      return newSlides;
    };


    useInterval(() => {
      setCurrentIndex(currentIndex => currentIndex + 1);
  }, 2000)
  
  
  
  
  return (
    
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
    {props.topRoomList.map&&props.topRoomList?.map((item, idx)=>( 
    

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
                 min={minutes}
                 sec={seconds} />
             </div>
           </div>
         </div>


         <div className="bottomArea">
           {vote ?
             <button style={{
               background: "#26DFA6",
               color: "white"
             }}
               disabled
             >쓸까?</button>
             :
             <button
               onClick={() => { chageVote() }}>쓸까?</button>

           }


           {vote ?
             <button
               onClick={() => { chageVote() }}>말까?</button>

             :
             <button style={{
               background: "#26DFA6",
               color: "white"
             }}
               disabled
             >말까?</button>

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
max-width: 390px;
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