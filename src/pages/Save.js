import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {myReadGoalRQ} from "../redux/modules/goal"
import {readSaveListRQ} from "../redux/modules/saveList"

import DayModal from "../components/DayModal";
import SearchFavorite from "../components/SearchFavorite";
import HeaderMenue from "../components/HeaderMenu";
import DountChart from "../components/Goal";

import styled from "styled-components";
import "../public/css/saveMain.css"
import { FaRegEdit } from 'react-icons/fa'
import { IoArrowRedoOutline } from 'react-icons/io5'
import {AiOutlineStar} from 'react-icons/ai'


function Save(){

    useEffect(() => {
        dispatch(myReadGoalRQ());
        dispatch(readSaveListRQ());
      }, []);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalState, setModalState] = useState();
    const [modalName, setModalName] = useState("");

    const dispatch = useDispatch();
    

    const openModal = () => { setModalOpen(true); };
    const closeModal = () => { setModalOpen(false); };

    const myGoalList=[];
    const mySavedList = useSelector((state) => state.save.saveList);
    console.log(mySavedList)
    const state ="데일리 티끌"

    return (
        <div className="wrap">
            <div className="topWrap">
                <HeaderMenue state={state}/>
                <div className="goalMain">
                    {/* 목표가 있을경우 없을 경우 비교해서 조건문 걸기  */}
                    { myGoalList.length===0 ?
                        <>  
                            {/* <Circle onClick={()=>{
                                openModal();
                                setModalName("내 목표 만들기!")
                                setModalState(<GoalADD/>)
                            }}>
                            <p className="circleInP">+목표만들기</p>
                            </Circle> */}

                            <DountChart color="#9bd728" percent={0.75} size="200px" />
                            <p className="goalTitle">아껴서 뭐사?</p>
                        </>
                    :
                        <>  
                            <div className="circle" style={{background:"rgba(0, 0, 0, 0.5)"}}>
                                <div className="isGoalSubmenuBox">
                                    <div>
                                        <FaRegEdit size="15"/>
                                        <p>목표 변경</p>
                                    </div>
                                    <div>
                                        <IoArrowRedoOutline size="15"/>
                                        <p>내 현황 공유</p>
                                    </div>
                                </div>
                            </div>
                            <p className="goalTitle">로봇청소기</p>
                        </>
                    }
                </div>
            </div>

                <div className="favoriteArea">
                    <SearchFavorite/>
                </div>

            <SavedList>
                    {mySavedList&&mySavedList.map((savedItem, savedItemIndex)=>(
                        <>
                        <div className="sListWrap">
                            <div className="star"><AiOutlineStar/></div>
                            <p className="date">{savedItem.createdAt}<br/></p>
                            <p>{savedItem.categoryName}</p>
                            <p>{savedItem.itemName}</p>
                            <button>수정</button>
                            <button>삭제</button>
                        </div>
                        </>
                    ))}
            </SavedList>

            <DayModal   open={modalOpen} 
                        close={closeModal} 
                        header={modalName}>
                {modalState}
            </DayModal>
        </div>
    );
}


const Circle = styled.div`
width: 180px;
height: 180px;
border-radius: 50%;
background:  #26DFA6;
color : white;

display: flex;
align-items: center;
justify-content: center;
`;

const SavedList = styled.div`
`;

export default Save;
