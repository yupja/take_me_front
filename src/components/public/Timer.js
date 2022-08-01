
import React, { useState, useEffect, useDebugValue } from "react";
import { useDispatch } from "react-redux";
import {deleteChattingRoom, deleteLobyChat } from "../../store/modules/community";

export default function Timer(props) {
  const [minutes, setMinutes] = useState(Number(props.min));
  const [seconds, setSeconds] = useState(Number(props.sec));
  const dispatch = useDispatch();

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    
    if(props.station === "chattingInfo"){
      if((parseInt(minutes)==0)&&(parseInt(seconds)==1)|| parseInt(minutes)>10){
      dispatch(deleteChattingRoom(props.roomId))

      }

    }else if(props.station === "room"){
      if((parseInt(minutes)==0)&&(parseInt(seconds)==0)|| parseInt(minutes)>10){
        alert("채팅이 종료되었습니다.")
        props.setTimeOutLimit(false)
      }
    }


    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <div>
      <div>
        {props.station === "chattingInfo" ? 
          <h2>
            {minutes+1}
          </h2>
          :
          <h2>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </h2>
          }

      </div>
    </div>
  );
}