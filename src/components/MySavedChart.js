import styled from "styled-components";

const MySavedChart = () => {

  return(
    <>
    <span><span>내</span>가 제일 많이 아낀 <span>티끌</span></span><br />
    <p>BEST 5!</p>
    <div>
    <span>1st</span>
    <Img></Img>
    </div>
    </>
    
  )
}

const Img = styled.div`
border: 1px solid red;
width: 40vw;
height: 40vw;
border-radius: 40vw;
`;

export default MySavedChart;