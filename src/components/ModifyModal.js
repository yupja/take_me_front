import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux/es/exports";
import { UpdatePost } from "../redux/modules/post";


const ModifyModal = (props) => {

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

      console.log(props.formodiId,"propopop")

    const modiPost = () => {
        const data = {
            title : title_ref.current.value,
            contents:contents_ref.current.value,
            file: imageFile,
            boardId : props.formodiId
        }
        console.log(data,"공유하기")
        dispatch(UpdatePost(data))
    }

  
    return (
      <>
      {props.showModall ?

        <Background>
            <ModalBox onClick={e => e.stopPropagation()}>
            
                <CommentBox>
                    <Top>
                    <Head>내 태산 % 게시글 수정</Head>    
                    <Close onClick={props.closeModall}>X</Close>
                    </Top>
                    <Middle>
                        <Profile src={image}></Profile>
                        <Right>
                            <DeImg>기본 이미지</DeImg>
                                    <AddImg className="filebox">
                                    <label htmlFor="ex_file" style={{magin:" 0 auto"}}>이미지 등록</label>
                                    <input type="file"
                                            name="image" 
                                            multiple="multiple"
                                            onChange={imageUpLoad}
                                    id="ex_file" style={{display:"none"}}/> 
                                    </AddImg>
                        </Right>
                    </Middle>
                    <Goal ref={title_ref}></Goal>
                    <Input ref={contents_ref}></Input>
                    <Btn onClick={modiPost}>수정하기</Btn>

                </CommentBox>
            </ModalBox>
        </Background> : null}
</>

    );
  };

const Background = styled.div`
position: fixed;
top: 0;
left: 0;
bottom: 0;
right: 0;
z-index: 999;
/* background-color: rgba(41,41,41,0.85); */
`;

const ModalBox = styled.div`
position: fixed;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
width: 580px;
min-height: 50vh;
/* border: 5px solid red; */
background-color: rgb(0,0,0,0.3);
box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
display: flex;

  @media screen and (max-width:600px){
    width: 100vw;
    height: 100vh;
    padding: 20px;
}
`;

const Close = styled.button`
/* border: 5px solid violet; */
width: 5vw;
height: 5vw;
text-align: center;
align-items: center;
/* float: right; */
position: absolute;
top: 10;
right: 0%;
margin-right: 1vw;
background-color: white;
border: none;
`;

const CommentBox = styled.div`
width: 100%;
height: 50vh;
margin: auto 0;
background-color: white;
/* justify-content: center; */
display: flex;
flex-direction: column;
/* border: 3px solid yellow; */
border-radius: 3vw;
align-items: center;
position: relative;
`;

const Top = styled.div`
width: 100%;
display: flex;
margin:1vw 0 3vw 0;
`;

const Head = styled.div`
width: 100%;
height: 3vh;
font-size: 1.5rem;
font-weight: 700;
display: flex;
justify-content: center;
margin-top: 3vw;
/* border: 2px solid blue; */
`;

const Middle = styled.div`
width: 100%;
height: 35%;
/* border: 1px solid pink; */
display: flex;
flex-direction: row;
justify-content: center;
`;

const Profile = styled.img`
width: 33vw;
height: 33vw;
border-radius: 30vw;
border: 1px solid red;
margin: auto;
`;

const Right = styled.div`
width: 50%;
height: 100%;
/* border: 1px solid purple; */
padding: 3%;
display: flex;
flex-direction: column;
align-content: space-between;
`;

const DeImg = styled.button`
width: 100%;
height: 15vw;
border-radius: 90px;
border: none;
color: white;
font-weight: 700;
margin: auto;
background-color: #FFB7D9;
`;

const AddImg = styled.div`
width: 100%;
height: 15vw;
border: none;
border-radius: 90px;
background-color: #26DFA6;
color: white;
font-weight: 700;
margin: auto;
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
position: absolute;
bottom: 0;
`;
//   /* 팝업이 열릴때 스르륵 열리는 효과 */
//   animation: modal-bg-show 0.3s;
// }
// @keyframes modal-show {
//   from {
//     opacity: 0;
//     margin-top: -50px;
//   }
//   to {
//     opacity: 1;
//     margin-top: 0;
//   }
// }
// @keyframes modal-bg-show {
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
//   }
// `

//   /* 팝업이 열릴때 스르륵 열리는 효과 */
//   animation: modal-show 0.3s;
//   overflow: hidden;
// `;

  export default ModifyModal;