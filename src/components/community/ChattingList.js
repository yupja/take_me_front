import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Modal from "../public/BasicModalForm";
import CreateRoom from "./CreateRoom";
import ChattingInfo from "./ChattingInfo";
import ProgressBar from "../public/ProgressBar"
import { ChattingEnd } from "../../assets/icons"
import { loadChattingListRS, closedChttingListRS, myInfoData } from "../../store/modules/community"




//  소켓js , stompjs 인스톨 
//  서버와 연결할 클라이언트 connection 생성
//   메세지 전송 전 subscriber 와  publicher 지정


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
            <OnpenChattingList
                  onClick={()=>{
                    getChttingData(itemIndex);
                  }}>
              <ChattingInfo
                roomId={item.roomId}
                profileImg={item.authorProfileImg}
                userName={item.authorNickname}
                comment={item.comment}
                time={item.time} 
                currentState={"Live"}/>
            </OnpenChattingList>
            </>
          )
        })}
        </div>

        {ClosedRoomList && ClosedRoomList?.map((item, itemIndex) => (
          // <ClosedChattingList>
          //   <div className="closedRoomList" key={item.roomId}>

          //     <ul>
          //       <li>
          //         <div className="listWrap"
          //           onClick={()=>{
          //             navigate(`/chat/closedChttinglog/${item.roomId}`);
          //           }}>
          //           <div className="imageBox"><img src={item.authorProfileImg} /></div>
          //           <div className="textContents">
          //             <span style={{ fontWeight: "bold", marginRight: "5%" }}>{item.authorNickname}</span>
          //             <span>{item.comment}</span>
          //           </div>
          //           <div className="endPoint"><ChattingEnd /></div>
          //         </div>


          //       </li>
          //     </ul>

          //   </div>
          // </ClosedChattingList>

          <ChattingInfo
            roomId={item.roomId}
            profileImg={item.authorProfileImg}
            userName={item.authorNickname}
            comment={item.comment}
            time={item.time} 
            currentState={"END"}/>

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
  bottom: 30%;
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

const OnpenChattingList = styled.div`
`;

const ClosedChattingList = styled.div`
width: 100%;
display: flex;
flex-direction: column;
border: none;
box-shadow: 0px 4px 11px 0px rgb(0 0 0 / 15%);
margin-bottom: 1rem;
.listWrap{
  display: flex;
  padding: 0.5rem;
  .imageBox{
    width: 30%;
  }
  .textContents{  
    padding: 1rem;
  }
  .endPoint{
    display: flex;
    align-items: center;
  }
}
.closedRoomList{
  display: flex;
  flex-direction: row;
  
  img{
    width: 100%
  }
}
.bottonArea{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 0.5rem;
}
`;
