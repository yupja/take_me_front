import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Modal from "../public/BasicModalForm";
import CreateRoom from "./CreateRoom";
import ChattingInfo from "./ChattingInfo";
import ClosedChattingInfo from "./ClosedChattingInfo"
import { myInfoData , allChattingListRS,closedChttingInfinityLoad} from "../../store/modules/community"

function ChattingList() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/main")
    }
   
    dispatch(allChattingListRS());
    dispatch(myInfoData())
  }, [])

  const [target, setTarget] = useState(null);

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      dispatch(closedChttingInfinityLoad());
      window.location.reload("/chattingList");
    }
  };
  

useEffect(() => {
    let observer;
    if (target) {
      try{
        observer = new IntersectionObserver(onIntersect, {
          threshold: 1,
        });
        observer.observe(target);
      }
      catch{
        alert("게시물의 마지막입니다. ")
        observer && observer.disconnect();
      }
    }
  }, [target]);

  const RoomId = "";
  const name = React.useRef();
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalState, setModalState] = React.useState();
  const [modalName, setModalName] = React.useState("");
  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };

  const roomList = useSelector(((state => state.community.allChattingList.chatRooms)));
  const closedRoomList = useSelector(((state => state.community.allChattingList.closedChatRooms)));
  const userInfo = useSelector((state) => state.community.myInfo)

  return (
    <>
      <Wrap>
        <AllchattingList>

          {roomList?.lenght === 0 ?
            "진행중인 채팅방이 없습니다. " :

            <div>
              {roomList && roomList?.map((item, itemIndex) => {
                return (
                  <>
                    <div key={item.roomId}>
                      <ChattingListDiv>
                        <ChattingInfo
                          roomId={item.roomId}
                          prosCons={item.prosCons}
                          leftTime={item.leftTime}
                           />
                      </ChattingListDiv>
                    </div>
                  </>
                )
              })}
            </div>
          }





          <div>
            {closedRoomList && closedRoomList.map((list, itemIndex) => {
              return (
                <ChattingListDiv >
                  <div ref={itemIndex === closedRoomList.length - 1 ? setTarget : null}>
                  <ClosedChattingInfo
                    profileImg={list?.authorProfileImg}
                    userName={list?.authorNickname}
                    comment={list?.comment}
                    roomId={list?.roomId}
                    true={list?.voteTruePercent}
                    false={list?.voteFalsePercent}

                  />
                  </div>
                </ChattingListDiv>
              )
            })}
          </div>




        </AllchattingList>

        <div className="buttonBox">
          <button onClick={() => {
            openModal();
            setModalName("쓸까? 말까? 만들기");
            setModalState(
              <CreateRoom
                close={closeModal}
                nickname={userInfo.nickname}
                profileImg={userInfo.profileImg} />)
          }}><p>쓸까? 말까? 만들기</p></button>
        </div>
      
      </Wrap>

      <Modal open={modalOpen}
        close={closeModal}
        header={modalName}>
        {modalState}
      </Modal>
    </>

  )
}
export default ChattingList;


const Wrap = styled.div`
display: flex;
justify-content: flex-start;;
max-width: 440px;
width: 100%;
/* max-height:570px; */
height: 100%;
padding: 1rem;
flex-direction: column;
align-items: center;



.buttonBox{
  width: 355px;
  height: 60px;
  border-radius: 59px;
  padding: 1.2rem 0 0 0;
  position: fixed;
  bottom: 10%;
  text-align: center;
  z-index: 1;
  background: #6485EC;
  box-shadow: 5px 5px 5px rgb(110 110 110 / 40%);
  opacity: 95%;

  button{
    color: white;
    font-weight: 500;
  }
  p{
    
    font-size: 19px;
  }
}
`;

const AllchattingList = styled.div`
max-width: 440px;
display: flex;
flex-direction: column;
/* justify-content: center; */
align-items: center;

width:100%;
max-height: 844px;

`;

const ChattingListDiv = styled.div`
    margin-bottom: 3%;
`;

