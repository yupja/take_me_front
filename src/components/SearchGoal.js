import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { myFavoriteListRQ } from "../store/modules/favorite"
import { allItemListRQ } from "../store/modules/item"


import styled from 'styled-components'


function SearchFavorite(props) {

  useEffect(() => {
    dispatch(myFavoriteListRQ());
    dispatch(allItemListRQ());
  }, []);

  const dispatch = useDispatch();
  const list = useSelector((state) => state.item.allItemList);
  
  const allItemList = [];
  const makeList = list?.map((item) => {
    allItemList.push(item.itemName);
  })

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
    props.setSelectInputValue(list[choosenItemIndex])

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
            placeholder="태산을 찾아보세요!"
          />


          <DeleteButton onClick={() => setInputValue('')}>&times;</DeleteButton>
          {isHaveInputValue && (
            <DropDownBox>

              {dropDownList.length === 0 && (
                <DropDownItem>
                  <AddFavoriteInput>
                    앗! 아직 등록이 안되어있네요!<br />
                    새로 등록하시겠어요?
                  </AddFavoriteInput>
                  <AddButton onClick={() => {
                    props.setNewAddGoal(true)
                    setInputValue('')
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
        </InputBox>
      </WholeBox>

    </>
  )
}


const WholeBox = styled.div`

  width: 100%;
  // 등록하기 DropDownItem 이 나와야하는 경우  className='new' 추가!
  .new {
    padding:0;
    box-shadow: 0px 4px 15px 0px rgb(0 0 0 / 25%);
  }
`;

const InputBox = styled.div`
display: flex;
margin-left:5px;
width:100%;
flex-direction: row;
padding: 10px;
border: 1px solid rgba(0, 0, 0, 0.3);
border-radius: 30px;
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
/* display: block;
margin-left:4%;
width:100%;
padding: 8px 0;
background: white;
border: 1px solid rgba(0, 0, 0, 0.3);
border-top: none;
border-radius: 0 0 16px 16px;
list-style-type: none;
position: absolute;
top: 100%; left: 0; */

display: block;
width: 89%;
padding-top: 15px;
background: white;
border-top: none;
border-radius: 0 0 4px 4px;
list-style-type: none;
position: absolute;
top: 103%; left: 50%;
box-shadow: 0px 4px 4px 0px rgb(0 0 0 / 25%);
transform: translateX(-50%);
`;



const AddFavoriteInput = styled.p`
text-align: center;
line-height: 20px;
margin:0 !important;
font-weight: 400;
font-size: 1rem;
`;

const AddButton = styled.button`
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