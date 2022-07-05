import React, {useRef, useState} from "react"
import { useDispatch } from "react-redux"

import Category from "./Category"
import { addGoalRQ } from "../redux/modules/goal"

const GoalADD = ()=>{
    const dispatch = useDispatch()

    const [category , setCategory] = useState()


    const itemName = useRef()
    const price = useRef()
    const goalItemCount = useRef()


    const sendData = () =>{
        const data = {
            itemName : itemName.current.value,
            price : price.current.value,
            goalItemCount : goalItemCount.current.value,
            category : Number(category)
        }

        dispatch(addGoalRQ(data))
    }

    return (
        <>
        <div> 
            <div><Category  setCategory={setCategory}/></div>
            <div> <p>ItemName</p> <input type='text' ref={itemName}/></div>
            <div> <p>Price</p> <input type='text' ref={price}/></div> 
            <div><p>수량</p> <input type="Number" ref={goalItemCount}/></div>
        </div>

        <div className="footer"
             onClick={sendData}>
        <label>티끌만들기 완료</label>

        </div>
        </>
    )

}

export default GoalADD
