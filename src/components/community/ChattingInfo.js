import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TimerFunction from "../public/Timer"
import styled from "styled-components";
import { chattingVote, deleteChattingRoom, allChattingListRS } from "../../store/modules/community"
import { Timer } from "../../assets/icons"
import Loading from "../public/Loading";


const ChattingInfo = (props) => {

  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [ready, setReady] = useState(true);
  const [vote, setVote] = useState(props.prosCons);
  const [timeOutLimit, setTimeOutLimit] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {    
    dispatch(allChattingListRS());
    getTime();
    setTimeout(() => {
      setReady(false)
    }, 100)

    if (!timeOutLimit) {
      dispatch(deleteChattingRoom(props?.roomId));
      setTimeOutLimit(true)
      setTimeout(() => {
        window.location.href = "/chattingList";
      },  1000)
    }

  }, [timeOutLimit])


  const userInfo = useSelector((state) => state.community?.myInfo)
  const roomList = useSelector(((state => state.community.allChattingList?.chatRooms)));

  const getChttingData = (index) => {
    const sendData = {
      roomId: props.roomId,
      sender: userInfo.nickname,
      profileImg: userInfo.profileImg,
      prosCons: roomList[index].prosCons,
      minutes: minutes,
      seconds: seconds

    }

    navigate(`/chat/roomdetail/${sendData.roomId}`, { state: sendData });
  }


  const getTime = () => {
    const min = (Math.floor(props.leftTime/60))
    const sec = (Math.floor(props.leftTime%60))
    setMinutes(min);
    setSeconds(sec);

  }


  return ready ? <Loading /> : (
    <>

      {roomList && roomList.map((item, idx) => (
        <div key={idx}>
          {item.roomId === props.roomId ?
            <>
              <ChattingList>

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
                      <div><Timer /></div>
                      <div style={{
                        display: "flex",
                        color: "#26DFB3",
                        fontSize: "1.2rem",
                        fontWeight: "700"
                      }}>
                        <TimerFunction
                          min={minutes}
                          sec={seconds}
                          setTimeOutLimit={setTimeOutLimit}
                          station="chattingInfo"
                          roomId={item.roomId} />
                        <span>M</span>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="bottomArea">

                  {vote === 0 ?
                    <>
                      <button
                        onClick={() => {
                          setVote(1)
                          dispatch(chattingVote(1, item.roomId))

                        }}>쓸까?</button>
                      <button
                        onClick={() => {
                          setVote(2)
                          dispatch(chattingVote(2, item.roomId))

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
                        dispatch(chattingVote(2, item.roomId))

                  
                      }}>말까?</button>
                    </>
                    : ""}


                  {vote == 2 ?
                    <>
                      <button onClick={() => {
                        setVote(1)
                        dispatch(chattingVote(1, item.roomId))

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

              </ChattingList>


            </>


            :
            ""}
          <div>

          </div>
        </div>
      ))}
    </>
  )

}


const ChattingList = styled.div`
min-width: 355px;
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


    .innerSpan{
      display: flex;
      width: 25%;
      font-weight: 600;
      font-size: 1rem;
      margin-right: 15px;
    }
  }
  .timerArea{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem 0 0 0;

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