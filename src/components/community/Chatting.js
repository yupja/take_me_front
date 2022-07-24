import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Modal from "../public/BasicModalForm"
import CreateRoom from "../community/CreateRoom"

import { loadChattingListRS } from "../../store/modules/community"



//  소켓js , stompjs 인스톨 
//  서버와 연결할 클라이언트 connection 생성
//   메세지 전송 전 subscriber 와  publicher 지정


function Chatting() {

  const RoomId = "";
  const name = React.useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const RoomData = useSelector(((state => state.community.chattingList)));
  console.log(RoomData)

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalState, setModalState] = React.useState();
  const [modalName, setModalName] = React.useState("");
  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };

  React.useEffect(() => {
    dispatch(loadChattingListRS())
  }, [])


  return (
    <>
      <Wrap>

        {RoomData && RoomData.map((item, itemIndex) => {
          return (
            <>
              <ChattingList onClick={() => {
                navigate("/chatting", { state: item.roomId })
              }}>
                <img src="" />
                {item.name}
                {item.userCount}
              </ChattingList>
            </>
          )
        })}

        <ChatWrap></ChatWrap>


      </Wrap>

      <RoomCreate>

        <button type="button" onClick={() => {
          openModal();
          setModalName("쓸까?말까? 만들기")
          setModalState(
            <CreateRoom close={closeModal} />)
        }}>쓸까?말까? 만들기</button>
      </RoomCreate>
      <Modal open={modalOpen}
        close={closeModal}
        header={modalName}>
        {modalState}
      </Modal>
    </>

  )
}
export default Chatting;





const Wrap = styled.div`
width: 100%;
height: 100%;
padding: 1rem;
`;

const ChattingList = styled.div`
height: 50%;
border: 1px solid gray;
margin-bottom: 1rem;
`;

// 찬반투표 리스트
const ChatWrap = styled.div`
width: 100%;
height: 100%;
padding: 1rem;
`;


const RoomCreate = styled.div`
display: flex;
justify-content: center;
position: fixed;
width: 100%;
bottom: 45px;



button{ 
  width: 100%;
  background: #6C8BED;
  box-shadow: 0 4px 11px 0px rgba(0,0,0,0.25);
  margin: 0 10px;
  padding: 20px 0;
  border-radius:59px;
  opacity: 95%;
  font-size: 1.25rem;
  color: #fff;
}
`;
