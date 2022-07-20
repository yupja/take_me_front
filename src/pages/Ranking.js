import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import RankingNumber from "../components/RankingNumber";

import HeaderMenue from "../components/HeaderMenu";
import Statistics from "../components/Statistics"
import Header from "../components/Header";

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