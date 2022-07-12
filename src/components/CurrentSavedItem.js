import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { mySavedListRQ, deleteSavedList } from "../redux/modules/saved"

import styled from "styled-components";
import { AiOutlineStar } from 'react-icons/ai'

const CurrentSavedItem =(props)=>{
    const dispatch = useDispatch();
    const [modifyView, setModifyView] = useState(false);

    useEffect(() => {
        dispatch(mySavedListRQ(props.goalItemId));
      }, [props.goalItemId]);
      

    const mySavedList = useSelector((state) => state.saved.currentMySavedList);
    console.log(mySavedList)


    return (
        
        <SavedList>
        {mySavedList&&mySavedList.data?.map((savedItem, savedItemIndex) => (
            <JustifyContentCenter key={savedItem.savedItemId}>
              {modifyView? 
              "수정이 가능해요"
              :""}

              <div className="sListWrap">
              <div className="star"><AiOutlineStar /></div>
                  <p className="date">
                    {savedItem.modifiedDate.split(/[T,.]/,1)}<br/>
                  </p>
                  <p>{savedItem.categoryName}</p>
                  <p>{savedItem.itemName}</p>
                  <button onClick={()=>{
                    setModifyView(true);
                  }}>수정</button>
                  <button onClick={()=>{
                    dispatch(deleteSavedList(savedItem.savedItemId))
                  }}>삭제</button>
                </div>
              </JustifyContentCenter>
        ))}
        </SavedList>
    )
}

const SavedList = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: 30vh;

`;

const JustifyContentCenter = styled.div`
display: flex;
justify-content: center;

`;

export default CurrentSavedItem;