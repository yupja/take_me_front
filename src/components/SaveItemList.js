import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { ReactComponent as Star } from "../public/img/svg/Star.svg";
import { ReactComponent as StarColor } from "../public/img/svg/StarColor.svg";
import { getSavedList } from "../redux/modules/saved";
import { ReactComponent as UpArrow } from "../public/img/svg/UpArrow.svg";

function SaveItemList(props) {
  const dispatch = useDispatch();
  console.log(props)
  const propsList = props;
  const goalItemId = props.list;
  const state = useSelector((state) => state.saved.itemList)
  console.log(state);

  useEffect(() => {
    dispatch(getSavedList(goalItemId));
    // 태산 오류 발생. 태산과 유저정보가 일치하지 않습니다 (400번에러)  조회api 
  }, []);


  // 위 오류로 -> 토글 속 리스트가 보이는게 없음 -> 테스트코드를 지우지 못함:)
  // 데이터가 있다면 list -> state
  const list = [
    {
      categoryId: 4,
      categoryName: "식품",
      itemId: 10,
      itemName: "떡볶이",
      price: 7000,
      year: "2022",
      day: "09.06"
    },
    {
      categoryId: 5,
      categoryName: "교통비",
      itemId: 11,
      itemName: "택시비",
      price: 5000,
      year: "2022",
      day: "09.06"
    },
    {
      categoryId: 6,
      categoryName: "미용",
      itemId: 12,
      itemName: "아이브로우",
      price: 12000,
      year: "2022",
      day: "09.06"
    },
  ]
  const active = (e) => {
    setOnToggle(current => !current);
    setBlocks(current => !current);
  }
  const [onToggle, setOnToggle] = useState(false);
  const [blocks, setBlocks] = useState(false);

  return (
    <>
      <li>
        <GoalList>
          <ToggleBtn onClick={active} trans={onToggle}><UpArrow /></ToggleBtn>
          <span>{propsList.reachedAt.split('-')[0]}년 {propsList.reachedAt.split('-')[1]}월</span>
          <h2>{propsList.itemName}</h2>
        </GoalList>
      </li>
      <ItemList toggle={blocks}>
        <ul>
          {list.length === 0 ?
            null :
            <>
              {list && list.map((list, idx) => (
                <li key={list.itemId + list.categoryId + 'b'}>
                  <div className="leftBox">
                    <Star />
                    <p>{list.year}<br />{list.day}</p>
                    <h2>{list.itemName}</h2>
                  </div>
                  <p className="price">{list.price}</p>
                </li>
              ))}
            </>
          }
        </ul>
      </ItemList>
    </>
  )
};


export default SaveItemList;
const GoalList = styled.div`
  border-bottom: 1px solid #CCCCCC;
  overflow: hidden;
  height: 3.12rem;
  line-height: 3.12rem;
  padding: 0 25px;

h2{
  float: right;
  font-size:1.25rem;
  font-weight: 700;
}

span{
  padding-left: 10px;
  font-weight: 700;
  font-size:1.25rem;
}
`

const ToggleBtn = styled.button`
  border:none;
  background: none;
  transform: ${props => (props.trans ? 'rotate(180deg)' : 'rotate(0deg)')};
`
const ItemList = styled.div`
width: 100%;
display: ${props => (props.toggle ? 'block' : 'none')};

h2 {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
}
ul{
  padding: 0 10px;
}
li{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #CCCCCC;
  align-items: center;
  padding: 10px 15px;
}
.leftBox{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
}
.leftBox p{
  font-size: 0.62rem;
  color: #333;
  text-align: left;
  padding: 0 10px;
}

.price{
  font-size: 1rem;
  font-weight: 700;
  color: #999;
}

`
