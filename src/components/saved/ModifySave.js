import React,{useRef, useState} from "react";
import { useDispatch } from "react-redux";
import {deleteSavedList, modifySaved} from "../../store/modules/saved"
import styled from "styled-components";

import {EditBlack, TikkleDelete, AddMintPoint} from "../../assets/icons"


const ModifySave = (props) =>{
    const priceInput = useRef();
    const [modifyView, setModifyView] = useState(false);
    const dispatch = useDispatch();

    const modifySavedItem = ()=>{
      const data = {
        price : Number(priceInput.current.value)
       }
       dispatch(modifySaved(data, props.savedItemId))
    }
    
    return (          
    <><ListWrap>
       
        {modifyView? 
        <>
        <ItemName>{props.itemName}</ItemName>
          <InputArea>
          <input 
            type="Number"
            ref={priceInput}
            placeholder={props.price}/>
          <button onClick={()=>{
            modifySavedItem();
            setModifyView(false);
            }}><AddMintPoint/></button>
          </InputArea>

        </>
        : 
        <>
            <Category>{props.categoryName}</Category>
            <ItemName>{props.itemName}</ItemName>
            <ButtonArea>
              <button onClick={()=>{
                  setModifyView(true)
                  
              }}><EditBlack/></button>
              <button onClick={()=>{dispatch(deleteSavedList(props.savedItemId, props.goalItemId))
              }}><TikkleDelete/></button>
            </ButtonArea>       
        </>

       }
            

        </ListWrap>
      </>  
    )
}

const Category = styled.div`
display: flex;
justify-content: center;
width: 8vh;
`;

const ItemName =styled.div`
display: flex;
justify-content: center;
width: 10vh;

`;

const ButtonArea = styled.div`
display: flex;
justify-content: space-between;
`;

const InputArea = styled.div`
display: flex;
width: 95%;
input{
  background: #D9D9D9;
  border: none;
  width: 70%;
  border-radius: 30px;
  margin-right: 5px;
  text-align: center;

}
`;

const ListWrap = styled.div`
display: flex;
width: 40vh;
align-items: center;

overflow-y:scroll;

white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }

`;
export default ModifySave