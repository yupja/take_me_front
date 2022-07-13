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


function CommentList(props) {
    const dispatch = useDispatch();
    const params = useParams();
    const comment_ref = React.useRef();
    const commentEdit = React.useRef();

    const boardIdex = params.boardId;

    React.useEffect(() => {
        dispatch(loadCommentAc(boardIdex))
        dispatch(loadpostsAc())
        dispatch(loadDetailAc())
        dispatch(getUserInfoDB())
    }, []);

    const commentData = useSelector((state) => state.comment.commentList);
    const Postdata = useSelector((state) => state.post.postList);
    
    const [isEdit, setIsEdit] = useState(false);

    const openEdit = () => {
        setIsEdit(true)
    }

    const editComment = () => {
        console.log(comment_ref.current.value,"ref")
        const data = {
            comment: comment_ref.current.value,
            boardId : Postdata.data[boardIdex].boardId,
            commentId :  commentData.data[boardIdex].commentId
        };
        dispatch(updateCommentAc(data));
        setIsEdit(false)
        
    }


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
                      <CreateAt>{props.createdAt}</CreateAt>
                      </InR>
                      <InL>
                      {props.user === props.idUser ?
                         <>
                        
                      <button onClick={openEdit}>수정</button>
                      <DelBtn onClick={() => {
                          dispatch(deleteComment(commentData.data[boardIdex].commentId))////
                      }}>
                          <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M3.625 0.375C3.00368 0.375 2.5 0.87868 2.5 1.5V2.25H1.75H0.5C0.223858 2.25 0 2.47386 0 2.75C0 3.02614 0.223858 3.25 0.5 3.25H1.25V11.5C1.25 12.1213 1.75368 12.625 2.375 12.625H8.625C9.24632 12.625 9.75 12.1213 9.75 11.5V3.25H10.5C10.7761 3.25 11 3.02614 11 2.75C11 2.47386 10.7761 2.25 10.5 2.25H9.25H8.5V1.5C8.5 0.87868 7.99632 0.375 7.375 0.375H3.625ZM7.5 2.25V1.5C7.5 1.43096 7.44404 1.375 7.375 1.375H3.625C3.55596 1.375 3.5 1.43096 3.5 1.5V2.25H7.5ZM3 3.25H2.25V11.5C2.25 11.569 2.30596 11.625 2.375 11.625H8.625C8.69404 11.625 8.75 11.569 8.75 11.5V3.25H8H3ZM4.25 4.75C4.52614 4.75 4.75 4.97386 4.75 5.25L4.75 9.625C4.75 9.90114 4.52614 10.125 4.25 10.125C3.97386 10.125 3.75 9.90114 3.75 9.625L3.75 5.25C3.75 4.97386 3.97386 4.75 4.25 4.75ZM6.75 4.75C7.02614 4.75 7.25 4.97386 7.25 5.25L7.25 9.625C7.25 9.90114 7.02614 10.125 6.75 10.125C6.47386 10.125 6.25 9.90114 6.25 9.625L6.25 5.25C6.25 4.97386 6.47386 4.75 6.75 4.75Z" fill="#333333" />
                          </svg>
                      </DelBtn>
                      
                      </>
                         : null
                         }
                      </InL>
                      </InTop>
                      {isEdit ? 
                      <>
                      <textarea ref={comment_ref}/>
                      <button onClick={()=> editComment(commentData.data[boardIdex].commentId)}>수정하기</button>
                      <button onClick={()=>{setIsEdit(false)}}>취소</button>
                      </>
                      :<Comment>{props.comment}</Comment>
                      }
                      
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
/* border: 1px solid pink; */
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


export default CommentList;