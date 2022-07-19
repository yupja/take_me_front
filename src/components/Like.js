import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { instance } from "../shared/axios";
import {likeChange} from "../redux/modules/post";
import {ReactComponent as Binheart} from "../public/img/svg/Binheart.svg";

const Like = (props,{ likeCount,boardId }) => {
  const [isloaded, setIsloaded] = useState(false);
  const [like_count, setLike_count] = useState(likeCount);
  const [ like, setLike] = useState(props.isLike);
  const [ likeImage, setLikeImage] = useState();


  const Postdata = useSelector((state) => state.post.postList.data);
  // console.log(Postdata[0].boardId,"likecount")
  boardId = (props.forLikeId)
  const dispatch = useDispatch();

  const changeHeart = () =>{
    if(like){
      setLike_count(likeCount-1)
      setLikeImage("🤍")
      setLike(false)
    }else if(!like){
      setLike_count(likeCount+1)
      setLikeImage("💚")
      setLike(true)
    }
  }

  return (
    <>
        <LikeCount>
             <div>
                <span>{likeCount}</span>
              </div>
          <div onClick={()=>{
              changeHeart();
              dispatch(likeChange(boardId));
              }}>   
            {like ? 
              <span><Binheart className="heart" /></span>
            :  
              <span><Binheart /></span>
            }
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
  
.heart{
  path { fill: none}
}

`;

export default Like;