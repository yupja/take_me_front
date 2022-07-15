import React, {useState} from "react";

import { useDispatch} from "react-redux";
import {addFavoriteRQ, favoriteDel} from "../redux/modules/favorite"


import styled from "styled-components";
import { AiOutlineStar } from 'react-icons/ai'
import {ReactComponent as CheckedStart} from "../public/img/svg/CheckedStart.svg"



const Star = (props)=>{
    const [ star, setStar] = useState(props.favorite);
    const dispatch = useDispatch();

    const addFavoriteStar = () => {
        const sendData = {
          categoryId: props.categoryId,
          itemName: props.itemName,
          itemId: props.itemId,
          price: props.price
        }
        dispatch(addFavoriteRQ(sendData));
      }


    const changeHeart = () =>{
        if(star){
          setStar(false);
          dispatch(favoriteDel(props.favoriteId))
        }else{
          setStar(true);
          addFavoriteStar()
        }
      }


    return (
        <StarArea onClick={()=>{
            changeHeart();
            }}>
            {star? 
              <CheckedStart/>
              :  
              <AiOutlineStar />
            }
          </StarArea>
    )
}

const StarArea =styled.div`
display: flex;
width: 5vh;
`;

export default Star;