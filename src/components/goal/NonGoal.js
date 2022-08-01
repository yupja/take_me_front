import React, {useState} from "react";
import GoalInput from "./GoalInput"

import styled from "styled-components";


const NonGoal = (props) => {
  return (
    <>
      <InitGoalArea>
        <Circle onClick={() => {
          props.openModal();
          props.setModalName("내 태산 만들기!")
          props.setModalState(
            <GoalInput
              state={"ADD"}
              closeModal={props.closeModal} />)
        }}>
          <NonGoalInnerCicle>
            <p style={{ fontSize: "1.7rem", fontWeight: "bold" }}>티끌모아 태산!</p>
            <p>+ 태산(목표) 만들기!</p>
          </NonGoalInnerCicle>
        </Circle>

      </InitGoalArea>
    </>
  )

}
export default NonGoal;

const InitGoalArea = styled.div`
display: flex;
height: 100%;
align-items: center;
flex-direction: column;
justify-content: center;
background: #333333;
`;

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

const NonGoalInnerCicle = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 0.5rem;
p{
  font-weight: 700;
  font-style: "SEBANG_Gothic_Bold";
}
`;