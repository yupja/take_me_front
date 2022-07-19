import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { myFavoriteListRQ } from "../store/modules/favorite"
import { allItemListRQ } from "../store/modules/item"


import styled from 'styled-components'

import DayModal from "./DayModal"
import SavedInput from "./SavedInput"



function SearchFavorite(props) {

  useEffect(() => {
    dispatch(myFavoriteListRQ());
    dispatch(allItemListRQ());
  }, []);

  const dispatch = useDispatch();
  const list = useSelector((state) => state.item.allItemList);
  const [selecState, setSelectState] = useState(props.state);

  const allItemList = [];
  const makeList = list.data?.map((item) => {
    allItemList.push(item.itemName);
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
      const choosenTextList = allItemList.filter(textItem =>
        textItem.includes(inputValue)
      )
      setDropDownList(choosenTextList);
    }
  };

  const changeInputValue = event => {
    setInputValue(event.target.value);
    setIsHaveInputValue(true);
  };

  const clickDropDownItem = clickedItem => {
    setInputValue(clickedItem);
    savedItem(clickedItem);
    setIsHaveInputValue(false);
  };

  const savedItem = (clickedItem) => {
    const choosenItemIndex = allItemList?.indexOf(clickedItem)
    console.log(choosenItemIndex)
    props.setSelectInputValue(list.data[choosenItemIndex])

  };


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
      <WholeBox>
        <InputBox isHaveInputValue={isHaveInputValue}>
          <input
            type='text'
            value={inputValue}
            onChange={changeInputValue}
            onKeyUp={handleDropDownKey}
            placeholder="오늘은 어떤걸 아끼셨나요?"
          />


          <DeleteButton onClick={() => setInputValue('')}>&times;</DeleteButton>
          {isHaveInputValue && (
            <DropDownBox>
              {dropDownList.length === 0 && (
                <DropDownItem>
                  <AddFavoriteInput>
                    앗! 찾으시는게 아직 등록이 안되어있네요!<br />
                    새로 등록하시겠어요?
                  </AddFavoriteInput>
                  <AddButton onClick={() => {
                    openModal();
                    setModalState(<SavedInput closeModal={closeModal}
                      goalItemId={props.goalItemId} />)
                    setModalName("등록하기")
                  }}>+등록하기</AddButton>
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
            </DropDownBox>
          )}


          {selecState == "saveState" ?
            <DayModal open={modalOpen} close={closeModal} header={modalName}>
              {modalState}
            </DayModal>
            : ""}
        </InputBox>



      </WholeBox>

    </>
  )
}


const WholeBox = styled.div`
  padding: 10px;
`;

const InputBox = styled.div`
display: flex;
flex-direction: row;
margin: 0 15px;
padding: 10px;
border: 1px solid rgba(0, 0, 0, 0.3);
border-radius: 18px;
z-index: 3;   
position: relative;

  input{
    flex: 1 0 0;
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 12px;
    text-align: center;
  }
  input::placeholder{
    color: #ccc;
  }
`;


const DeleteButton = styled.div`
 cursor: pointer;
`;


const DropDownBox = styled.ul`
display: block;
width:89%;
padding: 8px 0;
background-color: white;
border-top: none;
border-radius: 0 0 16px 16px;
list-style-type: none;
position: absolute;
top: 103%; left: 50%;
box-shadow: 0px 4px 4px 0px rgb(0 0 0 / 25%);
transform: translateX(-50%);
/* z-index: 999; */
`;



const AddFavoriteInput = styled.p`
/* text-align: center;
padding: 10px; */
text-align: center;
line-height: 20px;
margin:0 !important;
font-weight: 400;
font-size: 1rem;
`;

const AddButton = styled.button`
/* background: #26DFA6;
color: white;
border: none;
border-radius: 20px;
padding: 10px;
width: 80%; */
background: #26DFA6;
color: white;
border: none;
border-radius: 20px;
padding: 10px;
margin-top: 10px;
width: 80%;
font-weight: 700;
font-size: 18px;
box-shadow: 0px 4px 11px 0px rgb(0 0 0 / 25%);
`;


const DropDownItem = styled.li`
  display : flex;
  flex-direction: column;
   padding: 0 12px;
  align-items: center;
  padding: 16px 0;
  &.selected {
    background-color: lightgray;
  }
`



export default SearchFavorite;