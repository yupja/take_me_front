import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myReadGoalRQ } from "../redux/modules/goal"
import {addSavedListRQ} from "../redux/modules/saved"

import DayModal from "../components/DayModal";
import SearchSavedItem from "../components/SearchSavedItem";
import HeaderMenue from "../components/HeaderMenu";
import DountChart from "../components/Goal";
import GoalADD from "../components/GoalAdd"
import CurrentSavedItem from "../components/CurrentSavedItem";


import styled from "styled-components";
import "../public/css/saveMain.css"
import { FaRegEdit } from 'react-icons/fa'
import { IoArrowRedoOutline } from 'react-icons/io5'


function Save() {
  useEffect(() => {
    dispatch(myReadGoalRQ());
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState();
  const [modalName, setModalName] = useState("");

  const [isGoalItem, setGoalItem] = useState(-1);
  const [selectInputValue , setSelectInputValue] = useState([]); 

  const dispatch = useDispatch();

  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };

  const myGoalList = useSelector((state=> state.goal.myGoalList));
  const goal = {
    goalImage : myGoalList.data?.image,
    goalItemId : myGoalList.data?.goalItemId,
    goalPercent : (myGoalList.data?.goalPercent)*0.01,
    goalitemName: myGoalList.data?.itemName
  }

  const state = "데일리 티끌"
  const priceInput = useRef();

  const addSaveData = () =>{
    let sendData={}

    if(myGoalList.length===0){
        sendData ={
        itemId : selectInputValue.itemId,
        price :priceInput.current.value,
        goalItemId:-1
      }
      
    }else{
      sendData ={
        itemId : selectInputValue.itemId,
        price :priceInput.current.value,
        goalItemId: goal.goalItemId
      }

    }

    dispatch(addSavedListRQ(sendData));
    setSelectInputValue([])
  }

  return (
    <div className="wrap">
      <TopWrap>
        <HeaderMenue state={state} />
        <GoalMain>
          {myGoalList.data==null?
            <>  <Circle onClick={() => {
              openModal();
              setModalName("내 목표 만들기!")
              setModalState(<GoalADD />)
            }}>
              <p className="circleInP">+ 태산 만들기!</p>
            </Circle>
              <p className="goalTitle">티끌모아 태산!</p>
            </>
            :
            <>
              <DountChart color="#26DFA6" image={goal.goalImage} percent={goal.goalPercent} size="200" />
              <div className="circle" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
                <div className="isGoalSubmenuBox">
                  <div>
                    <FaRegEdit size="15" />
                    <p>목표 변경</p>
                  </div>
                  <div>
                    <IoArrowRedoOutline size="15" />
                    <p>내 현황 공유</p>
                  </div>
                </div>
              </div>
              <p className="goalTitle">{goal.goalitemName} {goal.goalPercent*100}%</p>
            </>
          }
        </GoalMain>
      </TopWrap>

      <FavoriteArea>
        <SearchSavedItem setSelectInputValue={setSelectInputValue}
                         state={"saveState"}/>
      </FavoriteArea>

      {selectInputValue.length!==0? 
        <>      
        <AddSavedStyle>
          <div>⭐</div>
          <p>{selectInputValue.itemName}</p>
            <div>
              <input 
                type="Number"
                ref={priceInput}/>
              <button onClick={addSaveData}>등록</button>
            </div>
        </AddSavedStyle>
      </>
      :""}

     
      <CurrentSavedItem goalItemId={goal.goalItemId}/>
        
        <DayModal open={modalOpen}
        close={closeModal}
        header={modalName}>
        {modalState}
        </DayModal>
      </div>
  );
}

const TopWrap = styled.div`
display: flex;
width: 100%;
height: 45vh;
padding: 10px;
flex-direction: column;
background: #EFEFEF;
align-items: center;
`;

const GoalMain = styled.div`

display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
height: 100%;

`;

const Circle = styled.div`
width: 180px;
height: 180px;
border-radius: 50%;
background:  #26DFA6;
color : white;

display: flex;
align-items: center;
justify-content: center;
`;


const FavoriteArea = styled.div`
padding: 0.2rem;
width: 95%;
height: 10vh;
display: flex;
flex-direction: column;
`;




const AddSavedStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2%;
`;

export default Save;