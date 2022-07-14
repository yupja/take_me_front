import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myReadGoalRQ, deleteGoalRQ } from "../redux/modules/goal"
import {addSavedListRQ} from "../redux/modules/saved"
import { myFavoriteListRQ, favoriteDel } from "../redux/modules/favorite";

import DayModal from "../components/DayModal";
import SearchSavedItem from "../components/SearchSavedItem";
import HeaderMenu from "../components/HeaderMenu";
import DountChart from "../components/Goal";
import GoalInput from "../components/GoalInput"
import CurrentSavedItem from "../components/CurrentSavedItem";
import PostModal from "../components/PostModal";


import styled from "styled-components";
import "../public/css/saveMain.css"
import { FaRegEdit } from 'react-icons/fa'
import {ReactComponent as CheckedStart} from "../public/img/svg/CheckedStart.svg"

import { IoArrowRedoOutline } from 'react-icons/io5'


function Save() {

  useEffect(() => {
    dispatch(myReadGoalRQ());
    dispatch(myFavoriteListRQ());
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState();
  const [modalName, setModalName] = useState("");
  const [showPostModal, setShowPostModal] = useState("");

  const [selectInputValue , setSelectInputValue] = useState([]); 

  const dispatch = useDispatch();

  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };
  const openPostModal = () => {setShowPostModal(true)};
  const closePostModal = () => {setShowPostModal(false)};
  


  const myGoalList = useSelector((state=> state.goal.myGoalList));

  console.log("태산", myGoalList );
  
  const goal = {
    goalImage : myGoalList.data?.image,
    goalItemId : myGoalList.data?.goalItemId,
    goalPercent : (myGoalList.data?.goalPercent)*0.01,
    goalitemName: myGoalList.data?.itemName
  }



  const mylist = useSelector((state) => state.favorite.myFavoriteList);
  console.log("즐겨찾기", mylist)


  const title = "데일리 티끌"
  const priceInput = useRef();

  //api/savedItem, 기존에 있던 아이템으로 티끌 등록
  const addSaveData = () =>{
    const sendData ={
        itemId : selectInputValue.itemId,
        price :priceInput.current.value,
        goalItemId: goal.goalItemId
      }
      
    dispatch(addSavedListRQ(sendData));
    setSelectInputValue([])
  }


  const addFavoriteSaved = (itemIndex)=>{
    let sendData={}

    if(goal.goalitemName=== "이름 없음"){
      sendData ={
        itemId : mylist.data[itemIndex].itemId,
        price :mylist.data[itemIndex].price,
        goalItemId: -1
      }
    }else{
      sendData ={
        itemId : mylist.data[itemIndex].itemId,
        price :mylist.data[itemIndex].price,
        goalItemId: goal.goalItemId
      }
    }
    dispatch(addSavedListRQ(sendData));
  }


  return (
    <div className="wrap">
      <TopWrap>
        <HeaderMenu title={title} />
        <GoalMain>
          {goal.goalitemName=== "이름 없음" ?
            <>  <Circle onClick={() => {
              openModal();
              setModalName("내 태산 만들기!")
              setModalState(<GoalInput state={"ADD"}
                              closeModal={closeModal}/>)
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
                    <p onClick={() => {
                        openModal();
                        setModalName("태산 수정하기!")
                        setModalState(<GoalInput 
                                        state={"Update"}
                                        goalItemId={goal.goalItemId}/>)
                      }}>목표 변경</p>
                  </div>
                  <button onClick={()=>{
                    dispatch(deleteGoalRQ(goal.goalItemId))
                  }}>삭제하기</button>
                  <div>
                    <IoArrowRedoOutline size="15" />
                    <p onClick={() => {
                      openPostModal();
                      }}>내 현황 공유</p>
                    {showPostModal ?
                      <PostModal showModalll={showPostModal} closeModalll={closePostModal}/>
                      : null}
                  </div>
                </div>
              </div>
              <p className="goalTitle">{goal.goalitemName} {Math.floor(goal.goalPercent*100)}%</p>
            </>
          }
        </GoalMain>
      </TopWrap>

      <SearchArea>
        <SearchSavedItem setSelectInputValue={setSelectInputValue}
                         state={"saveState"}
                         goalItemId={goal.goalItemId}/>
      </SearchArea>

      <FavoriteTag>
        {mylist.data&&mylist.data.length===0? 
        <NonFavoriteItem><CheckedStart/>즐겨찾기를 등록하고 편하게 사용해보세요!</NonFavoriteItem>
        :
          <> 
            {mylist.data&&mylist.data?.map((item, itemIndex) => {
              return(<>
                <FavoriteItem 
                  key={item.favoriteItemId}
                  onClick={()=>{addFavoriteSaved(itemIndex)}}>
                    {item.itemName}
                </FavoriteItem>
                <button onClick={()=>{dispatch(favoriteDel(item.favoriteItemId))}}>x</button>
                </>
            )})}
            </>
        }
      </FavoriteTag>

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
font-family: 'HS-Regular'
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


const SearchArea = styled.div`
padding: 0.2rem;
width: 95%;
height: 5vh;
display: flex;
flex-direction: column;
`;

const FavoriteTag = styled.div`
height: 7vh;
display: flex;
align-items: center;
width:350px;
overflow-x:scroll;
justify-content: center;
white-space: nowrap;
border-bottom: 1px solid #EFEFEF;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const NonFavoriteItem = styled.div`
display: flex;
`;


const FavoriteItem = styled.div`
margin-top: 5px;
display :inline-block;
background: #EFEFEF;
border-radius: 20px;
font-size: 15px;
padding: 5px;
margin-left: 10px;
`;



const AddSavedStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2%;
`;

export default Save;