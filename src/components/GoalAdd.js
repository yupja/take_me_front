import React, {useRef, useState} from "react";
import { useDispatch } from "react-redux";

import Category from "./Category";
import { addGoalRQ } from "../redux/modules/favorite"

const GoalADD = ()=>{
    const dispatch = useDispatch();

    const [category , setCategory] = useState();


    const itemName = useRef();
    const price = useRef();
    const goalItemCount = useRef();


    const sendData = () =>{
        const data = {
            itemName : itemName.current.value,
            price : price.current.value,
            goalItemCount : goalItemCount.current.value

        }
        dispatch(addGoalRQ(data));
    }

    return (
        <div> 
            <div><Category  setCategory={setCategory}/></div>
            <div> <p>ItemName</p> <input type='text' ref={itemName}/></div>
            <div> <p>Price</p> <input type='text' ref={price}/></div> 
            <div><p>수량</p> <input type="Number" ref={goalItemCount}/></div>
            <button onClick={sendData}>버튼이다아아아아아</button>
        </div>
    )

}

export default GoalADD;
