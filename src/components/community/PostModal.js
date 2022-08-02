import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { createPostAc } from "../../store/modules/community";
import DountChart from "../goal/Goal";
import { useNavigate } from "react-router-dom";


const PostModal = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [image, setImage] = useState(props.image);
    const [imageFile, setImageFile] = useState("null");
    const [regi, setRegi] = useState(false);

    const myGoalList = useSelector((state=> state.goal.myGoalList));
    console.log(myGoalList,"goallist")
    
    const title = myGoalList.itemName;
    const goalPercent = (myGoalList.goalPercent)*0.01

    const contents_ref = React.useRef();

    const imageUpLoad = async (e)=>{
        imagePreview(e.target.files[0]);
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

    const postAc = (e) => {
        const data = {
            title : title,
            contents:contents_ref.current.value,
            file: imageFile
        }
        console.log(data,"공유하기")
        dispatch(createPostAc(data))
        setRegi(true);
        // props.close()
    }

    const popClose = (e) => {
      setRegi(false)
      props.close();
      window.location.reload();
    }

  
    return (
    <>
        <ModalBody>
          <GoalInfo>
            <DountBox>
            <DountChart color="#26DFA6" percent={goalPercent} size="150" />
            <ViewImg><img src={image}/></ViewImg>
            </DountBox>
              <TextArea>
                <p>{title}</p>
                <BasicImg>기본 이미지</BasicImg>
                
                <NewImg className="filebox">
                  <label htmlFor="ex_file" style={{magin:" 0 auto"}}> 이미지 등록</label>
                  <input 
                    type="file"
                    name="image" 
                    multiple="multiple"
                    onChange={imageUpLoad}
                    id="ex_file" 
                    style={{display:"none"}}/> 
                </NewImg>
              </TextArea>
          </GoalInfo>
 
          
          <ContentsBox ref={contents_ref}></ContentsBox>
          </ModalBody>
          <Footer onClick={()=>{
            postAc();
            // props.close();
          }}>공유하기</Footer>
          
          {regi ?
        <ModalWrap>
          <ModalBox>
            <h1>알림</h1>
            <CloseBtn onClick={popClose}>
              <span></span>
              <span></span>
            </CloseBtn>
            <div className="cont">
              <p>등록완료</p>
            </div>
            <button className="change" onClick={popClose}>확인</button>
          </ModalBox>
        </ModalWrap>
        : null
      }
    </>
     );
  }

const Box = styled.div`
`;

  const DountBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  `;

  const ViewImg = styled.div`
  width: 130px;
  height: 130px;
  /* border: 1px solid red; */
  position: absolute;
  img{
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius:50%;
  position: absolute;
  object-fit: cover;
}
  `;

  const GoalInfo = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  
  `;
  
  const BasicImg = styled.div`
  background: #6485EC;
  color: white;
  padding: 0.5rem;
  border-radius: 20px;
  `;

  const NewImg = styled.div`
  background: #26DFA6;
  color: white;
  padding: 0.5rem;
  border-radius: 20px;
  `;


  const TextArea = styled.div`
  height: 100%;
  width: 45%;
  display: flex;

  text-align: center;
  
  flex-direction: column;
  gap: 15px;
  p{
    font-size: 1.5rem;
    font-weight: bold;
  }
  `;

  const ContentsBox = styled.input`
  width: 95%;
  height: 92px;
  margin: 10px auto;
  ;
  `;
  
  const ModalBody = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
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

const ModalWrap = styled.div`
width: 100%;
height: 100vh;
padding: 0 25px;
position: absolute;
top: 0; left: 0;
background: rgba(0,0,0,0.7);
z-index: 999;
`
const ModalBox = styled.div`
position: absolute;
top: 50%; left: 50%;
transform: translate(-50%,-50%);
width: 90%;
height: 12.12rem;
background: #fff;
border-radius: 5px;
overflow: hidden;

h1 {
  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;
  line-height:62px;
}
 h3 {
  font-size: 1.5rem;
  padding: 20px 0;
  white-space: pre-wrap;
 }
 p{
  text-align: center;
  padding-top: 5px;
 }
 div.cont{
  position: relative;
  margin: 0 10px;
  padding: 15px 0;
  border-bottom : 1px solid #ddd;
  text-align: center;
  button{
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 4.43rem;
    text-align: center;
    color: #999;
    padding: 3px 5px;
    font-weight: 500;
    font-size: 0.875rem;
    border: 1px solid #dbdbdb;
    border-radius: 3.12rem;
  }
 }
 input {
  width: 75%;
  background : none;
  border: none;
  text-align: center;
 }
 input:focus{
  outline:none;
 }
 button.change {
  font-size:0.93rem;
  font-weight: 700;
  color: #fff;
  width: 100%;
  background: #26DFA6;
  padding: 16px 0;
  position: absolute;
  bottom: 0; left: 0;
 }
`

const CloseBtn = styled.div`
width:15px;
height: 15px;
position:absolute;
top: 13px; right: 5%;

span {
  display:block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width:100%;
  height:1px;
  background-color: #999999;
}
span:first-child{
  transform: rotate(45deg) translateX(0%);
  }
span:last-child{
  transform: rotate(135deg) translateX(0%);
  }
`;

  export default PostModal;