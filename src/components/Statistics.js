import React, { useState } from "react";
import {allUserDayCountListRQ, myMonthPriceListRQ, allUserMonthPriceListRQ, 
        myDayPriceListRQ, allUserGoalListRQ} from "../store/modules/statistics"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components";
import {ReactComponent as ChangeRank} from "../assets/icons/ChangeRank.svg"


const MyStatistics = ()=>{
  const dispatch = useDispatch();

  const day = new Date();
  const inputDay=String(day.getFullYear()+""+0+(day.getMonth()+1)+""+day.getDate())
  const inputMonth=String(day.getFullYear()+""+0+(day.getMonth()+1))

  const allUserlist = useSelector((state) => state.statistics.allUserStatisticsList);
  const allUserGoal = useSelector((state) => state.statistics.allUserGoalList);
  const myList = useSelector((state) => state.statistics.myStatisticsList);

  const [dayMonth, setDayMonth] = useState(true);
  const [dayMonthList, setDayMonthList] = useState()
  const [priceCount, setPriceCount] = useState(true);
  const [priceCountList, setPriceCountList] = useState()



  
  React.useEffect(() => {
    dispatch(allUserGoalListRQ()) // 모든유저 골아이템
    //dispatch(allUserDayCountListRQ(inputDay))
    dispatch(allUserMonthPriceListRQ(inputMonth))
    //dispatch(myDayPriceListRQ(inputDay))
    dispatch(myMonthPriceListRQ(inputMonth))
  }, [])

  const changeDayMonth = ()=>{
    if(dayMonth){
      setDayMonth(false)
    }else{
      setDayMonth(true)
    }
  }

  const changePriceCount = ()=>{
    if(priceCount){
      setPriceCount(false)
    }else{
      setPriceCount(true)
    }
  }

  return (
    <>
    <Wrap>
      <div>
        <Title>
          <Mint>내</Mint>
          가 제일 많이 아낀 <Mint>티끌</Mint>
        </Title>
        <Mint style={{fontSize:"1.5rem"}}>Best 5!</Mint>

        <CircleArea>

        {allUserlist&&allUserlist.map((list, idx) =>(
          <div key={list.rankPrice}>
          <Circle>{list.rankPrice}st {list.itemName}</Circle>
          </div>
        ))}
        </CircleArea>

        
      </div>

      <AllUserArea>
        <Title>
            <Mint>남</Mint>
            이 제일 많이 아낀 <Mint>티끌</Mint>
          </Title>
          <Mint style={{fontSize:"1.5rem"}}>Best 10!</Mint>
          

          <CircleArea>

          {allUserlist&&allUserlist.map((list, idx) =>(
            <div key={list.rankPrice}>
            <Circle>{list.rankPrice}st {list.itemName}</Circle>
            </div>
          ))}
          </CircleArea>
      </AllUserArea>

      <div style={{marginTop:"1rem"}}>
        <Title>
            <Mint>다른</Mint>
            사람들이 설정한<Mint>태산</Mint><p>은?</p>
        </Title>

        <BottomCircleArea>
           {allUserGoal && allUserGoal.map((list, idx) => (
            <div key={list.rankCount}>
              <Circle>{list.rankCount}st {list.itemName}</Circle>
            </div>
          ))}
        </BottomCircleArea>

      </div>
    </Wrap>
    <ButtonArea>
      {dayMonth? 
        <button onClick={()=>{changeDayMonth()}}>
          일 별보기 <ChangeRank/></button>
        :
        <button 
          style={{background:"#6A8EFF", fontWeight:"bold"}}
          onClick={()=>{changeDayMonth()}}>
          월별보기 <ChangeRank/></button>
      }

      {priceCount? 
        <button onClick={()=>{changePriceCount()}}>
          금액 별 보기<ChangeRank/></button>
        :
        <button 
        style={{background:"#6A8EFF", fontWeight:"bold"}}
        onClick={()=>{changePriceCount()}}>
          횟수 별보기 <ChangeRank/></button>
      }
      
    </ButtonArea>
    </>
  )

}

const Mint = styled.p`
color:#26DFA6;
font-weight: bold;
`;

const Title = styled.div`
display: flex;
`;

const Wrap = styled.div`
width: 100%;
height: 100%;
padding: 1rem;


&::-webkit-scrollbar {
    display: none;
  }

`;

const AllUserArea = styled.div`
display: flex;
flex-direction: column;
height: 20vh;
`;

const CircleArea = styled.div`
display: flex;
flex-direction: row;
padding: 1rem;
align-items: center;
width: 100%;
height:100%;
overflow: scroll;

&::-webkit-scrollbar {
    display: none;
  }

`;

const Circle = styled.div`
display: flex;
background: #D9D9D9;
margin-right: 1rem;
width: 100px;
height: 100px;
border-radius: 50%;
`;


const BottomCircleArea = styled.div`
display:block;
float: left;
overflow: auto;
padding: 0.3rem;

div{
  float: left;
  margin-top:0.5rem;
}
`;

const ButtonArea = styled.div`
display: flex;
justify-content: space-evenly;

position: fixed;
bottom:10%;
width: 100%;

button{
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #26DFA6;
  background-color:rgba(38, 223, 166, 0.9);
  padding: 1rem;
  width: 35%;
  color: white;
  border-radius: 40px;
}
`;

export default MyStatistics;
