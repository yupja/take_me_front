import React from "react";
import styled from "styled-components";
import Header from "../components/public/Header";
import Statistics from "../components/Statistics"
import { useNavigate } from "react-router-dom";

function Ranking() {
  const title = "랭킹"
  const navigate = useNavigate();

  React.useEffect(() => {
    if(!localStorage.getItem("accessToken")){
      navigate("/main")
    }
  }, [])

  return (
    <>
      <Header title={title} />
      <RankWrap>
        <Statistics/>
      </RankWrap>
    </>
  )
};

export default Ranking;

const RankWrap = styled.div`
width: 100%;
/* padding: 0 25px; */
`