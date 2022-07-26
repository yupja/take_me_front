import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Modal from "../public/BasicModalForm";
import CreateRoom from "./CreateRoom";
import ChattingInfo from "./ChattingInfo";
import { loadChattingListRS, closedChttingListRS, myInfoData } from "../../store/modules/community"


function Chatting() {


  useEffect(() => {
    dispatch(loadChattingListRS());
    dispatch(closedChttingListRS());
    dispatch(myInfoData())
  }, [])

  const RoomId = "";
  const name = React.useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let sendData={}



  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalState, setModalState] = React.useState();
  const [modalName, setModalName] = React.useState("");
  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };




  const RoomList = useSelector(((state => state.community.chattingList)));
  const ClosedRoomList = useSelector(((state => state.community.closedChttingList)));
  const userInfo = useSelector((state)=>state.community.myInfo)
  console.log(ClosedRoomList)

  const getChttingData =(index)=>{
  sendData ={
    roomId:RoomList[index].roomId,
    sender : userInfo.nickname,
    profileImg: userInfo.profileImg,
    authorNickname : RoomList[index].authorNickname,
    authorProfileImg : RoomList[index].authorProfileImg,
    userCount : RoomList[index].userCount,
    comment : RoomList[index].comment,
    createdAt:RoomList[index].createdAt,
    timeLimit:RoomList[index].timeLimit
  }

  navigate(`/chat/roomdetail/${sendData.roomId}`, {state:sendData});

  }


  return (
    <>

      <Wrap>

        <AllchattingList>

        <div>
        {RoomList&&RoomList.map((item, itemIndex) => {
          return (
            <>
            <ChattingList>
              <ChattingInfo
                roomId={item.roomId}
                profileImg={item.authorProfileImg}
                userName={item.authorNickname}
                comment={item.comment}
                time={item.time} 
                currentState={"Live"}
                onClick={()=>{
                  getChttingData(itemIndex);
                }}/>
            </ChattingList>
            </>
          )
        })}
        </div>

        {ClosedRoomList && ClosedRoomList?.map((item, itemIndex) => (
          <ChattingList
            onClick={() => {
             navigate(`/chat/closedChttinglog/${item.roomId}`);
            }}>
            <ChattingInfo
              roomId={item.roomId}
              profileImg={item.authorProfileImg}
              userName={item.authorNickname}
              comment={item.comment}
              time={item.time}
              currentState={"END"} />
          </ChattingList>

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
export default Chatting;


const Wrap = styled.div`
display: flex;
justify-content: center;
width: 100%;
height: 100%;
padding: 1rem;
flex-direction: column;
align-items: center;


.buttonBox{
  display: flex;
  width: 90%;
  border-radius: 30px;
  padding:1rem;
  position: fixed;
  bottom: 10%;
  background: #6485EC;
  justify-content: center;
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

const ChattingList = styled.div`
`;


