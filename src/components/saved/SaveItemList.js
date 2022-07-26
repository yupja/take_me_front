import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { getSavedList } from "../../store/modules/saved";
import { ReactComponent as UpArrow } from "../../assets/icons/UpArrow.svg";
import { ReactComponent as Star } from "../../assets/icons/Star.svg";

import FavoriteCheckedStar from "../mypage/FavoriteCheckedStar";



function SaveItemList(props) {
  const propsList = props;
  const items = props.items;
  const total = props.total;
  const itemList = useSelector((state) => state.saved.itemList)

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
          <ToggleBtn onClick={() => {
            active();
          }}
            trans={onToggle}><UpArrow /></ToggleBtn>
          <span>{propsList.reachedAt.split('-')[0]}년 {propsList.reachedAt.split('-')[1]}월</span>
          <h2>{propsList.itemName}</h2>
        </GoalList>
      </li>
      <ItemList toggle={blocks}>
        {itemList.data && itemList.data.length === 0 ?
          null :
          <>
            <ul>
              {items && items.map((list, idx) => (
                <li key={list.savedItemId}>
                  <div className="leftBox">
                    <Star className="star" />
                    <p>{list.modifiedDate.substring(0, 4)}<br />
                      {list.modifiedDate.substring(5, 7)}.{list.modifiedDate.substring(8, 10)}</p>
                    <h2>{list.itemName}</h2>
                  </div>
                  <p className="price">{list.price}</p>
                </li>
              ))}
            </ul>
            <Total><p><span>합계</span> {total}</p></Total>
          </>
        }
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
  padding-left: 5px;
  font-weight: 700;
  font-size:1.25rem;
}
`

const ToggleBtn = styled.button`
  border:none;
  background: none;
  transform: ${props => (props.trans ? 'rotate(0deg)' : 'rotate(180deg)')};
`

const ItemList = styled.div`
width: 100%;
display: ${props => (props.toggle ? 'block' : 'none')};

h2 {
  font-size: 1rem;
  font-weight: 500;
  color: #666;
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
  color: #999;
  text-align: left;
  padding: 0 10px;
}
.price{
  font-size: 1rem;
  font-weight: 700;
  color: #666;
}
.star {
  width: 20px;
  height: 20px;
}
`
const Total = styled.div`
  width: 100%;
  height:2.25rem;
  background: #EFEFEF;
  text-align: center;
  padding: 0 10px;
  span{

    font-weight: 500;
  }
  p{
    font-weight: 700;
    line-height: 2.25rem;
    border-bottom: 0.5px solid #CCCCCC;
  }
`