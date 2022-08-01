import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { myReadGoalRQ } from "../store/modules/goal"
import { addSavedListRQ } from "../store/modules/saved"
import { myFavoriteListRQ, favoriteDel, addFavoriteRQ } from "../store/modules/favorite";

import Modal from "../components/public/BasicModalForm";
import SearchSavedItem from "../components/public/SearchItems";
import Header from "../components/public/Header";

import CurrentSavedItem from "../components/saved/CurrentSavedItem";

import Guide from "../components/community/Guide"
import { useNavigate } from "react-router-dom";

import NonGoal from "../components/goal/NonGoal"
import GoalInfo from "../components/goal/GoalInfo";

import styled from "styled-components";

import "../styles/saveMain.css"
import { CheckedStart, AddMintPoint } from "../assets/icons"
import { AiOutlineStar } from 'react-icons/ai'





function Save() {
  const navigate  = useNavigate();

  useEffect(() => {

      if(!localStorage.getItem("accessToken")){
        navigate("/main")
      }
    dispatch(myReadGoalRQ());
    dispatch(myFavoriteListRQ());
    if (state.state?.signupUrl.state && state.state?.loginUrl) {
      setShowModal(true)
    } else {
      setShowModal(false)
    }
    // openGuide();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState();
  const [modalName, setModalName] = useState("");

  const [selectInputValue, setSelectInputValue] = useState([]);
  const [newAdd, setNewAdd] = useState(false);


  const dispatch = useDispatch();

  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };

  const [showModal, setShowModal] = useState(false);

  const openGuide = () => {
    setShowModal(true)
  }
  const closeGuide = () => {
    setShowModal(false);
  }

  const state = useLocation();

  const [star, setStar] = useState(false);

  const changeStar = () => {
    if (star) {
      setStar(false);
    } else {
      setStar(true);
    }
  }


  const myGoalList = useSelector((state => state.goal.myGoalList));
  const goal = {
    goalImage: myGoalList?.image,
    goalItemId: myGoalList?.goalItemId,
    goalPercent: (myGoalList?.goalPercent) * 0.01,
    goalitemName: myGoalList?.itemName
  }

  const mylist = useSelector((state) => state.favorite.myFavoriteList);

  const title = "데일리 티끌"
  const priceInput = useRef();

  //api/savedItem, 기존에 있던 아이템으로 티끌 등록
  const addSaveData = () => {
    let sendData = {
      itemId: selectInputValue.itemId,
      price: priceInput.current.value,
      goalItemId: goal.goalItemId
    }
    dispatch(addSavedListRQ(sendData));

    if (star) {
      sendData = {
        itemId: selectInputValue.itemId,
        categoryId: selectInputValue.categoryId,
        price: priceInput.current.value,
        goalItemId: goal.goalItemId
      }
      dispatch(addFavoriteRQ(sendData))
    }

    setSelectInputValue([])
  }


  const addFavoriteSaved = (itemIndex) => {
    let sendData = {
      itemId: mylist[itemIndex].itemId,
      price: mylist[itemIndex].price,
      goalItemId: goal.goalItemId
    }

    dispatch(addSavedListRQ(sendData));
  }
  //


  return (
    <Wrap>
      <TopWrap>
        <>
        <HeaderArea><Header title={title} tColor={"#ffffff"} /></HeaderArea>

        {goal.goalitemName === "이름 없음" ?
          <NonGoal 
            openModal={openModal}
            closeModal={closeModal}
            setModalName={setModalName}
            setModalState={setModalState}/>
          :
          <GoalInfo
            myGoalList={myGoalList}
            openModal={openModal}
            closeModal={closeModal}
            setModalName={setModalName}
            setModalState={setModalState}/>
          }
          </>
    
      </TopWrap>


      <SearchArea>
        <SearchSavedItem
          setSelectInputValue={setSelectInputValue}
          setNewAdd={setNewAdd}
          actionState={"Save"}
          state={"오늘은 어떤 것을 아끼셨나요?"}
          goalItemId={goal.goalItemId} />
      </SearchArea>

      <div className="favoriteDiv" 
        style={{
          display:"flex",
          justifyContent:"center"}}>

      <FavoriteTag>
        {mylist && mylist.length === 0 ?
          <NonFavoriteItem>
            <div><CheckedStart /></div>
            <p>즐겨찾기를 등록하고 편하게 사용해보세요!</p>
          </NonFavoriteItem>
          :
          <>
            {mylist && mylist?.map((item, itemIndex) => {
              return (<>
                <FavoriteItem
                  key={item.favoriteItemId}
                  onClick={() => { addFavoriteSaved(itemIndex) }}>
                  {item.itemName}
                </FavoriteItem>
                <button onClick={() => { dispatch(favoriteDel(item.favoriteItemId)) }}>x</button>
              </>
              )
            })}
          </>
        }
      </FavoriteTag>
      </div>


      {selectInputValue.length !== 0 ?
        <>
          <AddSavedStyle>
            <ul>
              <li>
                <div className="leftBox">
                  <StarArea onClick={() => { changeStar(); }}>
                    {star ?
                      <CheckedStart />
                      :
                      <AiOutlineStar />
                    }
                  </StarArea>


                  <p>{selectInputValue.itemName}</p>
                </div>

                <div className="inputBox">
                  <input
                    type="Number"
                    ref={priceInput} 
                    placeholder={selectInputValue.itemDefaultPrice}
                    />
                  <button onClick={addSaveData}><AddMintPoint /></button>
                </div>

              </li>
            </ul>
          </AddSavedStyle>
        </>
        : ""}



      <CurrentSavedItem goalItemId={goal.goalItemId} />

      <Modal open={modalOpen}
        close={closeModal}
        header={modalName}>
        {modalState}
      </Modal>
      {/* 가이드 모달 */}
      {showModal ?
        <Guide
          open={showModal}
          close={closeGuide}
        />
        : null}
    </Wrap>
  );
}
export default Save;



const Wrap = styled.div`
width:100%;
height: 100%;
/* position: relative; */
/* z-index: 1; */
`;

const HeaderArea = styled.div`
width: 100%;
position: absolute;
z-index: 1;
`;

const TopWrap = styled.div`
width: 100%;
height: 40vh;
position: relative;
`;

const StarArea = styled.div`
display: flex;
width: 5vh;
`;



const SearchArea = styled.div`
padding: 0.5rem 1rem 0rem 1rem;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
`;

const FavoriteTag = styled.div`
padding : 0.5rem 0 0.5rem 2rem ;
display: flex;
align-items: center;
width:95%;
overflow-x:scroll;

white-space: nowrap;

border-bottom: 1px solid #CCCCCC;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NonFavoriteItem = styled.div`
display: flex;
gap: 5%;
justify-content: center;
p{
  color: #26DFA6;
  
}
`;


const FavoriteItem = styled.div`
background: #EFEFEF;
border-radius: 20px;
font-size: 15px;
padding: 5px;
margin-left: 10px;
`;



const AddSavedStyle = styled.div`
display: flex;
flex-direction: column;
width: 100%;
ul{
  padding: 0 10px;
}
li{
  display: flex;
  justify-content: space-around;;
  align-items: center;
  border-bottom: 1px solid #CCCCCC;
  padding: 3%;
}
.leftBox{
  display: flex;
  justify-content: space-around;;
  align-items: center;
}
input{
  border-radius: 30px;
  background: #F4F4F4;
  border: none;
}
.inputBox{
  display: flex;
  align-content: center;
  gap: calc();
  input{
    text-align: center;
  }
}
`;