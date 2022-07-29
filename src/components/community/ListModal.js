import React,{useState} from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useParams } from "react-router-dom";
import { loadsavedAc } from "../../store/modules/saved";
import { ReactComponent as SavePaper } from "../../assets/icons/SavePaper.svg";
import { ReactComponent as Close } from "../../assets/icons/Close.svg";
import { ReactComponent as CheckedStart } from "../../assets/icons/CheckedStart.svg";
import { AiOutlineStar } from 'react-icons/ai'


const ListModal = (props) => {

  const dispatch = useDispatch();
  const params = useParams();

  const saveData = useSelector((state) => state.saved.savedItem.data.savedItemList);
  const saveDataa = useSelector((state) => state.saved.savedItem.data);
  const boardId = (props.forsaveId)

  const [star, setStar] = useState(false);

  const changeStar = () => {
    if (star) {
      setStar(false);
    } else {
      setStar(true);
    }
  }

  React.useEffect(() => {
    dispatch(loadsavedAc(boardId))
  }, [])

  return (
    <>
      {props.showModall ?
      <>
        <Background>
          {/* <ModalBox onClick={e => e.stopPropagation()}> */}
          <PaperBox>
            <SavePaper className="paper" position="relative"></SavePaper>
          </PaperBox>
          <BigBox>
            <Top>
              <Closeb onClick={props.closeModall}><Close /></Closeb>
            </Top>
            <Middle>
              <p><Spann>{saveDataa.userId}</Spann>님의
              {saveDataa.goalItemName} <Spann>KEEP</Spann></p>
              <p style={{ fontWeight: "700", marginTop: "8px" }}>
                {saveDataa.savedItemTotalPrice} 원</p>
            </Middle>
            <ListBox>
              <>
                {saveData?.map((savedItem, index) => (
                  <>
                    <List key={index}>
                      <Left>
                        <CreateAt>
                          {savedItem.createdDate.substr(0, 10).split('-', '3').join(".")}
                        </CreateAt>
                        <SavedName>{savedItem.saveItemName}</SavedName>
                      </Left>
                      <Right>
                        <Price>{savedItem.price} 원</Price>
                        {/* <Star>⭐</Star> */}
                        <StarArea onClick={() => { changeStar(); }}>
                    {star ?
                      <CheckedStart />
                      :
                      <AiOutlineStar />
                    }
                  </StarArea>
                      </Right>
                    </List>
                  </>
                ))}
              </>
            </ListBox>
          </BigBox>
          {/* </ModalBox> */}
          <CloseBtn onClick={props.closeModall}>닫기</CloseBtn>
        </Background></> : null}
    </>

  );
};


const StarArea = styled.span`
/* display: flex; */
width: 15px;
`;

const BigBox = styled.div`
  /* border: 1px solid gold; */
  width: 100%;
  height: 100%;
  `;

const PaperBox = styled.div`
  text-align: center;
align-items: center;
/* float: right; */
position: absolute;
/* margin-right: 1vw; */
border: none;
/* top: 430px;  */
left: 50%;
transform: translate(-50%, -5%);
  `;

const ListBox = styled.div`
  /* border: 1px solid red; */
  width: 330px;
  height: 400px;
  overflow: auto;
  display: flex;
  flex-direction: column;
margin: auto;
align-items: center;
position: absolute;
z-index: 90;
top: 370px; 
left: 50%;
transform: translate(-50%, -50%);
`;

const Background = styled.div`
width: 100%;
height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgb(0,0,0,0.3);
  display: flex;
  justify-content: center;
  /* background-color: rgba(41,41,41,0.85); */
  z-index: 889;
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
width: 300px;
height: 20px;
align-items: center;
position: absolute;
top: 20px;
display: flex;
justify-content: end;
`;

const Top = styled.div`
width: 150px;
/* width: 100%; */
/* border: 1px solid blue; */
display: flex;
margin:10px 0 15px 0;
position: absolute;
display: flex;
justify-content: center;
z-index: 90;
left: 50%;
transform: translate(-50%, -50%);
`;

const Middle = styled.div`
width: 100%;
height: 50px;
/* border: 1px solid red; */
font-size: 25px;
text-align: center;
display: flex;
justify-content: center;
flex-direction: column;
top: 120px;
left: 50%;
transform: translate(-50%, -50%);
position: absolute;
`;

const Spann = styled.span`
color : #26DFA6;
font-weight: 700;
`;

const List = styled.div`
width: 80%;
height: 40px;
align-items: center;
justify-content: center;
line-height: 40px;
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
margin-left: 15px;
`;

const Right = styled.div`
float: right;
display: flex;
align-items: center;
/* border: 1px solid black; */
`;

const Price = styled.span`
font-size: 1rem;
color: #333333;
margin-right: 15px;
`;

const Star = styled.span`
font-size: 1rem;
`;
const CloseBtn = styled.button`
width: 163px;
height: 60px;
border-radius: 15vw;
border: none;
background-color: #26DFA6;
color: white;
font-size: 1rem;
font-weight: 700;
display: flex;
justify-content: center;
align-items: center;
bottom: 10%;
position: absolute;
`;

export default ListModal;