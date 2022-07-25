import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useParams } from "react-router-dom";
import { loadsavedAc } from "../../store/modules/saved";
import FavoriteCheckedStar from "../mypage/FavoriteCheckedStar";



const ListModal = (props) => {

  const dispatch = useDispatch();
  const params = useParams();

  const savedListData = useSelector((state) => state.saved.savedItem.data.savedItemList);
  const saveData = useSelector((state) => state.saved.savedItem.data);

  console.log(savedListData)

  React.useEffect(() => {
    dispatch(loadsavedAc(props.boardId))
  }, [])

  return (

    <>
      <Wrap>
        {/* <Young/>  재엽님 이거 반영하는건 좀 나중에 생각해봅시다. */}

        <div className="header">
          <p>{saveData.userId}님의 {props.goalItemName} </p>
          <p style={{ fontSize: "1.5rem" }}>{saveData.price}원</p>
        </div>

        {savedListData && savedListData?.map((item, itemIndex) => (

          <ul>
            <li>
              <div className="leftBox">
                <p>{savedListData[itemIndex].createdDate.split(/[T,.]/, 1)}</p>
                <p>{savedListData[itemIndex].saveItemName}</p>
              </div>
              <div className="rightBox">
                {savedListData[itemIndex].price}
                <FavoriteCheckedStar />
              </div>
            </li>
          </ul>
        ))}
        </Wrap>
    </>

  );
};

const Wrap = styled.div`
  width: 100%;
  height: 50%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  
ul{
  padding: 0 2%;
}

li{
  display: flex;
  height: 10%;
  border-bottom: 1px solid #CCCCCC;
  justify-content: space-between;
  align-items: center;
  padding: 5%;
}
  .header{
    display: flex;
    margin-bottom: 5%;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .leftBox{
  gap:10%;
  width: 40%;
  display: flex;
  justify-content: space-around;;
  align-items: center;
  padding-left: 5px;
}
.rightBox{
  width: 15%;
  gap: 30%;
  display: flex;
  align-items: center;
  flex-direction: row;
}
  `;

export default ListModal;