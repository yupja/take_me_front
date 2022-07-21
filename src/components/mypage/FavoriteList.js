import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { ReactComponent as Trash } from "../../assets/icons/Trash.svg";
import { ReactComponent as Edit } from "../../assets/icons/Edit2.svg";
import { favoriteUpdate, favoriteDel } from "../../store/modules/favorite";


function FavoriteList(props) {


  console.log(props)
  const priceRef = useRef();
  const dispatch = useDispatch();

  const changePrice = (e) => {
    const price = Number(priceRef.current.value);
    const itemId = props.favoriteId;
    console.log(price, itemId)
    dispatch(favoriteUpdate(price, itemId))
  }

  const FavoriteDelete = (e) => {
    const itemId = props.favoriteId;
    console.log(itemId)
    dispatch(favoriteDel(itemId))
  }


  return (
    <FavList>
      <li>
        <ItemName>
          <p>{props.catagory}</p>
          <h2>{props.itemName}</h2>
        </ItemName>
        <EdtiCont>
          <div className="price">
            <input type="number" min="10" onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()} defaultValue={props.price} ref={priceRef} />
            <button onClick={changePrice}><Edit /></button>
          </div>
          <Trash className="trash" onClick={FavoriteDelete} />
        </EdtiCont>
      </li>
    </FavList>
  )
};


export default FavoriteList;

const FavList = styled.div`
width: 100%;

li{
  border-bottom: 1px solid #CCCCCC;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
}
`


const ItemName = styled.div`
display: inline-block;
p{
  color: #999;
  font-size: 0.75rem;
  padding-bottom: 5px; 
}
h2 {
  color: #333;
  font-size: 1rem;
  font-weight: 500;
}
`
const EdtiCont = styled.div`
display: flex;
  justify-content: space-between;
  align-items: center;
  width: 49%;


.price {
  display: inline-block;
  width: 7.81rem;
  position: relative;

  input {
    width: 100%;
    background: #F4F4F4;
    border: none;
    border-radius: 39px;
    padding: 5px 10px 5px 20px; 
    font-size: 0.93rem;
    font-weight: 700;
  }
  button {
    position: absolute;
    top: 50%; right: 3%;
    transform: translateY(-50%);
  }
}
.trash{
}
`
