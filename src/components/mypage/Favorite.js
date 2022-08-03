import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import SearchSavedItem from "../public/SearchItems";
import FavoriteList from "./FavoriteList"
import FavoriteAdd from "./FavoriteAdd";

import Header from "../public/Header";
import Modal from "../public/BasicModalForm"
import { ReactComponent as UpArrow } from "../../assets/icons/UpArrow.svg";

import { addFavoriteRQ, myFavoriteListRQ } from "../../store/modules/myInfo"

function Favorite() {
  const title = "즐겨찾기";

  const [selectInputValue, setSelectInputValue] = useState([]);
  const priceInput = useRef();
  const dispatch = useDispatch();


  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };


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

  const mylist = useSelector((state) => state.myInfo.myFavoriteList);

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


  const selectList = [
    '전체', '식비', '카페/간식', '술/유흥', '생활', '온라인쇼핑', '패션/쇼핑', '뷰티/미용', '교통', '주거/통신', '의료/건강', '금융', '문화/여가', '여행/숙박', '교육/학습', '자녀/육아', '반려동물', '경조/선물'
  ]


  return (
    <Wrap>
      <div style={{ background: "#F8F8F8" }}>
        <Header title={title} />
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
      </div>
      <FavoriteWrap>

        <div className="SearchArea">
          <SearchSavedItem
            state={"티끌을 검색해주세요"}
            setSelectInputValue={setSelectInputValue} />
        </div>

        <FavList>
          <Total>{newList && newList.length}개</Total>
          <ul>
            {selectInputValue.length === 0 ? ""
              : <li>
                <div>
                  <span>⭐</span>
                  <p>{selectInputValue.itemName}</p>
                  <div>
                    <input
                      type="Number"
                      ref={priceInput} />
                    <button onClick={addFavoriteData}>등록</button>
                    <button onClick={openModal}> 새로운 아이템등록 </button>
                  </div>
                </div>
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

          <Modal open={modalOpen}
            close={closeModal}
            header={"즐겨찾기등록"}>
            <FavoriteAdd setSelectInputValue={setSelectInputValue} />
          </Modal>
        </FavList>
      </FavoriteWrap>

    </Wrap>

  )
};


export default Favorite;

const Wrap = styled.div`
`
const Category = styled.div`
position: relative;
padding: 10px 25px;

select {
  width: 100%;
  text-align: center;
  border-radius: 21px;
  border: 1px solid #ccc;
  padding: 10px 0;
  appearance: none;
  font-size: 1.125rem;
  font-weight: 500;
}
.arrow {
  position: absolute;
  top: 50%; right: 13%;
  transform: translateY(-50%) rotate(180deg);
}
`

const FavoriteWrap = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 3% 0 0 0;

.SearchArea{
  position: relative;
  z-index: 99;
  align-items: center;
  width: 87%;
}
`

const Total = styled.div`
  padding: 10px 25px;
  text-align: right;
  border-bottom: 1px solid #CCCCCC;
  font-size: 1.125rem;
`
const FavList = styled.div`
width: 100%;

ul{
  padding: 0 10px;
}
li{
  border-bottom: 1px solid #CCCCCC;
  position: relative;
}

`

