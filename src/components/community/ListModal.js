import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useParams } from "react-router-dom";
import { loadsavedAc } from "../../store/modules/saved";
import {ReactComponent as ReceiptB} from "../../assets/icons/ReceiptB.svg";
import {ReactComponent as SavePaper} from "../../assets/icons/SavePaper.svg";
import {ReactComponent as Close} from "../../assets/icons/Close.svg";


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
            {/* <ModalBox onClick={e => e.stopPropagation()}> */}
            <YoungBox>
              <SavePaper className="paper" position="relative"/>
              </YoungBox>
                {/* <CommentBox> */}
                <BigBox>
                  <Stopplz>
                    <Top>
                      <Icon>
                        {/* <ReceiptB className="bigger"/> */}
                      </Icon>   
                    <Closeb onClick={props.closeModall}><Close /></Closeb>
                    </Top>
                    <Middle>
                        <p><Spann>{saveDataa.userId}</Spann>님의 {saveDataa.goalItemName} <Spann>KEEP</Spann></p>
                        <p style={{fontWeight:"700", marginTop:"2vw"}}>{saveDataa.savedItemTotalPrice} 원</p>
                    </Middle>
                    </Stopplz>
<Boxer>
  <>
                    {saveData?.map((savedItem, index) => (
                    // <ListBox>
                    <>
                    <List key={index}>
                      <Left>
                      <CreateAt>{savedItem.createdDate.substr(0, 10).split('-','3').join(".")}</CreateAt>
                      <SavedName>{savedItem.saveItemName}</SavedName>
                      </Left>
                      <Right>
                      <Price>{savedItem.price} 원</Price>
                      <Star>⭐</Star>
                      </Right>
                    </List>
                    {/* </ListBox> */}
                   </>
                    ))}
                    </>
 </Boxer>
 </BigBox>
                {/* </CommentBox> */}
            {/* </ModalBox> */}
             <CloseBtn onClick={props.closeModall}>닫기</CloseBtn>
        </Background> : null}
</>

    );
  };

  const Stopplz = styled.div`
  /* border: 3px solid purple; */
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  width: 80%;
  height: 20vw;
  top: 14%;
  position: absolute;

  `;

  const BigBox = styled.div`
  /* border: 1px solid gold; */
  width: 80vw;
  `;

  const YoungBox = styled.div`
  text-align: center;
align-items: center;
/* float: right; */
position: absolute;
margin-right: 1vw;
border: none;
top: 50%; 
left: 50%;
transform: translate(-50%, -50%);
  `;

  const Boxer = styled.div`
  border: 1px solid red;
  width: 330px;
  height: 400px;
  overflow: auto;
  display: flex;
  flex-direction: column;
margin: auto;
align-items: center;
position: absolute;
z-index: 90;
top: 55%; 
left: 50%;
transform: translate(-50%, -50%);
`;

  const ListBox = styled.div`
  border: 1px solid goldenrod;
  width: 90vw;
  height: 105vw;
  /* position: absolute; */
    /* z-index: 80; */
    /* top: 55%;  */
    /* left: 50%; */
    /* transform: translate(-50%, -50%); */
    /* overflow: auto; */
  `;

  const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgb(0,0,0,0.3);
  display: flex;
  justify-content: center;
  /* background-color: rgba(41,41,41,0.85); */
  .paper{
    position: relative;
  }
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
  
const Closeb = styled.div`
/* border: 2px solid violet; */
width: 100%;
height: 5vw;
align-items: center;
/* float: right; */
position: absolute;
top: 10;
/* right: 0%; */
margin-right: 1vw;
display: flex;
justify-content: end;
/* background-color: white; */
/* border: none; */
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
width: 80vw;
/* width: 100%; */
/* border: 1px solid blue; */
display: flex;
margin:1vw 0 3vw 0;
position: absolute;
display: flex;
justify-content: center;
z-index: 90;
/* top: 13.5%;  */
left: 50%;
transform: translate(-50%, -50%);
`;

const Icon = styled.div`
width: 100%;
/* border: 1px solid red; */
height: 3vh;
font-size: 100rem;
font-weight: 700;
/* display: flex; */
justify-content: center;
margin-top: 3vw;
display: flex;

`;

const Middle = styled.div`
width: 100%;
height: 20px;
/* border: 1px solid red; */
font-size: 1.5rem;
font-size: 25px;
/* font-weight: 700; */
text-align: center;
display: flex;
justify-content: center;
flex-direction: column;
/* margin-top: 3vw; */
/* margin-bottom: 5vw; */
top: 75px;
left: 175px;
transform: translate(-50%, -50%);
z-index: 80;
position: fixed;
top: 465px; 
left: 700px;
transform: translate(-50%, -50%);
`;

const Spann = styled.span`
color : #26DFA6;
font-weight: 700;
`;

const List = styled.div`
width: 80%;
height: 40px;
border: 1px solid blue;
/* display: flex; */
/* justify-content: space-between; */
align-items: center;
justify-content: center;
/* overflow: hidden; //float 랑 같이 부모 요소에! */
/* border-bottom: 1px solid gray; */
line-height: 10vw; //폰트의 높이!
/* top: 2%; */
/* left: 50%; */
/* transform: translate(-50%, -50%); */
/* z-index: 80; */
/* position: absolute; */
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
height: 8vh;
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