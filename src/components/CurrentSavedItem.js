import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { mySavedListRQ } from "../redux/modules/saved"
import {addFavoriteRQ, favoriteDel} from "../redux/modules/favorite"

import ModifySave from "./ModifySave";

import styled from "styled-components";
import { AiOutlineStar } from 'react-icons/ai'
import {ReactComponent as CheckedStart} from "../public/img/svg/CheckedStart.svg"


const CurrentSavedItem =(props)=>{
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(mySavedListRQ(props.goalItemId));
      }, [props.goalItemId]);


    const mySavedList = useSelector((state) => state.saved.currentMySavedList);
    
    const addFavoriteStar = (savedItemIndex) => {
      const sendData = {
        categoryId: mySavedList.data[savedItemIndex]?.categoryId,
        itemName: mySavedList.data[savedItemIndex]?.itemName,
        itemId: mySavedList.data[savedItemIndex]?.itemId,
        price: mySavedList.data[savedItemIndex]?.price
      }
      dispatch(addFavoriteRQ(sendData));
    }

    return (
      <>
      {mySavedList&&mySavedList.data?.length === 0? 
        <NonSavedList>
          <p>👆</p>
          <p>오늘은</p>
          <p>무엇을 아끼셨나요?</p>
          <p style={{color:"#30E0AA"}}>등록해 보세요!</p>
        </NonSavedList>
        :
        <SavedList>
        {mySavedList&&mySavedList.data?.map((savedItem, savedItemIndex) => (
            <JustifyContentCenter key={savedItem.savedItemId}>
              <SListWrap>
                <SavedDay>
                  {savedItem.modifiedDate.split(/[T,.]/,1)}<br/>
                </SavedDay>
                <ModifySave categoryName={savedItem.categoryName}
                              itemName={savedItem.itemName}
                              itemId={savedItem.itemId}
                              savedItemId={savedItem.savedItemId}
                              goalItemId={props.goalItemId}/>
              </SListWrap>
           </JustifyContentCenter>
        ))}
      </SavedList>
        }
      
      </>
    )
}

const NonSavedList = styled.div`
margin-top: 10%;
display: flex;
flex-direction: column;
align-items: center;
font-size: 2rem;
gap: 15px;
p{
  font-weight: bold;
}
`;


const SavedDay = styled.div`
display:flex;
width: 14vh;
`;

const SListWrap = styled.div`
display: flex;
height: 50px;
width: 95%;
align-items: center;
justify-content: space-between;
padding: 10px;
border-bottom: 1px solid #CCCCCC;

  button{
    background:#26DFA6;
    color: white;
    padding: 8px;
    font-size: 14px;
    border-radius: 15px;
    border: none;
  }

`;




const SavedList = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: 43vh;

`;

const JustifyContentCenter = styled.div`
display: flex;
justify-content: center;

`;

export default CurrentSavedItem;