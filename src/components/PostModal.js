import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux/es/exports";
import { createPostAc } from "../redux/modules/post";


const PostModal = (props) => {

    const dispatch = useDispatch();

    const contents_ref = React.useRef();
    const goalItemid_ref = React.useRef();
    const [imgFile, setImgFile] = useState();

    const thumb = React.useRef();

    const postAc = () => {

        console.log(contents_ref.current.value, goalItemid_ref.current.value,"이건")
        const post = {
            contents:contents_ref.current.value,
            goalItemId:goalItemid_ref.current.value
        }
        console.log(post,"좀보자")
        dispatch(createPostAc(post))
    }

  
    return (
      <>
      {props.showModalll ?

        <Background>
            <ModalBox onClick={e => e.stopPropagation()}>
            <Close onClick={props.closeModalll}>X</Close>
                <CommentBox>
                    <Head>내 아낌 % 공유</Head>
                    <Middle>
                        <Profile></Profile>
                        <Right>
                            <DeImg>기본 이미지</DeImg>
                            <AddImg>이미지 등록</AddImg>
                        </Right>
                    </Middle>
                    <Goal ref={goalItemid_ref}></Goal>
                    <Input ref={contents_ref}></Input>
                    <Btn onClick={postAc}>공유하기</Btn>

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
background-color: rgba(249,249,249,0.85);
z-index: 0;
`;

const ModalBox = styled.div`
position: fixed;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
width: 580px;
min-height: 50vh;
border: 1px solid red;
background: white;
box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;

  @media screen and (max-width:600px){
    width: 100vw;
    height: 100vh;
    padding: 20px;
}
`;

const Close = styled.button`
border: 1px solid violet;
width: 10%;
height: 10%;
float: right;
`;

const CommentBox = styled.div`
width: 100%;
height: 60vh;
background-color: gray;
padding: 2rem;
/* justify-content: center; */
display: flex;
flex-direction: column;
border: 1px solid yellow;
`;

const Head = styled.div`
width: 100%;
height: 3vh;
font-size: 2rem;
display: flex;
justify-content: center;
`;

const Middle = styled.div`
width: 100%;
height: 35%;
border: 1px solid pink;
display: flex;
flex-direction: row;
justify-content: center;
`;

const Profile = styled.img`
width: 170px;
height: 170px;
border-radius: 150px;
border: 1px solid red;

`;

const Right = styled.div`
width: 50%;
height: 100%;
border: 1px solid purple;

`;

const DeImg = styled.button`
width: 100%;
height: 90px;
border: 1px solid blue;
border-radius: 90px;
`;

const AddImg = styled.button`
width: 100%;
height: 90px;
border: 1px solid green;
border-radius: 90px;
`;

const Goal = styled.input`
width: 100%;
height: 100px;
border: 1px solid orange;

`;

const Input = styled.textarea`
width: 100%;
height: 25%;
font-size: 2rem;
`;

const Btn = styled.button`
width: 100%;
height: 5vh;
background-color: yellowgreen;
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

  export default PostModal;