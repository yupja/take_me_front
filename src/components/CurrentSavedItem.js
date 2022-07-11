import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { mySavedListRQ } from "../redux/modules/saved"

import styled from "styled-components";
import { AiOutlineStar } from 'react-icons/ai'

const CurrentSavedItem =(props)=>{
    const dispatch = useDispatch();

    console.log(props.goalItemId)

    useEffect(() => {
        dispatch(mySavedListRQ(props.goalItemId));
      }, [props.goalItemId]);


    const mySavedList = useSelector((state) => state.saved.currentMySavedList);
    console.log(mySavedList)
    

    return (
        
        <SavedList>
        {mySavedList&&mySavedList.data?.map((savedItem, savedItemIndex) => (
            <>
              <div className="sListWrap">
                <div className="star"><AiOutlineStar /></div>
                <p className="date">{savedItem.createdAt}<br /></p>
                <p>{savedItem.categoryName}</p>
                <p>{savedItem.itemName}</p>
                <button>수정</button>
                <button>삭제</button>
              </div>
            </>
        ))}
        </SavedList>
    )
}

const SavedList = styled.div`
display: flex;
height: 30vh;
`;

export default CurrentSavedItem;