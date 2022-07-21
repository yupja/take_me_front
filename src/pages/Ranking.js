import React from "react";
import styled from "styled-components";
import HeaderMenue from "../components/public/HeaderMenu";
import Statistics from "../components/Statistics"

function Ranking() {
  const title = "랭킹"
  return (
    <>
      <HeaderMenue title={title} />
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