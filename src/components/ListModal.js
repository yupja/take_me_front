import React from "react";
import styled from "styled-components";

const ListModal = (props) => {
  
    return (
      <>
      {props.showModall ?

        <Background>
            <ModalBox onClick={e => e.stopPropagation()}>
            <Close onClick={props.closeModall}>X</Close>
                <CommentBox>
                    <span>리스트</span>

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
width: 642px;
min-height: 30vh;
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
height: 40vh;
background-color: gray;
padding: 2rem;
/* justify-content: center; */
display: flex;
border: 1px solid yellow;
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

  export default ListModal;