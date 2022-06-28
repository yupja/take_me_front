import React, {useEffect, useState} from "react";
import styled from "styled-components";
import GoalModal from "../components/GoalModal";
import GoalADD from "../components/GoalAdd";
import GoalModify from "../components/GoalModify";

// 오늘 4시 전까지 할 것 !
// 1. 클릭하면 모달창 띄우기   -끝
// 2. 모달창 오픈되면 인풋받기 
// 3. 인풋받은 값을 함수로 저장해서 디스패치 하기
// 4. 목 api 연결해서 데이터 저장하기
// 5. 목표항목 출력하기 ㅇ_ㅇ ! 

function Save(){
    const [modalOpen, setModalOpen] = useState(false);
    const [modalState, setModalState] = useState();


    const openModal = () => { setModalOpen(true); };
    const closeModal = () => { setModalOpen(false); };

    useEffect(() => {
     //myfavorite 가져오셈
     });

    
    return (
        <div>
            <Circle onClick={()=>{
                openModal();
                setModalState(<GoalADD/>)
            }}>클릭</Circle>
            
            <GoalModal open={modalOpen} close={closeModal} header="Modal heading">
                {modalState}
            </GoalModal>
        </div>
    );
}

export default Save;

const Circle = styled.div`
width: 200px;
height: 200px;
border-radius: 50%;
background: lightgreen;
color : white;

`;
