import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {newItemSavedListRQ} from "../../store/modules/saved"
import Category from "../public/Category"

import { BsPlus } from 'react-icons/bs'
import { BiMinus } from 'react-icons/bi'
import styled from "styled-components";

const SavedInput = (props)=>{
  const dispatch = useDispatch();

  const myGoalList = useSelector((state=> state.goal.myGoalList));


  const itemName = useRef()
  const price = useRef()

  const [category , setCategory] = useState("")


//  function onlynumber(e) { // 천원단위 끊는거 구현하기 
//   let str = e.target.value
//   setPrice(str);
//   }

  const addSavedList=()=>{
    const sendData = {
      categoryId : Number(category),
      itemName : itemName.current.value,
      defaultPrice : Number(price.current.value),
      goalItemId : Number(myGoalList?.goalItemId)
    }
    dispatch(newItemSavedListRQ(sendData))
}
    
  return (
    <>
     <ItemList>
      <ul><CategoryLi>
        <div className="leftBox">
          <p>카테고리</p>
        </div>
        <div className="categoryDiv">
          <Category
            setCategory={setCategory} />
        </div>
      </CategoryLi></ul>
      
      <ul><li>
        <div className="leftBox">
          <p>이름</p>
        </div>
        <input
          className="inputStyle"
          ref={itemName} />
      </li></ul>
      
      <ul><li>
        <div className="leftBox">
          <p>가격</p>
        </div>
        <input
          className="inputStyle"
          ref={price} />
      </li></ul> 

    </ItemList>

      <Footer
        onClick={()=>{
          addSavedList();
          props.closeModal();
        }}>
        <label>티끌 등록하기</label>
      </Footer>
    </>
  )
}
const ItemList = styled.div`
width: 100%;
margin: 1rem 0 1rem 0;

ul{
  padding: 0 10px;
}
li{
  display: flex;
  justify-content: space-around;;
  align-items: center;
  padding: 5px 15px;
}
.leftBox{
  display: flex;
  justify-content: space-around;;
  align-items: center;
  padding-left: 5px;
}
.leftBox p{
  width: 100%;
  font-size: 1rem;
  color: #333;
  text-align: left;
}
.inputStyle{
  display: flex;
  width: 68%;
  align-items: center;
  border: 1px solid #CCCCCC;
  border-radius  : 20px ;
  padding: 0.15rem;
  text-align: center;
}
input{
  display: flex;
  align-items: center;
  
}
`;

const CategoryLi = styled.div`
display: flex;
justify-content: space-evenly;;
align-items: center;

.leftBox{
  display: flex;
  justify-content: space-evenly;

  align-items: center;
  padding-left: 5px;
}
.leftBox p{
  width: 100%;
  font-size: 1rem;
  color: #333;
  text-align: left;
}

.categoryDiv{
  width: 62%;
  margin-right: 4%;
  padding-bottom: 2%;
}
`;


const Footer = styled.div`
padding: 16px;
background: #26DFA6;
text-align: right;
color: white;
font-weight: bold;
display: flex;
justify-content: center;
`;






export default SavedInput