import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Modal from "../public/BasicModalForm";
import PostModal from "./PostModal";

import Like from "./Like";
import ListModal from "./ListModal";
import GoalChart from "../goal/Goal";

import { useNavigate } from "react-router-dom";
import { getUserInfoDB } from "../../store/modules/login";
import community, { loadMoreContentDB, loadpostsAc, deletePostAc } from "../../store/modules/community";

import { Comment, Binheart, SaveList } from "../../assets/icons";


const CommunityList = () => {

  useEffect(() => {
    dispatch(loadpostsAc())
    dispatch(getUserInfoDB())
  }, [])



  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [savedListIndex, setSavedListIndex] = useState();
  const [target, setTarget] = useState(null);
  const [iLike, setILike] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState();
  const [modalName, setModalName] = useState("");
  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };



  const userinfo = useSelector((state) => state.login.infoList)
  const Postdata = useSelector((state) => state.community.postList.data);
  const Savedata = useSelector((state) => state.saved.savedItem);
  const postId = useSelector((state) => state.community.postId)
  console.log(postId);


  return (
    <>
      <Wrap>
        {Postdata.map((postList, index) => {
          return (
            <ul key={index}>

              <li>
                <ImageBox>

                  <div className="goalDiv">
                    <GoalChart color="#26DFA6" percent={postList.goalPercent} size="110" />
                  </div>

                  <div className="imgDiv">
                    <img
                      src={postList.image}
                      style={{ width: "100px", height: "100px" }} />
                  </div>

                </ImageBox>


                <div className="contentForm">
                  <div onClick={() => {
                    Navigate
                      (`/detail/${postList.boardId}`,
                        { state: { name: postList } }
                      )
                  }}>

                    <div className="textArea">
                      <span style={{ fontSize: "1.2rem" }}>{postList.goalItemName}<br />
                        <span style={{ fontSize: "1rem", fontWeight: "500" }}>{postList.nickname}</span>
                        <span>{postList.contents}</span>
                      </span>
                    </div>
                  </div>

                  <div className="boardInfo">
                    <div>
                      <Binheart /> {postList.likeCount}
                      <Comment /> {postList.commentCount}
                    </div>

                    <SaveList onClick={() => {
                      openModal();
                      setModalName(<SaveList />);
                      setModalState(<ListModal
                        boardId={postList.boardId}
                        goalItemName={postList.goalItemName}
                      />)
                    }} />
                  </div>
                </div>
              </li>

            </ul>

          );

        })}

        <div className="buttonBox">
          <button onClick={() => {
            openModal();
            setModalName("내 태산 % 공유");
            setModalState(<PostModal close={closeModal} />)
          }}><p>내 태산 %  공유</p></button>
        </div>
      </Wrap>

      <Modal
        open={modalOpen}
        close={closeModal}
        header={modalName}>
        {modalState}
      </Modal>
    </>
  )
}

const Wrap = styled.div`
width: 100%;
max-height: 565px;
height: 100%;
background: #EDEDED;
display: flex;
align-items: center;
flex-direction: column;
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

  button{
    color: white;
    font-weight: 500;
  }
  p{
    font-size: 1.5rem;
  }
}

ul{
  width: 100%;
  height: 25vh;
}


li{
  background: white;
  height: 85%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4% 0 4% 4%;

}

.contentForm{
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 20px;
  padding: 1rem;
  .boardInfo{
    display: flex;
    align-items: center;
    justify-content: space-between;
    div{
      display: flex;
      gap: 10px;
    }
  }

}
.textArea{
  display: flex;
  flex-direction: column;
  height: 50px;
  flex-direction: row;
  align-items: flex-end;
  gap: 10%;
  overflow-y:scroll;
}

`;


const ImageBox = styled.div`
width: 150px;
display: flex;
justify-content: center;
align-items: center;
position: relative;
.goalDiv{
    position: absolute;
    z-index: 1;

  }
.imgDiv{
  overflow: hidden;
  border-radius:50%;
  position: relative;
}



`;

export default CommunityList;
