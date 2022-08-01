import React, { useState } from "react";
import { useDispatch} from "react-redux";

import { deleteGoalRQ } from "../../store/modules/goal"
import GoalModifyComponunt from "./GoalModify";
import PostModal from "../../components/community/PostModal";
import styled from "styled-components";
import { GoalModify, GoalDelete, ShareCommunity } from "../../assets/icons";
import Slider from "react-slick";
import GoalChart from "../public/Goal"


const GoalInfo = (props) => {
  const dispatch = useDispatch();
  const goal = props.myGoalList;
  const [touchSetMenu, setTouchSetMenu] = useState(false)

  console.log(touchSetMenu)

  const changeMenu = () => {
    if (touchSetMenu) {
      setTouchSetMenu(false)
    } else if (!touchSetMenu) { setTouchSetMenu(true) }
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <>

      <GoalImage src={goal?.image} />
      <StyledSlider {...settings}>
        <div style={{ backgroundColor: "transparent" }}></div>
       <GoalMain onClick={() => { changeMenu() }}>
            <MiddleMenue>
            <div>
              <GoalChart
                color="#26DFA6"
                percent={goal?.goalPercent}
                size="200"/>
            </div>
     

            {touchSetMenu ? 
                   <GoalInfoArea>
                   <div style={{ display: "flex", alignItems: "center", color: "white", gap: "10px" }}>

                   <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "5px"
                  }}
                    onClick={() => {
                      props.openModal();
                      props.setModalName("태산 수정하기!")
                      props.setModalState(<GoalModifyComponunt
                        goalItemId={goal?.goalItemId}
                        closeModal={props.closeModal} />)
                    }}>
                    <GoalModify />
                    <p className="clickMenuFont">목표변경</p>
                  </div>

                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "5px"
                  }}
                    onClick={() => {
                      props.openModal();
                      props.setModalName("내 태산 % 공유");
                      props.setModalState(<PostModal
                        image={goal?.goalItemId}
                        percent={goal?.goalPercent}
                        closeModal={props.closeModal} />)
                    }}>
                    <ShareCommunity />
                    <p className="clickMenuFont">공유</p>
                  </div>

                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "5px"
                    }}
                    onClick={() => {
                      dispatch(deleteGoalRQ(goal?.goalItemId))
                    }}>
                    <GoalDelete />
                    <p className="clickMenuFont">목표삭제</p>
                  </div>

                </div>

                  </GoalInfoArea>
              :

              <>

                <GoalInfoArea>
                  <p>{Math.floor(goal?.goalPercent * 100)}%</p>
                  <p style={{ fontSize: "1.5rem", fontFamily: "Roboto" }}>{goal?.itemName}</p>
                </GoalInfoArea>
              </>
            }

          </MiddleMenue>

        </GoalMain>
      </StyledSlider> 

    </>
  )


}
export default GoalInfo;

const StyledSlider = styled(Slider)`
    .slick-list {
        width: 100%;
        height: 100%;
    }
    .slick-dots {
        bottom: 10px;
    }
    .slick-dots li.slick-active button:before {
        color: #26DFA6;
    }
    .slick-dots li button:before {
        color: #999;
        opacity: 1;
    }
`;


const GoalInfoArea = styled.div`
position: absolute;
display: flex;
flex-direction: column;
text-align: center;
p{
  color: #26DFA6;
  font-family: "Roboto";
  font-size: 3rem;
  font-weight: 700;
  margin-top: 5%;
}
.clickMenuFont{
  color: white;
  font-size: 0.8rem;
  font-weight: 200;
}
`;

const GoalMain = styled.div`
display: flex;
z-index: 2;
background-color: rgb(0,0,0,0.5);
justify-content: center;
flex-direction: column;
align-items: center;
height: 100%;
`;

const GoalImage = styled.img`
width: 100%;
height:100%;
background-color: #F5F5F5;
display: flex;
position: absolute;
object-fit: cover;
`;

const MiddleMenue = styled.div`
display: flex;
height: 100%;
flex-direction: column;
align-items: center;
justify-content: center;
`;

