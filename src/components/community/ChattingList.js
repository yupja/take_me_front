import React ,{ useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Modal from "../public/BasicModalForm";
import CreateRoom from "./CreateRoom";
import ChattingInfo from "./ChattingInfo";
import ProgressBar from "../public/ProgressBar"
import {ChattingEnd} from "../../assets/icons"
import { loadChattingListRS, closedChttingLog } from "../../store/modules/community"




//  소켓js , stompjs 인스톨 
//  서버와 연결할 클라이언트 connection 생성
//   메세지 전송 전 subscriber 와  publicher 지정


function Chatting() {


  useEffect(() => {
    //dispatch(loadChattingListRS());
    dispatch(closedChttingLog());
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
  const ClodesRoomList = useSelector(((state => state.community.closedChttingLogList)));
  console.log(RoomList)
  console.log(ClodesRoomList)
  
  return (
    <>

      <Wrap>

        {/* <div>

        {RoomList&&RoomList.map((item, itemIndex) => {
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
        </div> */}

        {ClodesRoomList && ClodesRoomList?.map((item, itemIndex) => (
          <ChattingList>
            <div className="closedRoomList" key={item.roomId}>

              <ul>
                <li>
                  <div className="listWrap">
                    <div className="imageBox"><img src={item.authorProfileImg} /></div>
                    <div className="textContents">
                      <span style={{ fontWeight: "bold", marginRight: "5%" }}>{item.authorNickname}</span>
                      <span>{item.comment}</span>
                    </div>
                    <div className="endPoint"><ChattingEnd /></div>
                  </div>

                  <div className="bottonArea">
                    <span>쓰자!</span>
                    <div style={{ width: "65%" }}>
                      <ProgressBar
                        true={item.voteFalsePercent}
                        false={item.voteTruePercent} />
                    </div>

                    <span>멈춰!</span>
                  </div>

                </li>
              </ul>

            </div>
          </ChattingList>

        ))}

        <div className="buttonBox">
          <button onClick={() => {
            openModal();
            setModalName("내 태산 % 공유");
            setModalState(
              <CreateRoom close={closeModal} />)
          }}><p>내 태산 %  공유</p></button>
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



const ChattingList = styled.div`
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









