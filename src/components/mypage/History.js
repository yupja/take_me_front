import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Header from "../public/Header";
import SaveItemList from "../saved/SaveItemList";

import { getHistory } from "../../store/modules/myInfo";

function History() {
  const title = "히스토리";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useSelector((state) => state.myInfo.historyList)
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/main")
    }
    dispatch(getHistory());
  }, []);


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
