import React, {useRef, useState} from "react"
import { useDispatch } from "react-redux"

import Category from "./Category"
import SearchGoal from "./SearchGoal"

import { newItemGoalAddRQ, addGoalRQ, updateGoalAPI } from "../redux/modules/goal"


import styled from "styled-components";
import user from "../redux/modules/user";
import { display } from "@mui/system"

const GoalInput = (props)=>{
  const dispatch = useDispatch()
  console.log(props.divFunction)

  const [category , setCategory] = useState();
  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState("null");
  const [selectInputValue , setSelectInputValue] = useState([]); 
  const [newAddGoal, setNewAddGoal] = useState(false);

  const itemName=useRef();
  const price=useRef();
  const goalItemCount=useRef();

  const imageUpLoad = async (e)=>{
    imagePreview(e.target.files[0])
    setImageFile(e.target.files[0]);
  }

  const imagePreview = (fileBlob) =>{
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) =>{
      reader.onload = () => {
        setImage(reader.result);
        resolve();
      }
    })
  }


  const sendNewData = () =>{
    let data = {} 
    const formData = new FormData();

    formData.append("image", imageFile);
    
    

    if(props.divFunction=="Update"){
      data ={
        itemName: itemName.current.value,
        price: Number(price.current.value),
        goalItemCount: Number(goalItemCount.current.value),
        categoryId: Number(category),
        goalId:props.goalId
      }
    }else {
      data ={
        itemName: itemName.current.value,
        price: Number(price.current.value),
        goalItemCount: Number(goalItemCount.current.value),
        categoryId: Number(category),
      }
    }
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    formData.append('goalItem',blob);

    if(props.divFunction=="ADD"){
      dispatch(newItemGoalAddRQ(formData));
    }
    else if(props.divFunction=="Update"){
      console.log("여기");
      //dispatch(addItem(data));
    }
    
  }


  const sendData = () =>{
    const formData = new FormData();
    console.log("있던거", props.divFunction);

    formData.append("image",imageFile)

    const data ={
      categoryId:selectInputValue.categoryId,
      itemId:selectInputValue.itemId,
      goalItemCount:Number(goalItemCount.current.value),
      price: Number(price.current.value),
    }
    
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    formData.append('goalItem',blob);

    dispatch(updateGoalAPI(formData, props.goalItemId));
    
  }


 return (
    <>
      <ModalBody>

        {newAddGoal? 
        <>
        <SelectedBoxDiv style={{width:"95%",display:"block"}}>
          <Category  setCategory={setCategory}/>
        </SelectedBoxDiv>
        <div> 
          <p>ItemName</p>
          <input 
            type='text' 
            ref={itemName} />
        </div></>
       :
       <SelectedBoxDiv>
        <SearchGoal state={"goalState"}
                    setNewAddGoal={setNewAddGoal}
                    setSelectInputValue={setSelectInputValue}/>
        </SelectedBoxDiv>
        }

        <div> 
          <p>Price</p>
          <input 
            type='text' 
            ref={price} />
        </div> 
        
        <div>
          <p>수량</p> 
          <input 
            type="Number" 
            ref={goalItemCount}/>
        </div>


        <ImgBox>
          <img src={image}/><br/>
          <input 
            type="file" 
            name="image" 
            multiple="multiple"
            onChange={imageUpLoad}/>
        </ImgBox> 

      </ModalBody>
      {newAddGoal? 
        <Footer onClick={()=>{
          sendNewData();
          props.closeModal();}}>
          태산 등록하기
        </Footer>
      :
        <Footer 
          onClick={()=>{
            sendData();
            props.closeModal();
          }}>
          태산 등록하기
        </Footer>}

    </>
  )

}

const ImgBox = styled.div`
display: flex;
flex-direction: row;
img{
  width: 50%;
}
`;

const ImgArea = styled.img`
border: 1px solid gray;

`;


const SelectedBoxDiv = styled.div`
display: block;
width: 100%;
justify-content: center;
`

const ModalBody = styled.div`
display: flex;
flex-direction: column;
align-items: center;

div{
    display:  flex;;
    padding: 0.5rem;
    align-items: center;
    }
p{
    margin-right: 0.5rem;
}

`;


const Footer = styled.button`
padding: 1rem;
width: 100%;
background: #26DFA6;
text-align: right;
color: white;
font-weight: bold;
display: flex;
justify-content: center;
`;

export default GoalInput;