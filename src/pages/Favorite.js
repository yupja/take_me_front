import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import SearchFavorite from "../components/SearchFavorite";
import FavoriteList from "../components/FavoriteList"
import { myFavoriteListRQ } from "../redux/modules/favorite";
import FavoriteAdd from "../components/FavoriteAdd";

import Header from "../components/Header";
import DayModal from "../components/DayModal"
import { ReactComponent as UpArrow } from "../public/img/svg/UpArrow.svg";
import { ReactComponent as ModifyPrice } from "../public/img/svg/ModifyPrice.svg";

import { addFavoriteRQ } from "../redux/modules/favorite"

function Favorite() {
  const [selectInputValue, setSelectInputValue] = useState([]);
  const priceInput = useRef();
  const priceRef = useRef();
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  // const [modalState, setModalState] = useState();
  const [modalName, setModalName] = useState("");
  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };


  // console.log(selectInputValue);

  const addFavoriteData = () => {
    const sendData = {
      categoryId: selectInputValue.categoryId,
      itemName: selectInputValue.itemName,
      itemId: selectInputValue.itemId,
      price: Number(priceInput.current.value)
    }
    dispatch(addFavoriteRQ(sendData));
    setSelectInputValue([]);

  }

  useEffect(() => {
    dispatch(myFavoriteListRQ());
  }, []);

  const mylist = useSelector((state) => state.favorite.myFavoriteList.data);
 

  const [Selected, setSelected] = useState('전체');

  const handeChangeSelect = (e) => {
    setSelected(e.target.value);
  }


  const newList = Selected === '전체' ? mylist : mylist?.filter((el) => {
    if (el.categoryName === Selected) {
      return true
    } else {
      return false
    }
  })



  // const selectList = [
  //   '식비', '카페/간식','술/유흥', '생활', '온라인쇼핑', '패션/쇼핑', '뷰티/미용', '교통',
  //   '주거/통신', '의료/건강', '금융', '문화/여가', '여행/숙박', '교육/학습', '자녀/육아', '반려동물', '경조/선물'
  // ]
  const selectList = [
    '전체', '식료품', '주류'
  ]


  return (
    <Wrap>
      <Header />
      <FavoriteWrap>
        <Category>
          <select name="category" onChange={handeChangeSelect} value={Selected}>
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <UpArrow className="arrow" />
        </Category>
        <SearchFavorite
          state={"favoriteState"}
          setSelectInputValue={setSelectInputValue} />
        <FavList>
          <Total>{mylist && mylist.length}개</Total>
          <ul>
            {selectInputValue.length === 0 ? ""
              : <li>
                <FavoriteAddWrap>
                  <span>⭐</span>
                  <p>{selectInputValue.itemName}</p>
                  <AddInputArea>
                    <input
                      type="Number"
                      ref={priceInput} />
                    <ModifyPrice onClick={addFavoriteData}>등록</ModifyPrice>
                    {/* <button onClick={openModal}> 새로운 아이템등록 </button> */}
                  </AddInputArea>
                </FavoriteAddWrap>
              </li>
            }
            {newList && newList.map((list, idx) => (
              <FavoriteList key={list.itemId + idx}
                itemName={list.itemName}
                price={list.price}
                favoriteId={list.favoriteItemId}
                catagory={list.categoryName}
              />
            ))}
          </ul>

          <DayModal open={modalOpen}
            close={closeModal}
            header={"즐겨찾기등록"}>
            <FavoriteAdd 
            setSelectInputValue={setSelectInputValue}
            />
          </DayModal>
        </FavList>
      </FavoriteWrap>
    </Wrap>

  )
};


export default Favorite;

const Wrap = styled.div`
/* padding: 0 25px; */
`

const FavoriteAddWrap = styled.div`
display: flex;
align-items: center;
justify-content: center;
justify-content: space-around;
padding: 1%;

input{
  background: #EFEFEF;
  border: none;
  border-radius: 25px;
  padding: 0.2rem;
  width: 60%;
}

`;

const AddInputArea = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
`;

const Category = styled.div`
position: relative;
/* background: #F8F8F8; */
padding: 10px 25px;
select {
  width: 100%;
  text-align: center;
  border-radius: 21px;
  border: 1px solid #ccc;
  padding: 10px 0;
  appearance: none;
}
.arrow {
  position: absolute;
  top: 50%; right: 10%;
  transform: translateY(-50%) rotate(180deg);
  width: 0.56rem;
  height: 1rem;
}
`

const FavoriteWrap = styled.div`
width: 100%;
position: relative;
`

const Total = styled.div`
  padding: 5px 25px;
  text-align: right;
  border-bottom: 1px solid #CCCCCC;
  font-size: 1.87rem;
`
const FavList = styled.div`
width: 100%;

ul{
  padding: 0 20px;
}
li{
  border-bottom: 1px solid #CCCCCC;
  position: relative;
}

`

