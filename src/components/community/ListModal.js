import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useParams } from "react-router-dom";
import { loadsavedAc } from "../../store/modules/saved";
import {ReactComponent as Receipt} from "../../assets/icons/Receipt.svg";

const ListModal = (props) => {

  const dispatch = useDispatch();
  const params = useParams();

  const saveData = useSelector((state) => state.saved.savedItem.data.savedItemList);
  const saveDataa = useSelector((state) => state.saved.savedItem.data);
  const boardId = (props.forsaveId)

  console.log(boardId);
  

  React.useEffect(() => {
    dispatch(loadsavedAc(boardId))
    // dispatch(loadCommentAc())
},[])

    return (
      <>
      {props.showModall ?

        <Background>
            <ModalBox onClick={e => e.stopPropagation()}>
                <CommentBox>
                    <Top>
                      <Icon>
                        <Receipt className="bigger"/>
                      </Icon>   
                    <Close onClick={props.closeModall}>X</Close>
                    </Top>
                    <Middle>
                        <p><Spann>{saveDataa.userId}</Spann>님의 {saveDataa.goalItemName} <Spann>KEEP</Spann></p>
                        <p style={{fontWeight:"700", marginTop:"2vw"}}>{saveDataa.savedItemTotalPrice} 원</p>
                    </Middle>
                    {saveData?.map((savedItem, inddex) => (
                    
                    <List key={inddex}>
                      <Left>
                      <CreateAt>{savedItem.createdDate}</CreateAt>
                      <SavedName>{savedItem.savedItemName}</SavedName>
                      </Left>
                      <Right>
                      <Price>{savedItem.price} 원</Price>
                      <Star>⭐</Star>
                      </Right>
                    </List>
                    
                    ))}
                </CommentBox>
            </ModalBox>
             <CloseBtn onClick={props.closeModall}>닫기</CloseBtn>
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
  background-color: rgb(0,0,0,0.3);
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
  box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
  display: flex;
  z-index: 99;
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

const Icon = styled.div`
width: 100%;
height: 3vh;
font-size: 100rem;
font-weight: 700;
/* display: flex; */
justify-content: center;
margin-top: 3vw;

`;

const Middle = styled.div`
width: 100%;
height: 12vw;
/* border: 1px solid red; */
font-size: 1rem;
/* font-weight: 700; */
text-align: center;
margin-top: 3vw;
`;

const Spann = styled.span`
color : #26DFA6;
font-weight: 700;
`;

const List = styled.div`
width: 100%;
height: 10vw;
/* border: 1px solid blue; */
/* display: flex; */
/* justify-content: space-between; */
align-items: center;
padding: 0 5vw 0 5vw;
overflow: hidden; //float 랑 같이 부모 요소에!
border-bottom: 1px solid gray;
line-height: 10vw; //폰트의 높이!
`;

const Left = styled.div`
float: left;
`;

const CreateAt = styled.span`
font-size: 0.5rem;
color: #999999;
`;

const SavedName = styled.span`
font-size: 1rem;
color: #333333;
margin-left: 3vw;
`;

const Right = styled.div`
float: right;
`;

const Price = styled.span`
font-size: 1rem;
color: #333333;
margin-right: 3vw;
`;

const Star = styled.span`
font-size: 1rem;
`;
const CloseBtn = styled.button`
width: 40vw;
height: 15vw;
border-radius: 15vw;
border: none;
background-color: #26DFA6;
color: white;
font-size: 1rem;
font-weight: 700;
position: absolute;
display: flex;
justify-content: center;
align-items: center;
bottom: 5%;
left: 30%;
`;


//   /* 팝업이 열릴때 스르륵 열리는 효과 */
//   animation: modal-show 0.3s;
//   overflow: hidden;
// `;

  export default ListModal;