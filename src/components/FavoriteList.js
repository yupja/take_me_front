import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { ReactComponent as Trash } from "../public/img/svg/Trash.svg";
import { favoriteUpdate, favoriteDel } from "../redux/modules/favorite";


function FavoriteList(props) {
  const priceRef = useRef();
  const dispatch = useDispatch();
  console.log(props)

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
        <span>2022<br />07.07</span>
        <h2>{props.itemName}</h2>
        <div className="price">
          <input type="number" min="10" onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()} defaultValue={props.price} ref={priceRef} />
          <button onClick={changePrice}>적용</button>
        </div>
        <Trash className="trash" onClick={FavoriteDelete} />
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
}

span{

}
h2 {
  width: 40%;
  display: inline-block;
}
.price {
  display: inline-block;
  width: 8.4rem;
  position: relative;
  input {
    width: 100%;
  }
  button {
    position: absolute;
    top: 50%; right: 3%;
    transform: translateY(-50%);
  }
}
.trash{
  display: inline-block;
  position: absolute;
  right: 0;
}
`