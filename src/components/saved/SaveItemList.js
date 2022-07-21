import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import styled from "styled-components";

import { getSavedList } from "../../store/modules/saved";
import { ReactComponent as UpArrow } from "../../assets/icons/UpArrow.svg";
import { ReactComponent as Star } from "../../assets/icons/Star.svg";

function SaveItemList(props) {
  const dispatch = useDispatch();
  const propsList = props;
  const goalItemId = props.list;
  const state = useSelector((state) => state.saved.itemList)

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
          <ToggleBtn onClick={()=>{
            active();
            dispatch(getSavedList(goalItemId));
          }} 
            trans={onToggle}><UpArrow /></ToggleBtn>
          <span>{propsList.reachedAt.split('-')[0]}년 {propsList.reachedAt.split('-')[1]}월</span>
          <h2>{propsList.itemName}</h2>
        </GoalList>
      </li>
      <ItemList toggle={blocks}>
        <ul>
          {state.data&&state.data.length === 0 ?
            null :
            <>
              {state && state.map((list, idx) => (
                <li key={list.savedItemId}>
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