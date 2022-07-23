import React, {useState, useRef} from "react";
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



const SwipeForm = () =>{
    const swifeRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState();
    const [loop, setLoop] = useState(null);
    
    return (
        <>
        {RoomData.map((item, idx)=>(
        <Wrap>
            <ChattingList>
                    <div className="swipeItem">
                      <img src={item.profileImg} />
                      <div style={{display:"flex"}}>
                        <span>
                          <p style={{fontWeight:"500" , fontSize:"1.2rem"}}>{item.username}</p> {item.comment}</span>
                       
                      </div>
                      <div style={{fontWeight:"500"}}><Timer/>{item.time}</div>
                    </div>
    
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
`;

const ChattingList = styled.div`
width: 100%;
display: flex;
overflow-x:scroll;
flex-direction: column;
white-space: nowrap;
border: none;
box-shadow: 0px 4px 11px 0px rgb(0 0 0 / 15%);
padding: 1rem;
margin-bottom: 1rem;

div{
  gap: 5px;
}
.chatInfoArea{
  display: flex;
  flex-direction: row;
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