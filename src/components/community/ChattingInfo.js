import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TimerFunction from "../public/Timer"
import ProgressBar from "../public/ProgressBar"


import styled from "styled-components";
import {Timer} from "../../assets/icons"

const ChattingInfo = (props) =>{
  return (
  <>
  {props.currentState==="Live"? 
    <ChattingList>
      <div className="chatInfoArea">
        <div className="imgBox">
        Live
        <img src={props.profileImg} />
        </div>
        
        <div className="contentsBox">
          <span>
            <span style={{fontWeight:"500" , fontSize:"1.2rem"}}>{props.userName}</span> {props.comment}</span>
          <div className="timerArea"><Timer/><TimerFunction/></div>
        </div>
      </div>

      <div className="buttonArea">
        <button>쓸까?</button>
        <button>말까?</button>

      </div>

    </ChattingList>

    :
    
    <ChattingList>
      <div className="chatInfoArea">
        <div className="imgBox">
        <img src={props.authorProfileImg} />
        </div>
        
        <div className="contentsBox">
          <span>
            <span style={{fontWeight:"500" , fontSize:"1.2rem"}}>{props.authorNickname}</span> {props.comment}</span>
          <div className="timerArea"><Timer/><TimerFunction/></div>
        </div>
      </div>


             {/* <div className="bottonArea">
                     <span>쓰자!</span>
                     <div style={{ width: "65%" }}>
                      <ProgressBar
                        true={item.voteFalsePercent}
                        false={item.voteTruePercent} />
                    </div>

                    <span>멈춰!</span>
                  </div> */}

  </ChattingList>
  
  }


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
  font-size: row;

  span{
    width: 80%;
    overflow-y:scroll;
  }
  .timerArea{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

  }

}


.buttonArea{
display: flex;
justify-content: space-evenly;
align-items: center;
padding: 0.3rem 0 0.3rem 0;

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