import React, {useEffect, useState} from "react";

import styled from "styled-components";
import "../public/css/saveMain.css"

import DayModal from "../components/DayModal";
import GoalADD from "../components/GoalAdd";
import GoalModify from "../components/GoalModify";
import FavoriteInput from "../components/FavoriteInput";
import SearchFavorite from "../components/SearchFavorite";

import { useDispatch } from "react-redux";

function Save(){

      
    const [modalOpen, setModalOpen] = useState(false);
    const [modalState, setModalState] = useState();

    const dispatch = useDispatch();
    

    const openModal = () => { setModalOpen(true); };
    const closeModal = () => { setModalOpen(false); };



    return (
        <div className="wrap">
            <div className="saveHeader">
                <div className="logo">로고</div>
                <p> 다시이</p>
                <div className="hamArea">
                    <button>햄버거</button>
                </div>
            </div>
            
            <div className="goalMain">
                <Circle onClick={()=>{
                    openModal();
                    setModalState(<GoalADD/>)
                }}>클릭</Circle>
            </div>

            <div className="favoriteArea">
                <SearchFavorite/>
            </div>

            <div className="savedList">
                티끌 이력 
            </div>

            
            <DayModal   open={modalOpen} 
                        close={closeModal} 
                        header="Modal heading">
                {modalState}
            </DayModal>
        </div>
    );
}

export default Save;

const Circle = styled.div`
width: 150px;
height: 150px;
border-radius: 50%;
background: lightgreen;
color : white;

`;
