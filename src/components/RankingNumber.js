// import React, { useEffect } from "react";
// import styled from "styled-components";
// import { useDispatch, useSelector } from "react-redux";
// //import { getDayCount, getMonthCount } from "../store/modules/rank";

// function RankingNumber() {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getDayCount(dateString));
//    // dispatch(getMonthCount(dateString));
//   }, [])
//   const state = useSelector((state) => state.rank)
//   console.log(state)
//   const dayList = state?.getDayCountList
//   //const monthList = state?.getMonthCountList

//   const today = new Date();
//   const year = today.getFullYear();
//   const month = ('0' + (today.getMonth() + 1)).slice(-2);
//   const day = ('0' + today.getDate()).slice(-2);
//   const dateString = year + month + day;



//   console.log(dateString);

//   return (
//     <RankingNum>
//       {dayList.map((e, idx) => (
//         <li key={idx}>
//           <p>{e.rankCount}st <span>{e.itemName}</span></p>
//           <div>아이콘</div>
//         </li>
//       ))}
//     </RankingNum>
//   )
// };

// export default RankingNumber;

// const RankingNum = styled.ul`
// display: -webkit-box;
// justify-items: center;
// align-items: center;
// overflow: auto;
// white-space: nowrap;
// overflow: scroll;
// padding: 25px 0;

// li{
//   width: 5rem;
//   height: 5rem;
//   background: #c9c9c9;
//   border-radius: 50%;
//   margin-right: 10px;
//   text-align: center;
// }
// li:first-child{
//   width: 8.12rem;
//   height: 8.12rem;
// }
// p {
//   position: relative;
//   top: -8px;
//   font-size: 1.5rem;
//   color:#000;
//   /* display: none; */
// }
// span{
//   display: none;
// }
// li:first-child span{
//   color:#6a8eff;
//   display: inline;
// }
// `
