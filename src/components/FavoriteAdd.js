import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import Category from "../components/Category"
import { addFavoriteRQ } from "../redux/modules/favorite"


const FavoriteAdd = ()=>{
    const dispatch = useDispatch();
    const [category , setCategory] = useState();
    const itemName = useRef();
    const price = useRef();


    const addFavoriteNewData=()=>{
        const sendData ={
        categoryId: Number(category),
        itemName:itemName.current.value,
        itemId:-1,
        price: Number(price.current.value)
        }
        console.log(sendData)
        dispatch(addFavoriteRQ(sendData));
    }


    return (
        <>
        <ModalBody>
        <Category  setCategory={setCategory}/>
            <div> 
              <p>ItemName</p>
              <input 
                type='text' 
                ref={itemName}
                />
              </div>
  
          <div> 
            <p>Price</p>
            <input 
              type='text'
              ref={price}
            />
          </div> 
        
        </ModalBody>
        
        <Footer onClick={addFavoriteNewData}> 즐겨찾기 등록하기</Footer>

      </>

    )

}

const ImgBox = styled.div`
display: flex;
flex-direction: column;
`;


const SelectedBoxDiv = styled.div`
display: flex;
width: 85%;
justify-content: center;
`

const ModalBody = styled.div`
display: flex;
flex-direction: column;
align-items: center;

div{
    display: flex;
    padding: 0.5rem;
    align-items: center;
    }
p{
    margin-right: 0.5rem;
}

`;


const Footer = styled.button`
padding: 1rem;
background: #26DFA6;
text-align: right;
color: white;
font-weight: bold;
display: flex;
justify-content: center;
`

export default FavoriteAdd;