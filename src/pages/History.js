import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useLocation } from "react-router";

import Header from "../components/Header";
import SaveItemList from "../components/SaveItemList";
import { ReactComponent as UpArrow } from "../public/img/svg/UpArrow.svg";

import { getHistory } from "../redux/modules/info";

function History() {
  const dispatch = useDispatch();
  const [onToggle, setOnToggle] = useState(false);
  const [blocks, setBlocks] = useState(false);
  const state = useSelector((state) => state.info.historyList)
  console.log(state)


  useEffect(() => {
    dispatch(getHistory());
  }, []);

  const active = (e) => {
    setOnToggle(current => !current);
    setBlocks(current => !current);
  }



  const b = [
    {
      goalItemId: 16,
      categoryId: -1,
      categoryName: "이름 없음",
      itemId: -1,
      itemName: "이름 없음",
      goalItemCount: 0,
      price: 0,
      totalPrice: 0,
      checkReached: true,
      goalPercent: 100.0,
      savedItemCount: 3,
      createdAt: "2022-07-08T10:59:53.16435",
      reachedAt: "2022-07-08T11:01:47.9457",
      image: null,
    },
    {
      goalItemId: 17,
      categoryId: 1,
      categoryName: "식료품",
      itemId: 1,
      itemName: "소세지빵",
      goalItemCount: 2,
      price: 3000,
      totalPrice: 60000,
      checkReached: true,
      goalPercent: 100.0,
      savedItemCount: 1,
      createdAt: "2022-07-08T10:59:53.16435",
      reachedAt: "2022-07-08T11:01:47.9457",
      image: "https://final-project-day-keep.s3.ap-northeast-2.amazonaws.com/static/aadf6dac-95ba-41cb-a166-770501042cd820210209_181035.jpg",
    }
  ]



  return (
    <>
      <Header />
      <HistoryWrap>
        <Total>총 <span>{b.length}</span>개 태산</Total>
        <HistoryList>
          <ul>
            {b && b.map((list, idx) => (
              <li key={list.goalItemId + 'b'}>
                <GoalList>
                  <ToggleBtn onClick={active} trans={onToggle}><UpArrow /></ToggleBtn>
                  <span>{list.reachedAt.split('-')[0]}년 {list.reachedAt.split('-')[1]}월</span>
                  <h2>{list.itemName}</h2>
                </GoalList>
                <SaveItemList
                  toggle={blocks}
                  list={list.goalItemId} />
              </li>
            ))}
          </ul>
        </HistoryList>
      </HistoryWrap>
    </>
  )
};


export default History;

const HistoryWrap = styled.div`
width: 100%;
`

const Total = styled.div`
  margin: 0 auto;
  padding: 30px 0 20px; 
  text-align: center;
  font-size:2.12rem;
  font-weight: 700;
  font-family: 'HS-Regular';
  span{
    color: #26DFA6;
      font-family: 'HS-Regular';
  }
`

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

const HistoryList = styled.div`
  

`
const ToggleBtn = styled.button`
  border:none;
  background: none;
  transform: ${props => (props.trans ? 'rotate(180deg)' : 'rotate(0deg)')};
  /* transform: rotate(); */
`

// SaveItemList = styled.div`

// /* display: ${props => (props.dis ? 'block' : 'none')}; */


// `
