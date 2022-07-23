import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Modal from "../public/BasicModalForm"
import CreateRoom from "../community/CreateRoom"

import {loadChattingListRS } from "../../store/modules/community"
import {ReactComponent as Timer} from "../../assets/icons/Timer.svg";



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
    time: "6m"
  },
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
    time: "6m"
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
  
  //const RoomData = useSelector(((state=> state.community.chattingList)));
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
              <ChattingList onClick={()=>{
                navigate("/chatting", {state:item.roomId})
              }}>
                <div className="chatInfoArea">
                  <img src={item.profileImg} />
                  <div style={{display:"flex"}}>
                    <span>
                      <p style={{fontWeight:"500" , fontSize:"1.2rem"}}>{item.username}</p> {item.comment}</span>
                   
                  </div>
                  <div style={{fontWeight:"500"}}><Timer/>{item.time}</div>
                </div>
                <div className="buttonArea">
                  <button>쓸까?</button>
                  <button>말까?</button>
                </div>
              </ChattingList>
            </>
          )
        })}


      </Wrap>

      <RoomCreate>

        <button type="button" onClick={() => {
          openModal();
          setModalName("쓸까?말까? 만들기")
          setModalState(
          <CreateRoom close={closeModal}/>)
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
width: 100%;
display: flex;
flex-direction: column;
border: none;
box-shadow: 0px 4px 11px 0px rgb(0 0 0 / 15%);
padding: 1rem;
margin-bottom: 1rem;

div{
  gap: 5px;
}
.chatInfoArea{
  display: flex;
  flex-direction: row;
}
.buttonArea{
  margin-top: 5%;
  width: 100%;
  display: flex;
  justify-content: space-around;

  button{
  width: 50%;
  padding: 0.5rem;
  border-radius: 30px;
  border: 1px solid #26DFA6;
  color: #26DFA6;

  }
}
`;


const RoomCreate = styled.div`
display: flex;
justify-content: center;
position: fixed;
width: 100%;
bottom: 20%;

button{
    width: 80%;
    background: #FFB7D9;
    color: white;
    padding: 1rem;
    border-radius:30px;
}

`;
