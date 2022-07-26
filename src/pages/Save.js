import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myReadGoalRQ, deleteGoalRQ } from "../store/modules/goal"
import { addSavedListRQ } from "../store/modules/saved"
import { myFavoriteListRQ, favoriteDel, addFavoriteRQ } from "../store/modules/favorite";

import Modal from "../components/public/BasicModalForm";
import SearchSavedItem from "../components/public/SearchItems";
import Header from "../components/public/Header";
import DountChart from "../components/public/Goal";
import GoalInput from "../components/saved/GoalInput"
import CurrentSavedItem from "../components/saved/CurrentSavedItem";
import GoalModifyComponunt from "../components/saved/GoalModify";
import PostModal from "../components/community/PostModal";


import styled from "styled-components";
import Slider from "react-slick";
import "../styles/saveMain.css"
import {
  CheckedStart, GoalModify, WhiteTrash,
  AddMintPoint, WhiteShare
} from "../assets/icons"


import { AiOutlineStar } from 'react-icons/ai'
import { useNavigate } from "react-router-dom";




function Save() {
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(myReadGoalRQ());
    dispatch(myFavoriteListRQ());
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState();
  const [modalName, setModalName] = useState("");

  const [selectInputValue, setSelectInputValue] = useState([]);
  const [newAdd, setNewAdd] = useState(false);

  const [touchSetMenu, setTouchSetMenu] = useState(false)

  const dispatch = useDispatch();

  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };


  const [star, setStar] = useState(false);

  const changeStar = () => {
    if (star) {
      setStar(false);
    } else {
      setStar(true);
    }
  }

  const changeMenu = () => {
    if (touchSetMenu) {
      setTouchSetMenu(false)
    } else if (!touchSetMenu) { setTouchSetMenu(true) }
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Wrap>
      <TopWrap>
        <HeaderArea><Header title={title} color="#FFFFFF" /></HeaderArea>

        {goal.goalitemName === "이름 없음" ?
          <>
            <InitGoalArea>
              <Circle onClick={() => {
                openModal();
                setModalName("내 태산 만들기!")
                setModalState(
                  <GoalInput
                    state={"ADD"}
                    closeModal={closeModal} />)
              }}>
                <NonGoalInnerCicle>
                  <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>티끌모아 태산!</p>
                  <p>+ 태산 만들기!</p>
                </NonGoalInnerCicle>
              </Circle>

            </InitGoalArea>
          </>
          :
          <>
            <GoalImage src={goal.goalImage} />
            <StyledSlider {...settings}>
              <div style={{ backgroundColor: "transparent" }}></div>
              <GoalMain onClick={() => { changeMenu() }}>
                <MiddleMenue>
                  <div>
                    <DountChart
                      color="#26DFA6"
                      percent={goal.goalPercent}
                      size="200" />
                  </div>
                  {touchSetMenu ?
                    <GoalInfo>
                      <div style={{ display: "flex", alignItems: "center", color: "white", gap: "10px" }}>

                        <div style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "5px"
                        }}
                          onClick={() => {
                            openModal();
                            setModalName("태산 수정하기!")
                            setModalState(<GoalModifyComponunt
                              goalItemId={goal.goalItemId}
                              closeModal={closeModal} />)
                          }}>
                          <GoalModify />
                          <p className="clickMenuFont">목표변경</p>
                        </div>

                        <div style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "5px"
                        }}
                          onClick={() => {
                            openModal();
                            setModalName("내 태산 % 공유");
                            setModalState(<PostModal
                              image={goal.goalImage}
                              percent={goal.goalPercent}
                              closeModal={closeModal} />)
                          }}>
                          <WhiteShare />
                          <p className="clickMenuFont">공유</p>
                        </div>

                        <div style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "5px"
                        }}
                          onClick={() => {
                            dispatch(deleteGoalRQ(goal.goalItemId))
                          }}>
                          <WhiteTrash />
                          <p className="clickMenuFont">목표삭제</p>
                        </div>

                      </div>

                    </GoalInfo>
                    :
                    <>

                      <GoalInfo>
                        <p>{Math.floor(goal.goalPercent * 100)}%</p>
                        <p style={{ fontSize: "1rem" }}>{goal.goalitemName}</p>
                      </GoalInfo>
                    </>
                  }

                </MiddleMenue>

              </GoalMain>
            </StyledSlider>
          </>}
      </TopWrap>

      <SearchArea>
        <SearchSavedItem
          setSelectInputValue={setSelectInputValue}
          setNewAdd={setNewAdd}
          actionState={"Save"}
          state={"오늘은 어떤 것을 아끼셨나요?"}
          goalItemId={goal.goalItemId} />
      </SearchArea>

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
                    ref={priceInput} />
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
    </Wrap>
  );
}
export default Save;

const GoalInfo = styled.div`
position: absolute;
display: flex;
flex-direction: column;
text-align: center;
p{
  color: #26DFA6;
  font-size: 2rem;
  font-weight: 500;
  margin-top: 5%;
}

.clickMenuFont{
  color: white;
  font-size: 0.8rem;
  font-weight: 200;
}
`;


const Wrap = styled.div`
width:100%;
height: 100%;
`;

const HeaderArea = styled.div`
width: 100%;
position: absolute;
z-index: 1;
`;



const StyledSlider = styled(Slider)`
    .slick-list {
        width: 100%;
        height: 100%;
    }
    .slick-dots {
        bottom: 10px;
    }
    .slick-dots li.slick-active button:before {
        color: #26DFA6;
    }
    .slick-dots li button:before {
        color: #999;
        opacity: 1;
    }
`;



const TopWrap = styled.div`
width: 100%;
height: 40vh;
position: relative;
`;

const InitGoalArea = styled.div`
display: flex;
height: 100%;
align-items: center;
flex-direction: column;
justify-content: center;
background: #333333;

`;


const GoalImage = styled.img`

width: 100%;
height:100%;
background-color: #F5F5F5;
display: flex;

position: absolute;
object-fit: cover;

`;

const MiddleMenue = styled.div`
display: flex;
height: 100%;
flex-direction: column;
align-items: center;
justify-content: center;
`;


const StarArea = styled.div`
display: flex;
width: 5vh;
`;


const GoalMain = styled.div`
display: flex;
z-index: 2;
background-color: rgb(0,0,0,0.5);
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

const NonGoalInnerCicle = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 1rem;
p{
  font-style: "Cafe24Ohsquareair";
}
`;


const CircleInner = styled.div`
position: absolute;
top: 50%; left: 50%;
transform: translate(-50%, -50%);
`;


const SearchArea = styled.div`
padding: 0.5rem 1rem 0rem 1rem;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
`;

const FavoriteTag = styled.div`
height: 5%;
display: flex;
align-items: center;
width:100%;
overflow-x:scroll;
justify-content: center;
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
}

`;
