import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Modal from "../public/BasicModalForm";
import CreateRoom from "./CreateRoom";
import ChattingInfo from "./ChattingInfo";
import { loadChattingListRS, closedChttingListRS, myInfoData } from "../../store/modules/community"


function ChattingList() {

  useEffect(() => {
    dispatch(loadChattingListRS());
    dispatch(closedChttingListRS());
    dispatch(myInfoData())
  }, [])

  const RoomId = "";
  const name = React.useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalState, setModalState] = React.useState();
  const [modalName, setModalName] = React.useState("");
  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };

  const RoomList = useSelector(((state => state.community.chattingList)));
  const ClosedRoomList = useSelector(((state => state.community.closedChttingList)));
  const userInfo = useSelector((state) => state.community.myInfo)


  return (
    <>
      <Wrap>

        <AllchattingList>
          <div>
            {RoomList && RoomList.map((item, itemIndex) => {
              return (
                <>
                  <div key={item.roomId}>
                    <ChattingListDiv>
                      <ChattingInfo
                        roomId={item.roomId}
                        authorProfileImg={item.authorProfileImg}
                        authorNickname={item.authorNickname}
                        comment={item.comment}
                        userCount={item.userCount}
                        createdAt={item.createdAt}
                        timeLimit={item.timeLimit}
                        prosCons={item.prosCons}
                        currentState={"Live"} />
                    </ChattingListDiv>
                  </div>
                </>
              )
            })}
          </div>


          {ClosedRoomList && ClosedRoomList?.map((item, itemIndex) => (
            <div key={item.roomId}>
              <ChattingList
                onClick={() => {
                  navigate(`/chat/closedChttinglog/${item.roomId}`, { state: userInfo.nickname });
                }}>
                <ChattingInfo
                  roomId={item.roomId}
                  profileImg={item.authorProfileImg}
                  userName={item.authorNickname}
                  comment={item.comment}
                  currentState={"END"} />
              </ChattingList>
            </div>
          ))}


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
justify-content: center;
max-width: 390px;
width: 100%;
max-height:565px;
height: 100%;
padding: 1rem;
flex-direction: column;
align-items: center;
overflow-y: scroll;

&::-webkit-scrollbar {
    display: none;
  }


.buttonBox{
  width: 90%;
  border-radius: 59px;
  padding: 1rem;
  position: absolute;
  bottom: 10%;
  background: #26DFA6;
  text-align: center;
  z-index: 1;
  background: #6485EC;
  button{
    color: white;
    font-weight: 500;
    font-size: 1rem;
  }
  p{
    font-size: 1.5rem;
  }
}
`;

const AllchattingList = styled.div`
max-width: 390px;
width:100%;
max-height: 844px;
`;

const ChattingListDiv = styled.div`
`;

