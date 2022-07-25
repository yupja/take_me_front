import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Modal from "../public/BasicModalForm"
import CreateRoom from "../community/CreateRoom"
import ChattingInfo from "./ChattingInfo";
import { loadChattingListRS, closedChttingLog } from "../../store/modules/community"




//  소켓js , stompjs 인스톨 
//  서버와 연결할 클라이언트 connection 생성
//   메세지 전송 전 subscriber 와  publicher 지정


const RoomData = [
  {
    roomId: "ae8d8cb1-0a9a-43da-90c4-084df62c78ab",
    username: "eppo",
    comment: "지금 비가 너무 많이와서 걷기 싫은데 택시탈까?",
    profileImg: "https://velog.velcdn.com/images/eppo/post/9fa16a22-a5e5-4675-9d4b-fbcb5c93be28/image.png",
    time: "6m"
  },
  {
    roomId: "ae8d8cb1-0a9a-43da-90c4-084df62c78ab",
    username: "eppo",
    comment: "지금 비가 너무 많이와서 걷기 싫은데 택시탈까?",
    profileImg: "https://velog.velcdn.com/images/eppo/post/9fa16a22-a5e5-4675-9d4b-fbcb5c93be28/image.png",
    time: "5m"
  },
  {
    roomId: "ae8d8cb1-0a9a-43da-90c4-084df62c78ab",
    username: "eppo",
    comment: "지금 비가 너무 많이와서 걷기 싫은데 택시탈까?",
    profileImg: "https://velog.velcdn.com/images/eppo/post/9fa16a22-a5e5-4675-9d4b-fbcb5c93be28/image.png",
    time: "9m"
  },
  {
    roomId: "ae8d8cb1-0a9a-43da-90c4-084df62c78ab",
    username: "eppo",
    comment: "지금 비가 너무 많이와서 걷기 싫은데 택시탈까?",
    profileImg: "https://velog.velcdn.com/images/eppo/post/9fa16a22-a5e5-4675-9d4b-fbcb5c93be28/image.png",
    time: "10m"
  },
  {
    roomId: "ae8d8cb1-0a9a-43da-90c4-084df62c78ab",
    username: "eppo",
    comment: "지금 비가 너무 많이와서 걷기 싫은데 택시탈까?",
    profileImg: "https://velog.velcdn.com/images/eppo/post/9fa16a22-a5e5-4675-9d4b-fbcb5c93be28/image.png",
    time: "6m"
  },
]



function Chatting() {




  const RoomId = "";
  const name = React.useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //const RoomData = useSelector(((state => state.community.chattingList)));
  //console.log(RoomData)

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalState, setModalState] = React.useState();
  const [modalName, setModalName] = React.useState("");
  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };

  React.useEffect(() => {
    dispatch(loadChattingListRS());
    dispatch(closedChttingLog());
  }, [])


  return (
    <>

      <Wrap>

        {RoomData && RoomData.map((item, itemIndex) => {
          return (
            <>
              <ChattingInfo
                roomId={item.roomId}
                profileImg={item.profileImg}
                userName={item.username}
                comment={item.comment}
                time={item.time} />
            </>
          )
        })}




      </Wrap>


      <BtnBox>
        <FootBtn onClick={() => {
          openModal();
          setModalName("쓸까?말까? 만들기")
          setModalState(
            <CreateRoom close={closeModal} />)
        }}>
          쓸까?말까? 만들기
        </FootBtn>
      </BtnBox>

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

const BtnBox = styled.div`
width: 100%;
height: 8vh;
margin: 0 auto;
display: flex;
justify-content: center;
align-items: center;
bottom: 5%;
position: fixed;
/* left: 39% */
`;

const FootBtn = styled.button`
width: 90%;
height: 8vh;
border-radius: 2rem;
border: none;
font-size: 1.3rem;
color: white;
font-weight: 500;
background-color: #6A8EFF;
box-shadow: 5px 5px 5px rgb(110, 110, 110, 0.4);
opacity: 95%;
`;
