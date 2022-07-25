import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Header from "../components/public/Header";
import SaveItemList from "../components/saved/SaveItemList";

import { getHistory } from "../store/modules/info";

function History() {
  const title = "히스토리";
  const dispatch = useDispatch();
  const state = useSelector((state) => state.info.historyList)
  console.log(state);
  console.log(state[3]?.savedItems);
  useEffect(() => {
    dispatch(getHistory());
  }, []);


  // 태산 만들기 오류로 등록 불가 -> 히스토리 목록에 보이는게 없음 -> 테스트코드를 지우지 못함:)
  // 데이터가 있다면 b -> state


  return (
    <>
      <Header title={title} />
      <HistoryWrap>
        <Total>총 <span>{state.length}</span>개 태산</Total>
        <HistoryList>
          <ul>
            {state && state.map((list, idx) => (
              <SaveItemList
                key={idx}
                reachedAt={list.reachedAt}
                itemName={list.itemName}
                items={list.savedItems}
                total={list.totalPrice}
              />
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
  font-family: 'SEBANG_Gothic_Bold';
  span{
    color: #26DFA6;
    font-family: 'SEBANG_Gothic_Bold';
  }
`


const HistoryList = styled.div`

`
