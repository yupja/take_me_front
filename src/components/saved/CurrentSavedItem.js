import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { mySavedListRQ } from "../../store/modules/saved"
import {addFavoriteRQ} from "../../store/modules/favorite"

import ModifySave from "./ModifySave";
import styled from "styled-components";
import {ReactComponent as EmptyStar} from "../../assets/icons/EmptyStar.svg"

const CurrentSavedItem =(props)=>{
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(mySavedListRQ(props.goalItemId));
      }, [props.goalItemId]);
    

    const mySavedList = useSelector((state) => state.saved.currentMySavedList);
    console.log("내아낌", mySavedList)

   
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
            <ul key={savedItem.savedItemId}>
              <li>
              <div className="leftBox">
              <EmptyStar/>
             
              <SavedDay>
                <p style={{fontSize:"0.7rem", color:"#999999"}}>
                  {savedItem.modifiedDate.split(/[T,.]/,1)}
                  {savedItem.categoryName}
                </p>
                {savedItem.itemName}
              </SavedDay>
              </div>
              <ModifySave     itemId={savedItem.itemId}
                              savedItemId={savedItem.savedItemId}
                              goalItemId={props.goalItemId}/>
              </li>
           </ul>
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
margin-left: 10px;
flex-direction: column;
`;


const SavedList = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: 43vh;

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

`;


export default CurrentSavedItem;