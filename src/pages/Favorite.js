import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import SearchSavedItem from "../components/SearchSavedItem";
import FavoriteList from "../components/FavoriteList"
import { myFavoriteListRQ } from "../redux/modules/favorite";

import Header from "../components/Header";
import { ReactComponent as Trash } from "../public/img/svg/Trash.svg";

import { addFavoriteRQ } from "../redux/modules/favorite"

function Favorite() {
  const [selectInputValue, setSelectInputValue] = useState([]);
  const priceInput = useRef();
  const priceRef = useRef();
  const dispatch = useDispatch();


  const addFavoriteData = () => {
    const sendData = {
      categoryId: selectInputValue.categoryId,
      itemName: selectInputValue.itemName,
      itemId: selectInputValue.itemId,
      price: Number(priceInput.current.value)
    }
    dispatch(addFavoriteRQ(sendData));

  }

  useEffect(() => {
    dispatch(myFavoriteListRQ());
  }, []);

  const mylist = useSelector((state) => state.favorite.myFavoriteList.data);
  console.log(mylist)
  const changePrice = (e) => {
    const price = Number(priceRef.current.value);
    console.log(price)
  }

  const changePriceInput = (e) => {
    const price = Number(priceRef.current.value);
    console.log(price)
  }


  return (
    <Wrap>
      <Header />
      <FavoriteWrap>
        <Category>카테고리 영역</Category>
        <SearchSavedItem
          state={"favoriteState"}
          setSelectInputValue={setSelectInputValue} />
        <FavList>
          <Total>{mylist && mylist.length}개</Total>
          <ul>
            {selectInputValue.length === 0 ? ""
              : <li>
                <div>
                  <span>⭐</span>
                  <p>{selectInputValue.itemName}</p>
                  <div>
                    <input
                      type="Number"
                      ref={priceInput} />
                    <button onClick={addFavoriteData}>등록</button>
                    {/* <button onClick={}> 새로운 아이템등록 </button> */}
                  </div>
                </div>
              </li>
            }
            {mylist && mylist.map((list, idx) => (
              <FavoriteList key={list.itemId + idx}
                itemName={list.itemName}
                price={list.price}
                favoriteId={list.favoriteItemId}
              />
            ))}
          </ul>
        </FavList>
      </FavoriteWrap>
    </Wrap>
  )
};


export default Favorite;

const Wrap = styled.div`
/* padding: 0 25px; */
`
const Category = styled.div`
background: #F8F8F8;
height: 90px;
`

const FavoriteWrap = styled.div`
width: 100%;
`

const Total = styled.div`
  padding: 5px 25px;
  text-align: right;
  border-bottom: 1px solid #CCCCCC;
  font-size: 0.87rem;
`
const FavList = styled.div`
width: 100%;

ul{
  padding: 0 20px;
}
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

