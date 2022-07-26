import React, {useState, useEffect} from "react";
import TimerFunction from "../public/Timer"
import ProgressBar from "../public/ProgressBar"


import styled from "styled-components";
import {Timer, ChattingEnd} from "../../assets/icons"


const ChattingInfo = (props) =>{
  useEffect(() => {
    getTime();
  },[props.createdAt])


  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();


  const getTime=()=>{
    const createTime = new Date(props.createdAt);
    const currentTime = new Date();

    let diff = (createTime - currentTime)-(props.timeLimit*(1000*60))
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    diff -= diffHours * (1000 * 60 * 60);
    let diffMin = Math.floor(diff / (1000 * 60));
    diff -= diffMin * (1000 * 60);
    const diffSec = Math.floor(diff / 100000);

    setMinutes(diffMin);
    setSeconds(diffSec);
  }


  return (


  <>
  { minutes && seconds && props.currentState==="Live"? 
  
    <ChattingList>
    <div className="chatInfoArea">
      <div className="imgBox">
      Live
      <img src={props.profileImg} />
      </div>
      
      <div className="contentsBox">
        <span>
          <span className="innerSpan">
            {props.userName}</span> {props.comment}</span>
        <div className="timerArea">
          <Timer/>
          <TimerFunction
              min={minutes}
              sec={seconds}/>
        </div>
      </div>
    </div>

    <div className="bottomArea">
      <button>쓸까?</button>
      <button>말까?</button>

    </div>

  </ChattingList>

  :
  ""
  }

  { props.currentState==="END"? 
      <ChattingList>
      <div className="chatInfoArea">
        <div className="imgBox">
        <img src={props.profileImg} />
        </div>
        
        <div className="contentsBox">
          <span>
            <span className="innerSpan">
              {props.userName}</span> {props.comment}</span>
          <div className="stateArea"><ChattingEnd/></div>
        </div>
      </div>
  
      <div className="bottomArea">
        <span>쓰자!</span>
        <div style={{ 
          width: "65%",
          marginTop:"0.5rem"}}>
          <ProgressBar
            true={40}
            false={60} />
        </div>
  
        <span>멈춰!</span>
  
      </div>
    </ChattingList>
    :""}



  </>
    )

}


const ChattingList = styled.div`
max-width: 355px;
min-height: 108px;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
border: none;
box-shadow: 0px 4px 11px 0px rgb(0 0 0 / 15%);
/* padding: 1rem;
margin-bottom: 1rem; */


.chatInfoArea{
  display: flex;
  flex-direction: row;

  .imgBox{
    padding: 1rem 1rem 0 1rem;
  
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

  span{
    width: 80%;
    display: flex;
    overflow-y:scroll;

    .innerSpan{
      display: flex;
      width: 25%;
      font-weight: 500;
      font-size: 1rem;
      margin-right: 5px;
    }
  }
  .stateArea{
    display: flex;
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
  width: 42%;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 30px;
  border: 1px solid #26DFA6;
  color: #26DFA6;

  }



}
`;

export default ChattingInfo;