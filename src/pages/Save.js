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
            <div className="topWrap">
                <div className="saveHeader">
                    <div className="logo">로고</div>
                    <p>티끌아끼기</p>
                    <div className="hamArea">
                        <button>햄버거</button>
                    </div>
                </div>
                
                <div className="goalMain">
                    <div className="circle" onClick={()=>{
                        openModal();
                        setModalState(<GoalADD/>)
                    }}></div>
                    <p>로봇청소기 60%</p>
                </div>
            </div>

                <div className="favoriteArea">
                    <SearchFavorite/>
                </div>

            <div className="savedList">
                <div className="sListWrap">
                    <div className="star">⭐</div>
                    <p className="date">2022<br/></p>
                    <div className="itemName"> 3000원</div>
                    <button>등록</button>
                </div>
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


`;
