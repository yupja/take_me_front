import React from "react";
import styled from "styled-components";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import M_guide_1 from "../../assets/guide2/M_guide_1.png"
import M_guide_2 from "../../assets/guide2/M_guide_2.png"
import M_guide_3 from "../../assets/guide2/M_guide_3.png"
import M_guide_4 from "../../assets/guide2/M_guide_4.png"
// import M_guide_1 from "../../assets/guide/M_guide_1.png"
// import M_guide_2 from "../../assets/guide/M_guide_2.png"
// import M_guide_3 from "../../assets/guide/M_guide_3.png"
// import M_guide_4 from "../../assets/guide/M_guide_4.png"
import { useNavigate } from "react-router-dom";

const Guide = (props) => {


  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };

  return (
    <>
      <Divvv>
        <div>
          <StyledSlider {...settings} className="ddddddd">

            <Div>
              <GoalImage src={M_guide_1} className="img"
              ></GoalImage>
            </Div>
            <Div>
              <GoalImage src={M_guide_2}></GoalImage>
            </Div>
            <Div>
              <GoalImage src={M_guide_3}></GoalImage>
            </Div>
            <Div>
              <GoalImage src={M_guide_4} className="lastPage"></GoalImage>
              <CloseBtn onClick={props.close}>마침</CloseBtn>
            </Div>
          </ StyledSlider>
        </div>
      </Divvv>
    </>
  )
}


const Divvv = styled.div`
/* width:"390";
 height:"844px"; */
  /* border:1px solid red;
   display:flex;
   justify-content: center;
   align-items: center; */
   background-color: #111;
   position: absolute;
   width: 100%;
   height: 100%;
   z-index: 999;
   top: 0;
   left: 0;
`;

const Div = styled.div`
background-color: black;
height: 100%;
position: relative;
`;

const StyledSlider = styled(Slider)`
    /* top: 50%;
    transform: translateY(-50%); */
    .slick-list {
        width: 100%;
        /* height: 844px; */
        /* margin-left: 14vw; */
        margin-top: 0;
        /* height: 100%; */
        /* display: flex; */
    }
    .slick-dots {
        bottom: 5px;
    }
    .slick-dots li.slick-active button:before {
        color: #26DFA6;
    }
    .slick-dots li button:before {
        color: #999;
        opacity: 1;
    }
   
    .slick-next.slick-disabled:before{
      /* content: '마침?'; */
      display: none;
      top: 100px
    }
    .slick-next:before {
    content: '다음 >';
}
 
.slick-prev:before {
    content: '< 이전';
    position: relative;
    
}
.slick-slide {
  width: 25%;
}

.slick-track {
  width: 400%;
}

.slick-prev:before, .slick-next:before {
    font-size: 20px;
    line-height: 1;
    /* opacity: .75; */
    color: #26dfa6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    position: absolute;
    z-index: 50;
    font-family: 'SEBANG_Gothic_Regular';
}
.slick-next {
    right: 20px;
}
.slick-prev {
    left: 20px;
}
  .slick-prev, .slick-next {
    font-size: 0;
    line-height: 0;
    position: absolute;
    top: 90%;
    display: block;
    width: 70px;
    height: 12px;
    padding: 0;
    transform: translate(0, -50%);
    cursor: pointer;
    color: transparent;
    border: none;
    outline: none;
    background: transparent;
    z-index: 50;
    font-family: 'SEBANG_Gothic_Regular';

}
`;

const GoalImage = styled.img`
max-width: 100%;
/* width: 100%; */
/* height: 87%; */
position: absolute;
left: 50%; top: 50%;
display: block;
transform: translate(-50%, -50%);
`;

const CloseBtn = styled.div`
width: 65px;
height: 30px;
color: #26dfa6;
right: 30px;
position: absolute;
top: 90%;
font-size: 20px;
z-index: 400;
font-weight: 100;
position: absolute;
font-family: 'SEBANG_Gothic_Regular';
`

export default Guide;