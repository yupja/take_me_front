import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { useLocation } from "react-router";
import { Link } from "@mui/material";
import SearchSavedItem from "../components/SearchSavedItem";
import FavoriteAdd from "../components/FavoriteAdd";

import Header from "../components/Header";
import DayModal from "../components/DayModal"
import { ReactComponent as Trash } from "../public/img/svg/Trash.svg";

import { addFavoriteRQ } from "../redux/modules/favorite"

function Favorite() {
  const { state } = useLocation();
  const [selectInputValue , setSelectInputValue] = useState([]); 
  const priceInput = useRef();
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  // const [modalState, setModalState] = useState();
  const [modalName, setModalName] = useState("");
  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };


  console.log(selectInputValue);

  const addFavoriteData = ()=>{
    const sendData = {
      categoryId:selectInputValue.categoryId,
      itemName:selectInputValue.itemName,
      itemId:selectInputValue.itemId,
      price: Number(priceInput.current.value)
    }
    dispatch(addFavoriteRQ(sendData));
    setSelectInputValue([]);

  }


  return (
    <Wrap>
      <Header/>
      <FavoriteWrap>
        <Category>카테고리 영역</Category>
        <SearchSavedItem 
          state={"favoriteState"}
          setSelectInputValue={setSelectInputValue}/>
        <FavList>
          <Total>00개</Total>
          <ul>
            {selectInputValue.length===0? "" 
            : 
              <li>
                <div>
                  <span>⭐</span>
                  <p>{selectInputValue.itemName}</p>
                  <div>
                    <input 
                      type="Number"
                      ref={priceInput}/>
                    <button onClick={addFavoriteData}>등록</button>
                    <button onClick={openModal}> 새로운 아이템등록 </button>
                  </div>
                </div>
            </li>
            }
   
            <li>
              <span>2022<br />07.07</span>
              <h2>택시비</h2>
              <div className="price">
                <input type="number" min="10" onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()} />
                <button>적용</button>
              </div>
              <Trash className="trash" />
            </li>
            <li>
              <span>2022<br />07.07</span>
              <h2>택시비</h2>
              <div className="price">
                <input type="number" min="10" onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()} />
                <button>적용</button>
              </div>
              <Trash className="trash" />
            </li>
          </ul>

          <DayModal open={modalOpen}
            close={closeModal}
            header={"즐겨찾기등록"}>
            <FavoriteAdd setSelectInputValue={setSelectInputValue}/>
          </DayModal>
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

