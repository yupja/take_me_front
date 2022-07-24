import React, { useState } from "react";
import {myMonthPriceListRQ, allUserMonthPriceListRQ, allMonthCountListRQ,
        myDayPriceListRQ, allUserGoalListRQ, allUserDayPriceListRQ,
        myDayCountListRQ, getDayCount, myMonthCountListRQ} from "../store/modules/statistics"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components";
import {ReactComponent as ChangeRank} from "../assets/icons/ChangeRank.svg"


function MyStatistics() {
  const dispatch = useDispatch();
  
  //---------------- 인풋날짜 설정----------------------------- 
  const day = new Date();
  const inputDay=String(day.getFullYear()+""+0+(day.getMonth()+1)+""+(day.getDate()-1))
  const inputMonth=String(day.getFullYear()+""+0+(day.getMonth()+1))
  
  //다른사람 태산랭크
  const allUserGoal = useSelector((state) => state.statistics.allUserGoalList);//태산목록
  const myList=useSelector((state) => state.statistics.myDayPrice);
  const allUserList = useSelector((state) => state.statistics.allUserList);
  //나/일별/횟수별
  //남/일별/횟수별 
  const allUserDayCount = useSelector((state)=> state.statistics.getDayCountList);

   //---------------- 통계 상태 스테이트 ------------------------- 
   const [dayMonth, setDayMonth] = useState(true); //월별이냐 일별이냐
   const [priceCount, setPriceCount] = useState(true); //가격별이냐 횟수별이냐


  //---------------- 데이터 불러오기 ------------------------- 
  // 초기값만 useEffect 나머지는 디스패치로 가자, 데이터를 한꺼번에 다 부르면 리소스 낭비니까 
  React.useEffect(() => {
    selectList()
    dispatch(allUserGoalListRQ()) // 모든유저 골아이템
  }, [dayMonth,priceCount])

  
  const changeDayMonth = ()=>{
    if(dayMonth){
      setDayMonth(false)
    }else{
      setDayMonth(true)
    }
  }

  const changePriceCount = ()=>{
    if(priceCount){ 
      setPriceCount(false);
    }else{
      setPriceCount(true)
    }
  }

  const selectList=()=> {
   
    if(dayMonth&&priceCount){
      dispatch(myDayPriceListRQ(inputDay))// 나/금액별/일별
      dispatch(allUserDayPriceListRQ(inputDay)) //남/금액별/일별
     }else if(!(dayMonth)&&priceCount){
      dispatch(myMonthPriceListRQ(inputMonth));
      dispatch(allUserMonthPriceListRQ(inputMonth));
    }else if(dayMonth&&!priceCount){
     dispatch(myDayCountListRQ(inputDay));
     dispatch(getDayCount(inputDay));
    }else if(!(dayMonth)&&!priceCount){
      dispatch(myMonthCountListRQ(inputMonth));
      dispatch(allMonthCountListRQ(inputMonth))
    }
  }



  return (
    <>
    <Wrap>
        <Title>
          <Mint>내</Mint>
          가 제일 많이 아낀 <Mint>티끌</Mint>
        </Title>
        <Mint style={{fontSize:"1.5rem"}}>Best 5!</Mint>
        <CircleArea>
          <RankingNum>
           {allUserList&&allUserList.map((list, idx) =>(
            <li key={idx}>
            <p>{list.rankPrice}st <span>{list.itemName}</span></p>
            </li>
          ))}
          </RankingNum>
        </CircleArea>

      

      <AllUserArea>
        <Title>
            <Mint>남</Mint>
            이 제일 많이 아낀 <Mint>티끌</Mint>
          </Title>
        <Mint style={{fontSize:"1.5rem"}}>Best 10!</Mint>
          

        <CircleArea>
          <RankingNum>
           {allUserList&&allUserList.map((list, idx) =>(
            <li key={idx}>
            <p>{list.rankPrice}st <span>{list.itemName}</span></p>
            </li>
          ))}
          </RankingNum>
        </CircleArea>




      </AllUserArea>

      <div style={{marginTop:"1rem"}}>
        <Title>
            <Mint>다른</Mint>
            사람들이 설정한<Mint>태산</Mint><p>은?</p>
        </Title>

        <BottomCircleArea>
           {allUserGoal && allUserGoal.map((list, idx) => (
            <div key={idx}>
              <Circle>{list.rankCount}st {list.itemName}</Circle>
            </div>
          ))}
        </BottomCircleArea>

      </div>
    </Wrap>
    <ButtonArea>
      {dayMonth? 
        <button 
          onClick={()=>{
            changeDayMonth()
            
           }}>
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


const RankingNum = styled.ul`
display: -webkit-box;
justify-items: center;
align-items: center;
overflow: auto;
white-space: nowrap;
overflow: scroll;
padding: 25px 0;

li{
  width: 5rem;
  height: 5rem;
  background: #c9c9c9;
  border-radius: 50%;
  margin-right: 10px;
  text-align: center;
}
li:first-child{
  width: 8.12rem;
  height: 8.12rem;
}
p {
  position: relative;
  top: -8px;
  font-size: 1.5rem;
  color:#000;
  /* display: none; */
}
span{
  display: none;
}
li:first-child span{
  color:#6a8eff;
  display: inline;
}
&::-webkit-scrollbar {
    display: none;
  }
`;


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
height: 30vh;
`;

const CircleArea = styled.div`
display: flex;
flex-direction: row;
padding: 1rem;
align-items: center;
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
  width: 40%;
  color: white;
  border-radius: 40px;
}
`;

export default MyStatistics;
