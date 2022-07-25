import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Modal from "../public/BasicModalForm";
import PostModal from "./PostModal";

import Like from "./Like";
import GoalForCum from "./GoalForCum"
import ListModal from "./ListModal";
import GoalChart from "../public/Goal";

import { useNavigate } from "react-router-dom";
import { getUserInfoDB } from "../../store/modules/user";
import { loadMoreContentDB, loadpostsAc, deletePostAc } from "../../store/modules/community";

import {  Young, Comment, Binheart,  SaveList } from "../../assets/icons";
import { listClasses } from "@mui/material";


const NewCommunityList = () => {

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


  
  const userinfo = useSelector((state) => state.user.infoList)
  const Postdata = useSelector((state) => state.community.postList.data);
  const Savedata = useSelector((state) => state.saved.savedItem);
  console.log(Postdata)


  return (
    <>
      <Wrap>
        {Postdata.map((postList, index) => {
          return (
            <ul key={index}>       

              <li>
                <ImageBox>
                <div>
                  <GoalChart
                  color="#26DFA6"
                  percent={postList.goalPercent}
                  //image ="https://velog.velcdn.com/images/eppo/post/c381a0b6-a326-48df-972c-693de0f6e9ac/image.png"
                  image={postList.image}
                  size="140"/>
                  </div>
                </ImageBox>
                <div className="contentForm">
                  <div onClick={() => {
                      Navigate
                        (`/detail/${postList.boardId}`,
                          { state: { name: postList } }
                        )
                    }}>
                    <p style={{fontSize:"1.5rem"}}>{postList.goalItemName}</p>
                    <div className="textArea">
                      <p style={{fontSize:"1.2rem"}}>{postList.nickname}</p>
                      {postList.contents}
                  </div>
                  </div>
                  <div className="boardInfo">
                  <div>
                  <Binheart/> {postList.likeCount}
                  <Comment/> {postList.commentCount}
                  </div>

                  <SaveList onClick={() => {
                            openModal();
                            setModalName(<SaveList/>);
                            setModalState(<ListModal
                              boardId={postList.boardId}
                              goalItemName={postList.goalItemName}
                              />)}}/>
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
          }}>내 태산 %  공유</button>
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
height: 100%;
background: #EDEDED;
display: flex;
align-items: center;
flex-direction: column;

.buttonBox{
  display: flex;
  width: 38%;
  border-radius: 30px;
  padding:1.5rem;
  position: fixed;
  bottom: 10%;
  background: #26DFA6;
  justify-content: center;

  button{
    color: white;
    font-weight: 500;
    font-size: 1rem;
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
  padding: 5px 15px;
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
  flex-direction: row;
  align-items: flex-end;
  gap: 10%;
}

`;


const ImageBox = styled.div`

  img{
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export default NewCommunityList;
