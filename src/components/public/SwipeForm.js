import React, {useState, useRef, useEffect, useLayoutEffect} from "react";
import styled from "styled-components";
import {ReactComponent as Timer} from "../../assets/icons/Timer.svg";

const RoomData = [
    {
      roomId: "ae8d8cb1-0a9a-43da-90c4-084df62c78ab",
      username: "eppo",
      comment: "지금 비가 너무 많이와서 걷기 싫은데 택시탈까?",
      profileImg: "https://velog.velcdn.com/images/eppo/post/9fa16a22-a5e5-4675-9d4b-fbcb5c93be28/image.png",
      time: "6m"
    },
    {
      roomId: "ae8d8cb1-0a9a-43da-90c4-084df62c78ab",
      username: "eppo",
      comment: "지금 비가 너무 많이와서 걷기 싫은데 택시탈까?",
      profileImg: "https://velog.velcdn.com/images/eppo/post/9fa16a22-a5e5-4675-9d4b-fbcb5c93be28/image.png",
      time: "6m"
    },
    {
      roomId: "ae8d8cb1-0a9a-43da-90c4-084df62c78ab",
      username: "eppo",
      comment: "지금 비가 너무 많이와서 걷기 싫은데 택시탈까?",
      profileImg: "https://velog.velcdn.com/images/eppo/post/9fa16a22-a5e5-4675-9d4b-fbcb5c93be28/image.png",
      time: "6m"
    },
    {
      roomId: "ae8d8cb1-0a9a-43da-90c4-084df62c78ab",
      username: "eppo",
      comment: "지금 비가 너무 많이와서 걷기 싫은데 택시탈까?",
      profileImg: "https://velog.velcdn.com/images/eppo/post/9fa16a22-a5e5-4675-9d4b-fbcb5c93be28/image.png",
      time: "6m"
    },
    {
      roomId: "ae8d8cb1-0a9a-43da-90c4-084df62c78ab",
      username: "eppo",
      comment: "지금 비가 너무 많이와서 걷기 싫은데 택시탈까?",
      profileImg: "https://velog.velcdn.com/images/eppo/post/9fa16a22-a5e5-4675-9d4b-fbcb5c93be28/image.png",
      time: "6m"
    },
  ]

  
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return undefined;
    }
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}


const SwipeForm = () =>{
    const swifeRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loop, setLoop] = useState(null);

    const setInfiniteSlide = (datas, slideToAdd) => {
      const newSlides = [...datas];
      const size = datas.length;
      for (let i = 0; i < slideToAdd; i += 1) {
        const first = {
          ...datas[i % size],
          id: datas.length + i,
        };
        const last = {
          ...datas[datas.length - 1 - (i % size)],
          id: -(i + 1),
        };
        newSlides.unshift(last);
        newSlides.push(first);
      }
      return newSlides;
    };


    useInterval(() => {
      setCurrentIndex(currentIndex => currentIndex + 1);
  }, 2000)
  
    return (
        <>
        {RoomData.map((item, idx)=>(
        <Wrap>
            <ChattingList
              style={{transform: `translateX(${(-100 / RoomData.length+2) * (currentIndex)}%)`}}>
                    <SwipeItem>
                      <img src={item.profileImg} />
                      <div style={{display:"flex"}}>
                        <span>
                          <p style={{fontWeight:"500" , fontSize:"1.2rem"}}>{item.username}</p> {item.comment}</span>
                      </div>
                      </SwipeItem>
            </ChattingList>
            </Wrap>
        ))}
        </>
    )
} 

const Wrap = styled.div`
width: 100%;
height: 100%;
padding: 1rem;
display: flex;
justify-content: center;

`;

const SwipeItem = styled.div`
flex-direction: column;
white-space: nowrap;

`;


const SlideTrack = styled.ul`
  display: flex;
  width: 100%;
  height: 400px;
  padding: 0;
  margin: 0;
  transform: ${({
    slideItemWidth,
    slideMargin,
    slideX,
    previewRatio,
    currentIndex,
    slideToShow,
  }) =>
    `translateX(calc((${slideItemWidth} + ${slideMargin}px) * ${
      currentIndex - (slideToShow - 1) / 2
    } * -1 - ${
      1 - (previewRatio || 1)
    } * (${slideItemWidth}) +  ${slideX}px))`};
  &:not(.no-effect) {
    transition: transform ${({ transitionSpeed }) => transitionSpeed}ms;
  }
  gap: ${({ slideMargin, slideToShow }) =>
    slideToShow > 1 ? slideMargin : 0}px;
  > li {
    flex: 0 0 ${({ slideItemWidth }) => `calc(${slideItemWidth})`};
  }
`;

const ChattingList = styled.div`
width: 100%;
display: flex;
background: white;
border: none;
box-shadow: 0px 4px 11px 0px rgb(0 0 0 / 15%);
padding: 1.5rem;


div{
  gap: 5px;
}

.swipeItem{


}
.buttonArea{
  margin-top: 5%;
  width: 100%;
  display: flex;
  justify-content: space-around;

  button{
  width: 50%;
  padding: 0.5rem;
  border-radius: 30px;
  border: 1px solid #26DFA6;
  color: #26DFA6;

  }
}
`;

export default SwipeForm;