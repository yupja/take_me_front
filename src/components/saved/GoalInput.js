import React, {useRef, useState} from "react"
import { useDispatch } from "react-redux"

import Category from "../public/Category"
import SearchItem from "../public/SearchItems"
import { newItemGoalAddRQ, addGoalRQ, updateGoalAPI } from "../../store/modules/goal"


import styled from "styled-components";
import {ReactComponent as LeftArrow} from "../../assets/icons/LeftArrow.svg"

const GoalInput = (props)=>{
  const dispatch = useDispatch()


  //-------------- 모달
  const [category , setCategory] = useState();
  const [image, setImage] = useState("https://velog.velcdn.com/images/eppo/post/f68f349d-6314-463d-beb0-3a779d24a90b/image.png");
  const [imageFile, setImageFile] = useState("null");
  const [selectInputValue , setSelectInputValue] = useState([]); 
  const [newAdd, setNewAdd] = useState(false);

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




  const sendNewData = (state) =>{

    const formData = new FormData();

    formData.append("image", imageFile);

     const data ={
        itemName: itemName.current.value,
        defaultPrice: Number(price.current.value),
        goalItemCount: Number(goalItemCount.current.value),
        categoryId: Number(category),
      }
    
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    formData.append('goalItem',blob);
    dispatch(newItemGoalAddRQ(formData));
    

    props.closeModal();

  }


  const sendData = (state) =>{
    const formData = new FormData();

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

    console.log("있던거 ADD")
    if(imageFile==="null"){
      alert("이미지를 첨부");
    }else{
    dispatch(addGoalRQ(formData));
  }
  props.closeModal();

}


  return (
  <>
    <ItemList>
      {newAdd ?
        <>
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
        </>
        :
        <ul><li>
          <div className="leftBox">
            <p>이름</p>
          </div>
          <SearchItem
            state={"태산을 찾아보세요!"}
            setNewAdd={setNewAdd}
            actionState={"goalInput"}
            setSelectInputValue={setSelectInputValue} />
        </li></ul>
      }

      <ul><li>
        <div className="leftBox">
          <p>가격</p>
        </div>
        <input
          className="inputStyle"
          ref={price} />
      </li></ul>

      <ul><li>
        <div className="leftBox">
          <p>수량</p>
        </div>
        <input
          className="inputStyle"
          ref={goalItemCount}></input>
      </li></ul>
    </ItemList>

    <ImageDiv>
      <ul>
        <li>
          <div className="leftBox">
            <img src={image} />
          </div>
          <div>
            <label style={{ background: "#6A8EFF" }}>
              <LeftArrow />기본 이미지 </label>
            <label htmlFor="ex_file" style={{ marginTop: "5%" }}>
              <LeftArrow /> 이미지 등록 </label>
            <input
              type="file"
              name="image"
              id="ex_file"
              multiple="multiple"
              style={{ display: "none" }}
              onChange={imageUpLoad} />
          </div>
        </li>
      </ul>
    </ImageDiv>

    {newAdd? 
      <Footer onClick={()=>
        {sendNewData(props.state)
        props.closeModal()}}>
        태산 등록하기
      </Footer>
    :
      <Footer 
        onClick={()=>{
          sendData(props.state);
          props.closeModal();
          }}>
        태산 등록하기
      </Footer>} 
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
}
input{
  display: flex;
  align-items: center;
  
}
`;


const ImageDiv = styled.div`
width: 100%;

ul{
  padding: 0 10px;
}
li{
  display: flex;
  justify-content: space-around;;
  align-items: center;
}
.leftBox{
  display: flex;
  justify-content: space-around;;
  align-items: center;

}
.leftBox p{
  font-size: 1rem;
  color: #333;
  text-align: left;

}

label{
  width: 100%;
  padding: 0.5rem;
  background: #26DFA6;
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  font-weight: 500;
  border-radius:30px;
}

div{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 5%;
}
img{
  display: flex;
  width: 60%;
  border-radius:50%;
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
