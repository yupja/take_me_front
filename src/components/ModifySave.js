import { style } from "@mui/system";
import React,{useRef, useState} from "react";
import { useDispatch } from "react-redux";
import {deleteSavedList, modifySaved} from "../redux/modules/saved"
import styled from "styled-components";

const ModifySave = (props) =>{
    const priceInput = useRef();
    const [modifyView, setModifyView] = useState(false);
    const dispatch = useDispatch();

    const modifySavedItem = ()=>{
      const data = {
        price : Number(priceInput.current.value)
       }
       console.log(data.price);
       dispatch(modifySaved(data, props.itemId))
    }
    
    return (          
    <><ListWrap>
       
        {modifyView? 
        <>
        <ItemName>{props.itemName}</ItemName>
          <InputArea>
          <input 
            type="Number"
            ref={priceInput}/>
            <button onClick={()=>{
              modifySavedItem();
              setModifyView(false);
            }}>등록</button>
            </InputArea>

        </>
        : 
        <>
            <Category>{props.categoryName}</Category>
            <ItemName>{props.itemName}</ItemName>
            <div>
              <button onClick={()=>{
                  setModifyView(true)
                  
              }}>수정</button>
              <button onClick={()=>{
                      //dispatch(deleteSavedList(props.savedItemId, props.goalItemId))
              }}>삭제</button>
            </div>       
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
width: 5vh;
`;

const ListWrap = styled.div`
display: flex;
width: 40vh;
align-items: center;

`;
export default ModifySave