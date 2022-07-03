import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { addSaveListRQ } from "../redux/modules/saveList"
import { myFavoriteListRQ } from "../redux/modules/favorite"

import styled from 'styled-components'
import { BiX } from 'react-icons/bi'
import "../public/css/searchFavorite.css"

import DayModal from "../components/DayModal"
import FavoriteInput from "./FavoriteInput"



function SearchFavorite() {

  useEffect(() => {
    dispatch(myFavoriteListRQ());
  }, []);


  const dispatch = useDispatch();
  const list = useSelector((state) => state.goal.allGoalList);
  const mylist = useSelector((state) => state.favorite.myFavoriteList);

  const allFavoriteList = [];
  const makeList = list.map((item) => {
    allFavoriteList.push(item.itemName);
  })

  //-------------- 모달
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState();
  const [modalName, setModalName] = useState("");
  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };


  //-------------- 드롭박스 제어 
  const [inputValue, setInputValue] = useState('');  // Input 값 제어
  const [isHaveInputValue, setIsHaveInputValue] = useState(false); // Input값이 있니 없니?
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1); // 선택한 아이템의 인덱스
  const [dropDownList, setDropDownList] = useState(list); // 검색List 

  

  const showDropDownList = () => {
    if (inputValue === '') {
      setIsHaveInputValue(false);
      setDropDownList([]);
    } else {
      const choosenTextList = allFavoriteList.filter(textItem =>
        textItem.includes(inputValue)
      )
      setDropDownList(choosenTextList);
    }
  }

  const changeInputValue = event => {
    setInputValue(event.target.value);
    setIsHaveInputValue(true);
  }

  const clickDropDownItem = clickedItem => {
    setInputValue(clickedItem);
    setIsHaveInputValue(false);
  }

  const handleDropDownKey = event => {
    if (isHaveInputValue) {
      if (
        event.key === 'ArrowDown' &&
        dropDownList.length - 1 > dropDownItemIndex
      ) {
        setDropDownItemIndex(dropDownItemIndex + 1)
      }

      if (event.key === 'ArrowUp' && dropDownItemIndex >= 0)
        setDropDownItemIndex(dropDownItemIndex - 1);
      if (event.key === 'Enter' && dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex]);
        setDropDownItemIndex(-1);
      }
    }
  }

  useEffect(showDropDownList, [inputValue]);

  return (
    <>
      <div className='wholeBox'>

        <div className='inputBox' isHaveInputValue={isHaveInputValue}>
          <input className='innerInput'
            type='text'
            value={inputValue}
            onChange={changeInputValue}
            onKeyUp={handleDropDownKey}
          />


          <div className='deleteButton' onClick={() => setInputValue('')}>&times;</div>
        </div>

        {isHaveInputValue && (
          <ul className='dropDownBox'>
            {dropDownList.length === 0 && (
              <DropDownItem>
                <div className='addFavoriteInput'>
                  앗! 찾으시는게 아직 등록이 안되어있네요!<br />
                  새로 등록하시겠어요?
                </div>
                <button className='addButton' onClick={() => {
                  openModal();
                  setModalState(<FavoriteInput />)
                  setModalName("등록하기")
                }}>+등록하기</button>
              </DropDownItem>
            )}

            {dropDownList.map((dropDownItem, dropDownIndex) => {
              return (
                <DropDownItem
                  key={dropDownIndex}
                  onClick={() => clickDropDownItem(dropDownItem)}
                  onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                  className={
                    dropDownItemIndex === dropDownIndex ? 'selected' : ''
                  }
                >
                  {dropDownItem}
                </DropDownItem>
              )
            })}
          </ul>
        )}


        <DayModal open={modalOpen} close={closeModal} header={modalName}>
          {modalState}
        </DayModal>

      </div>

      <div className='itemWrap'>
      ⭐
        {mylist.map((item, itemIndex) => {
          return (
            <div className='favoriteItem' key={item.itemId} onClick={()=>{
              dispatch(addSaveListRQ(item))
            }}>
              {item.itemName}
              <BiX />
            </div>
          )
        })}
      </div>
    </>
  )
}



const DropDownItem = styled.li`
  display : flex;
  flex-direction: column;
   padding: 0 12px;
  align-items: center;
  &.selected {
    background-color: lightgray;
  }
`

export default SearchFavorite;