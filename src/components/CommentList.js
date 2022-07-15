import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { useParams } from "react-router-dom";

import HeaderMenue from "../components/HeaderMenu";
import Like from "../components/Like";
import { createCommentAc } from "../redux/modules/comment"
import { loadCommentAc } from "../redux/modules/comment"
import { deleteComment } from "../redux/modules/comment";
import { updateCommentAc } from "../redux/modules/comment";
import { loadpostsAc } from "../redux/modules/post";
import { loadDetailAc } from "../redux/modules/post"
import {getUserInfoDB} from "../redux/modules/user";
import {ReactComponent as Edit2} from "../public/img/svg/Edit2.svg";
import {ReactComponent as Trash} from "../public/img/svg/Trash.svg";


function CommentList(props) {
    const dispatch = useDispatch();
    const params = useParams();
    const comment_ref = React.useRef();
    const commentEdit = React.useRef();

    const boardIdex = params.boardId;
    console.log(boardIdex,"으으으으")
    // console.log(props.postAll,"all?")
    console.log(props.commId.commentId,"comm??")

    React.useEffect(() => {
        dispatch(loadCommentAc(boardIdex))
        dispatch(loadpostsAc())
        dispatch(loadDetailAc())
        dispatch(getUserInfoDB())
    }, []);

    const commentData = useSelector((state) => state.comment.commentList);
    const Postdata = useSelector((state) => state.post.postList);

    console.log(commentData.data,"디테일코멘트")
    console.log(props.commId.commentId,"prooooops")
    
    const [isEdit, setIsEdit] = useState(false);

    const openEdit = () => {
        setIsEdit(true)
    }

    const editComment = () => {
        // console.log(comment_ref.current.value,"ref")
        const data = {
            comment: comment_ref.current.value,
            boardId : props.postAll.boardId,
            commentId :props.commId
        };
        dispatch(updateCommentAc(data));
        setIsEdit(false)
        window.location.reload();
    }

    // console.log(props.user,props.username,"user?")

    const state = "커뮤니티"
    return (
       
      <CommentBox>
        <ProBox>
              <CoProfile></CoProfile>
              </ProBox>
              <Ddu>
                  <Right>
                    <InTop>
                    <InR>
                    <CommNick>{props.username}</CommNick>
                      <CreateAt>{props.createdAt.substr(0, 10).split('-','3').join(".")}</CreateAt>
                      </InR>
                      <InL>
                      {props.user === props.username ?
                         <>
                    {isEdit ? null :
                    <>
                      <button onClick={openEdit}><Edit2 /></button>
                      <DelBtn onClick={() => {
                        // console.log(props.commId.commentId,"onClick")
                          dispatch(deleteComment(props.postAll.boardId, props.commId.commentId))
                      }}>
                       <Trash />   
                      </DelBtn>
                      
                      </>
}
                      </>
                         : null
}
                      </InL>
                      </InTop>
                      {isEdit ? 
                      <>
                      <EditBtn>
                      <ModiBtn onClick={()=> editComment(props.commId)}>슈정</ModiBtn>
                      <CancBtn onClick={()=>{setIsEdit(false)}}>취소</CancBtn>  
                      </EditBtn>
                      <textarea ref={comment_ref} style={{width:"100%"}}/>
                      </>: <Comment>{props.comment}</Comment>}
                      
                  </Right>
                  
              </Ddu>
          </CommentBox>
    )
};

const CommentBox = styled.div`
width: 100%;
height: 25vw;
/* border: 1px solid green; */
display: flex;
margin-top: 4vw;
padding: 0 5vw;
`;

const ProBox = styled.div`
width: 8vw;
height: 7vw;
`;

const CoProfile = styled.div`
width: 100%;
height: 100%;
border-radius: 8vw;
background-color: gray;
`;

const CreateAt = styled.span`
margin-right: 3vw;
font-size: 0.8rem;
color: #999999;
`;

const EditBtn = styled.div`
border: 1px solid blue;
`;

const DelBtn = styled.button`
background-color: transparent;
border: none;
`;

const Right = styled.div`
/* float: right; */
`;

const InTop = styled.div`
/* border: 2px solid red; */
display: flex;
justify-content: space-between;
`;

const InR = styled.div`
/* border: 1px solid black; */
`;

const InL = styled.div`
/* border: 3px solid pink; */
`;

const CommNick = styled.span`
font-size: 0.8rem;

`;

const Comment = styled.div`
width: 100%;
height: 15vw;
margin-top: 1.5vw;
/* border: 1px solid orange; */
`;

const Ddu = styled.div`
width: 100%;
margin-left: 2vw;
/* border: 5px solid violet; */
`;

const Input = styled.input`
width: 90%;
height: 90%;
border: 1px solid #A9FFE4;
border-radius: 30vw;
background-color: transparent;
color: white;
margin: 0 auto;
padding: 4vw;
:focus{
    outline: none;
}
`;

const ModiBtn = styled.button`
border: 1px solid orange;
`;

const CancBtn = styled.button`
border: 1px solid gold;
`;

export default CommentList;