import React from "react";
import styled from "styled-components";

const PercentProgressBar =(props)=>{
    return (
        <>
        <div style={{width:"100%", height:"2rem"}}>

        {props.true ===100?
            <TrueBarDiv>
                <True  
                    className="true"
                    percent={props.true}
                    radius={"30px"}> 
                    {props.true}%</True>
            </TrueBarDiv>
            : 
            ""
        }

        {props.false ===100? 
        <FalseBarDiv>
            <False 
                className="false"
                percent={props.false}
                radius={"30px"}> 
                {props.false}%</False>
            </FalseBarDiv>
        :""
        }

        {!(props.true=== 0)&&!(props.false===0) ?
  
        <>
        <TrueBarDiv>
            <True 
                className="true"
                percent={props.true}
                radius={"30px 0 0 30px"}> {props.true}%</True>
        </TrueBarDiv>
        <FalseBarDiv>
            <False 
                className="false"
                percent={props.false}
                radius={"0 30px 30px 0"}> 
                {props.false}%</False>
        </FalseBarDiv>
        </>
        :
        ""
        }

        {(props.true=== 0)&&(props.false===0)? 
        <FalseBarDiv style={{justifyContent:"center"}}>
             {props.true}아무도 투표하지 않았어요{props.false}
         </FalseBarDiv>
         :
         ""
        }
       
                
        </div>
        </>
    )
}

const TrueBarDiv = styled.div`
position: relative;
`;

const True = styled.div`
border-radius: ${(props)=>(props.radius)};
border: 1px solid #CCCCCC;
position: absolute;
background: #30E0AA;
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
color : black;
border: 1px solid #CCCCCC;
border-radius: ${(props)=>(props.radius)};
font-size: 1.5rem;


width: ${(props)=>(props.percent? props.percent:"")}%;
`;
export default PercentProgressBar;