import styled from "styled-components";
import { useLocation } from "react-router";

import HeaderMenue from "../components/HeaderMenu";
import Statistics from "../components/Statistics"

function Ranking(props) {
  const title="랭킹"
  return (
    <>
      <HeaderMenue title={title} />
      <Statistics/>
    </>
    )
};

export default Ranking;