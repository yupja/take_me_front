import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import styled from "styled-components";

import { ReactComponent as Star } from "../public/img/svg/Star.svg";
import { ReactComponent as StarColor } from "../public/img/svg/StarColor.svg";
import { getSavedList } from "../redux/modules/saved";

function SaveItemList(props) {
  const dispatch = useDispatch();
  const goalItemId = props.list;
  // console.log(listInfo[0].goalItemId)
  console.log(props.list)

  useEffect(() => {
    dispatch(getSavedList(props.list));
  }, []);

  const list = useSelector((state) => state.saved.currentMySavedList);
  console.log(list)

  return (
    <>
      <ItemList toggle={props.toggle}>
        <ul>
          {list.data&&list.data.length === 0 ?
            null :
            <>
              {list && list.map((list, idx) => (
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
