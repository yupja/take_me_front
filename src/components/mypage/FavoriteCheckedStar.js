import React, { useEffect, useState } from "react";
import { addFavoriteRQ, favoriteDel } from "../../store/modules/myInfo"

import { ReactComponent as EmptyStar } from "../../assets/icons/EmptyStar.svg"
import { ReactComponent as CheckedStart } from "../../assets/icons/CheckedStart.svg"
import { useDispatch, useSelector } from "react-redux";


const FavoriteCheckedStar = (props) => {
    const [star, setStar] = useState(props.favorite);
    const [favoriteId, setFavoriteId] = useState();
    const dispatch = useDispatch();

    const currentId = useSelector(((state => state.myInfo.currentFavoriteId.data?.favoriteItemId)));

    const clickStar = () => {
        let sendData = {};


        if (star) {
            setStar(false)
            dispatch(favoriteDel(currentId))

        } else if (!star) {
            setStar(true)
            sendData = {
                categoryId: Number(props.categoryId),
                itemName: props.itemName,
                price: Number(props.price),
                itemId: Number(props.itemId)
            }
            dispatch(addFavoriteRQ(sendData))
        }
    }
    return (
        <div>
            {star ?
                <CheckedStart onClick={() => {
                    clickStar();
                }} />
                :
                <EmptyStar onClick={() => {
                    clickStar();
                }} />
            }
        </div>
    )

}
export default FavoriteCheckedStar;