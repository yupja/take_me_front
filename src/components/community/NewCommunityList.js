import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ListModal from "./ListModal";
import Modal from "../public/BasicModalForm";
import PostModal from "./PostModal";

import Like from "./Like";
import GoalForCum from "./GoalForCum"
import DountChart from "../public/Goal";

import { useNavigate } from "react-router-dom";
import { getUserInfoDB } from "../../store/modules/user";
import { loadMoreContentDB, loadpostsAc, deletePostAc } from "../../store/modules/community";

import { Receipt, Dot, Comment } from "../../assets/icons/Receipt.svg";


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
             <img src={postList.image}/>
              <li>
                <div>
                <h1>{postList.goalItemName}</h1>
                <p className="contentForm">{postList.nickname}
                  <p>{postList.contents}</p>
                </p>


                </div>

              </li>
            </ul>

          );

        })}

      </Wrap>

      <Modal
        open={modalOpen}
        close={closeModal}
        header={"내 태산 % 공유"}>
        {<PostModal close={closeModal} />}
      </Modal>
    </>
  )
}

const Wrap = styled.div`
width: 100%;
height: 100%;
background: #EDEDED;

ul{

  padding: 0 10px;
}
li{
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 15px;
}

.contentForm{
  display: flex;
}

`;

export default NewCommunityList;
