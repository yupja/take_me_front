import styled from "styled-components";
import { useLocation } from "react-router";

import HeaderMenue from "../components/HeaderMenu";

function Ranking(props) {
  const title="랭킹"
  return (
    <div className="wrap">
      <div className="topWrap">
        <HeaderMenue title={title} />
      </div>
    </div>
  )
};

export default Ranking;