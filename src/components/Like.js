import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {likeChange} from "../store/modules/post";

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
      setLikeImage("🤍")
      setLike(false)
    }else if(!like){
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
              <span>💚</span>
            :  
              <span>🤍</span>
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
`;

export default Like;