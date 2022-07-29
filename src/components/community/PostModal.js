import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { createPostAc } from "../../store/modules/community";
import DountChart from "../public/Goal";


const PostModal = (props) => {

    const dispatch = useDispatch();
    const [image, setImage] = useState(props.image);
    const [imageFile, setImageFile] = useState("null");

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

    const postAc = () => {
        const data = {
            title : title,
            contents:contents_ref.current.value,
            file: imageFile
        }
        console.log(data,"공유하기")
        dispatch(createPostAc(data))
        // window.location.reload();
    }

  
    return (
    <>
        <ModalBody>
          <GoalInfo>
            <DountChart color="#26DFA6" percent={goalPercent} size="150"/>
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
            props.close();
            // window.location.reload();
          }}>공유하기</Footer>

    </>
     );
  }


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
  height: 5rem;
  margin-bottom: 0.5;
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

  export default PostModal;