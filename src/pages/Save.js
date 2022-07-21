import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myReadGoalRQ, deleteGoalRQ } from "../store/modules/goal"
import {addSavedListRQ} from "../store/modules/saved"
import { myFavoriteListRQ, favoriteDel,addFavoriteRQ } from "../store/modules/favorite";

import DayModal from "../components/DayModal";
import SearchSavedItem from "../components/SearchSavedItem";
import HeaderMenu from "../components/HeaderMenu";
import DountChart from "../components/Goal";
import GoalInput from "../components/GoalInput"
import CurrentSavedItem from "../components/CurrentSavedItem";
import PostModal from "../components/PostModal";


import styled from "styled-components";
import "../styles/saveMain.css"
import { FaRegEdit } from 'react-icons/fa'
import {ReactComponent as CheckedStart} from "../assets/icons/CheckedStart.svg"



import { IoArrowRedoOutline } from 'react-icons/io5'
import { AiOutlineStar } from 'react-icons/ai'




function Save() {

  const isLogin = useSelector((state=> state.user.isLogin));
  
  useEffect(() => {
    dispatch(myReadGoalRQ());
    dispatch(myFavoriteListRQ());
  }, [isLogin]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState();
  const [modalName, setModalName] = useState("");

  const [selectInputValue , setSelectInputValue] = useState([]); 

  const dispatch = useDispatch();

  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };

  
  const [ star, setStar] = useState(false);

  const changeStar = () =>{
    if(star){
      setStar(false);
    }else{
      setStar(true);
    }
  }


  const myGoalList = useSelector((state=> state.goal.myGoalList));
  const goal = {
    goalImage : myGoalList?.image,
    goalItemId : myGoalList?.goalItemId,
    goalPercent : (myGoalList?.goalPercent)*0.01,
    goalitemName: myGoalList?.itemName
  }



  const mylist = useSelector((state) => state.favorite.myFavoriteList);



  const title = "데일리 티끌"
  const priceInput = useRef();

  //api/savedItem, 기존에 있던 아이템으로 티끌 등록
  const addSaveData = () =>{
    let sendData ={
        itemId : selectInputValue.itemId,
        price :priceInput.current.value,
        goalItemId: goal.goalItemId
      }
      dispatch(addSavedListRQ(sendData));
      
      if(star){
        sendData ={
          itemId : selectInputValue.itemId,
          categoryId:selectInputValue.categoryId,
          price :priceInput.current.value,
          goalItemId: goal.goalItemId
        }
        dispatch(addFavoriteRQ(sendData))
      }

    setSelectInputValue([])
  }


  const addFavoriteSaved = (itemIndex)=>{
    let sendData={
        itemId : mylist[itemIndex].itemId,
        price :mylist[itemIndex].price,
        goalItemId: goal.goalItemId
      }
    
    dispatch(addSavedListRQ(sendData));
  }
//

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
            <div>
              <DountChart color="#26DFA6" percent={goal.goalPercent} size="200">
                <CircleInner>으아아아아아아</CircleInner>
              </DountChart>
            </div>
            
            
            
              <div className="circle" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
                <div className="isGoalSubmenuBox">
               
                  <div>
                    <FaRegEdit size="15" />
                    <p onClick={() => {
                        openModal();
                        setModalName("태산 수정하기!")
                        setModalState(<GoalInput 
                                        state={"Update"}
                                        goalItemId={goal.goalItemId}
                                        closeModal={closeModal}/>)
                      }}>목표 변경</p>
                  </div>
                  <button onClick={()=>{
                    dispatch(deleteGoalRQ(goal.goalItemId))
                  }}>삭제하기</button>
                  <div>
                    <IoArrowRedoOutline size="15" />
                    <p onClick={() => {
                      openModal();
                      setModalName("내 태산 % 공유");
                      setModalState(<PostModal 
                        image={goal.goalImage} 
                        percent={goal.goalPercent}
                        closeModal={closeModal}/>)
                      }}>내 현황 공유</p>
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
        {mylist&&mylist.length===0? 
        <NonFavoriteItem><CheckedStart/>즐겨찾기를 등록하고 편하게 사용해보세요!</NonFavoriteItem>
        :
          <> 
            {mylist&&mylist?.map((item, itemIndex) => {
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
          <StarArea onClick={()=>{ changeStar();}}>
              {star? 
                <CheckedStart/>
                :  
                <AiOutlineStar/>
              }
            </StarArea>
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
export default Save;

const StarArea =styled.div`
display: flex;
width: 5vh;
`;

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


const CircleInner = styled.div`
position: absolute;
top: 50%; left: 50%;
transform: translate(-50%, -50%);
`;


const SearchArea = styled.div`
padding: 0.2rem;
width: 95%;
height: 5vh;
display: flex;
flex-direction: column;
`;

const FavoriteTag = styled.div`
height: 8vh;
display: flex;
align-items: center;
width:95%;
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
justify-content: space-between;;
height: 2%;
width: 95%;
border-bottom: 1px solid #D9D9D9;
padding: 1rem;

input{
  margin-left: 10px;
  width: 60%;
  background: #D9D9D9;
  text-align: center;
  border: none;
  border-radius: 20px;
}

button{
  margin-left:10px;
  background: #26DFA6;
  padding: 5px;
  border-radius: 20px;
  color: white;
}

`;


