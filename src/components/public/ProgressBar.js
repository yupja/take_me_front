import React from "react";
import styled from "styled-components";

const PercentProgressBar =(props)=>{
    return (
        <>
        <div style={{width:"100%", height:"2rem"}}>
        <TrueBarDiv>
            <True 
                className="true"
                percent={props.true}> {props.true}</True>
       </TrueBarDiv>

       <FalseBarDiv>
            <False 
                className="false"
                percent={props.false}>{props.false}</False>
       </FalseBarDiv>
       </div>
    </>
    )
}

const TrueBarDiv = styled.div`
position: relative;
`;

const True = styled.div`
border-radius: 30px 0 0 30px;
border: 1px solid #666666;
position: absolute;
background: #666666;
color: white;
font-size: 1.5rem;
display: flex;
justify-content: center;
width: ${(props)=>(props.percent? props.percent:"")}%;

`;


const FalseBarDiv=styled.div`
position: relative;
display: flex;
flex-direction: row-reverse;

`;

const False = styled.div`
display: flex;
justify-content: center;
position: absolute;
background:white;
border: 1px solid #666666;
border-radius: 0 30px 30px 0;
font-size: 1.5rem;


width: ${(props)=>(props.percent? props.percent:"")}%;
`;
export default PercentProgressBar;