import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {likeChange} from "../../store/modules/community";
import {ReactComponent as Binheart} from "../../assets/icons/Binheart.svg";

const Like = (props,{ likeCount,boardId }) => {
  const [isloaded, setIsloaded] = useState(false);
  const [like_count, setLike_count] = useState(props.likeCount);
  const [ like, setLike] = useState(props.isLike);
  const [ likeImage, setLikeImage] = useState();


  const Postdata = useSelector((state) => state.community.postList.data);

  boardId = (props.forLikeId)
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   setLike_count(props.likeCount)
  // },[])

  const changeHeart = () =>{
    if(like){
      console.log(like_count)
      setLike_count(like_count-1)
      setLikeImage("🤍")
      setLike(false)
    }else if(!like){
      setLike_count(like_count+1)
      setLikeImage("💚")
      setLike(true)
    }
  }


  return (
    <>
        <LikeCount>
             
          <div onClick={()=>{
              changeHeart();
              dispatch(likeChange(boardId));
              }}>   
            {like ? 
              <Heart><Binheart className="heart" /></Heart>
            :  
              <Heart><Binheart /></Heart>
            }
          </div>
          <div>
          &nbsp;&nbsp;<Count>{like_count}</Count>
              </div>
        </LikeCount>
    </>
  );
};

const LikeCount = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
.heart{
  path { fill: #ff0044}
}
`;

const Heart = styled.span`
cursor: pointer;
`;

const Count = styled.span`
font-size: 10px;
color: #999999;
`;

export default Like;