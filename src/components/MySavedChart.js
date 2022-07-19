import React,{ useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { loadMyRankDAc } from "../redux/modules/saved";

const MySavedChart = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadMyRankDAc())
  }, [])

  const RankD = useSelector((state) => state.saved.rank)
  console.log(RankD,"D")

  return(
    <>
    <TopText><span style={{color:"#26dfa6"}}>내</span>가 제일 많이 아낀 <span>티끌</span></TopText><br />
    <Best>BEST 5!</Best>
    <ContentsBox>
    <span style={{color:"#6a8eff"}}>1st</span>
    <Img></Img>
    </ContentsBox>
    </>
    
  )
}

const Img = styled.div`
border: 1px solid red;
width: 40vw;
height: 40vw;
border-radius: 40vw;
justify-items: center;
align-items: center;
display: flex;
`;

const ContentsBox = styled.div`
align-items: center;

`;

const TopText = styled.span`

`;

const Best = styled.span`
color: #26dfa6;
`;

export default MySavedChart;