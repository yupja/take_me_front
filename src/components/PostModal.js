import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux/es/exports";
import { createPostAc } from "../redux/modules/post";


const PostModal = (props) => {

    const dispatch = useDispatch();
    const [image, setImage] = useState("null");
    const [imageFile, setImageFile] = useState("null");

    const title_ref = React.useRef();
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
            title : title_ref.current.value,
            contents:contents_ref.current.value,
            file: imageFile
        }
        console.log(data,"공유하기")
        dispatch(createPostAc(data))
    }

  
    return (
      <>
      {props.showModalll ?

        <Background>
            <ModalBox onClick={e => e.stopPropagation()}>
              <CommentBox>
                
                    <Top>
                    <Head>내 아낌 % 공유</Head>    
                    <Close onClick={props.closeModalll}>X</Close>
                    </Top>
                    
                    <ImageArea>
                    <Profile src={image}></Profile>
                      <Right>
                      <DeImg><p>기본 이미지</p></DeImg>
                        
                          <AddImg className="filebox">
                            <label htmlFor="ex_file" style={{magin:" 0 auto"}}>
                              이미지 등록</label>
                            <input 
                              type="file"
                              name="image" 
                              multiple="multiple"
                              onChange={imageUpLoad}
                              id="ex_file" 
                              style={{display:"none"}}/> 
                          </AddImg>
                        </Right>
                        
                </ImageArea>


                    <Goal ref={title_ref}></Goal>
                    <Input ref={contents_ref}></Input>
                    <Btn onClick={postAc}>공유하기</Btn>

                </CommentBox>
            </ModalBox>
        </Background> : null}
</>

    );
  };



const Background = styled.div`
display: flex;
`;


const ModalBox = styled.div`
position: fixed;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
min-height: 50vh;
background-color: rgb(0,0,0,0.3);
box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
display: flex;

  @media screen and (max-width:600px){
    width: 100vw;
    height: 100vh;
    padding: 20px;
}
`;


const CommentBox = styled.div`
display: flex;
flex-direction: column;
width: 100%;
margin: auto 0;
background-color: white;
border-radius: 3vw;
align-items: center;
`;

const ImageArea = styled.div`
display: flex;
width: 100%;
height: 100%;
flex-direction: row;
align-items: center;

`;



const Top = styled.div`
width: 100%;
display: flex;
`;

const Head = styled.div`
width: 100%;
font-size: 1.5rem;
font-weight: 700;
display: flex;
justify-content: center;
margin-top: 3vw;
`;

const Close = styled.button`
width: 5vw;
height: 5vw;
text-align: center;
align-items: center;
top: 10;
right: 0%;
margin-right: 1vw;
background-color: white;
border: none;
`;

const Right = styled.div`
width: 50%;
gap:20px;
display: flex;
flex-direction: column;
`;



const Middle = styled.div`
width: 100%;
height:100%;
display: flex;
justify-content: center;
`;

const Profile = styled.img`
display: flex;
width: 40vw;
height: 40vw;
border-radius: 30vw;

`;



const DeImg = styled.div`
width: 100%;
padding: 5%;
border-radius: 10%;
border: none;
color: white;
font-weight: 700;
margin: auto;
background-color: #FFB7D9;

p{
  display: flex;
  justify-content: center;
  align-items: center;
}

`;

const AddImg = styled.div`
margin-top: 5px;
width: 100%;
height: 5vh;
border: none;
border-radius: 90px;
background-color: #26DFA6;
color: white;
font-weight: 700;
margin: auto;
p{
  display: flex;
  justify-content: center;
  align-items: center;
}

`;

const Goal = styled.input`
width: 100%;
height: 13vw;
border: 1px solid orange;
text-align: center;
margin: 1vw 0;
font-size: 1rem;
`;

const Input = styled.textarea`
width: 100%;
height: 25%;
font-size: 1.5rem;
border: 1px solid #9c9c9c;
border-radius: 1vw;
margin: 1vw 0 2vw 0;
resize: none;
:focus{
    outline: none;
}
`;

const Btn = styled.button`
width: 100%;
height: 5vh;
background-color: #26DFA6;
margin-bottom: auto 0;
border: none;
border-radius: 0 0 2vw 2vw;
color: white;
font-weight: 700;
bottom: 0;
`;


  export default PostModal;