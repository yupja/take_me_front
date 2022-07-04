import React, { useRef, useState, useEffect } from "react"
import { useDispatch } from "react-redux";

import Category from "./Category"

import "../public/css/favoriteAdd.css"
import { BsPlus } from 'react-icons/bs'
import { BiMinus } from 'react-icons/bi'


const FavoriteInput = ()=>{
    const dispatch = useDispatch();


    const itemName = useRef()
    const [category , setCategory] = useState("")
    const [price, setPrice] = useState(0)
    

    function onlynumber(e) { // 천원단위 끊는거 구현하기 
	    let str = e.target.value
        setPrice(str);
	}

    const addFavorite=()=>{
        console.log("잘 오고있니?");
        console.log(itemName.current.value, category, price)

    }
    
    return(
        <>
        <div className="selectDesign">
            <Category setCategory={setCategory}/>
            
            <div className="itemName">
                <p>이름</p>
                <input 
                      type="text"
                      ref={itemName}
                      />
            </div>

            <div className="priceSet">
                <p>가격</p>
                    <div className="inputDiv">
                        <BsPlus/>
                            <input onChange={onlynumber}>
                            </input>
                        <BiMinus/>
                    </div>
           </div>
        </div>

        <div className="footer"
             onClick={addFavorite}>
            <label>티끌 등록하기</label>

        </div>
        </>
    )
}


export default FavoriteInput
