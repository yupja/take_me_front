import React, { useState } from "react";
import {addFavoriteRQ} from "../../store/modules/favorite"

import {ReactComponent as EmptyStar} from "../../assets/icons/EmptyStar.svg"
import {ReactComponent as CheckedStart} from "../../assets/icons/CheckedStart.svg"
import { useDispatch } from "react-redux";


const FavoriteCheckedStar =(props) =>{
    const [star, setStar] = useState();
    const [favoriteId, setFavoriteId] = useState();
    const dispatch = useDispatch();

    
    const clickStar =()=>{
        let sendData={};

        console.log(star)

        if(star){
            setStar(false)
        }else if(!star){
            setStar(true)
            sendData = {
                categoryId: Number(props.categoryId),
                itemName:props.itemName,
                price: Number(props.price),
                itemId: Number(props.itemId)
            }
            dispatch(addFavoriteRQ(sendData))
        }
    }
    return(
        <div>
        {star?
        <CheckedStart onClick={()=>{
            clickStar();
        }}/>
        :
        <EmptyStar onClick={()=>{
            clickStar();
        }}/>
        }
        </div>
    )

}
export default FavoriteCheckedStar;