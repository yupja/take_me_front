import React, { useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadCommentAc, deleteComment, updateCommentAc, loadpostsAc, loadDetailAc }from "../../store/modules/community"
import {getUserInfoDB} from "../../store/modules/user";
import { ReactComponent as Edit2 } from "../../assets/icons/Edit2.svg";
import { ReactComponent as Trash } from "../../assets/icons/Trash.svg";
import { ReactComponent as Check } from "../../assets/icons/Check.svg";
import { ReactComponent as Close } from "../../assets/icons/Close.svg";

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

  const commentData = useSelector((state) => state.community.commentList);
  const Postdata = useSelector((state) => state.community.postList);

  console.log(commentData.data, "디테일코멘트")
  console.log(props.commId.commentId, "prooooops")

  const [isEdit, setIsEdit] = useState(false);

  const openEdit = () => {
    setIsEdit(true)
  }

  const editComment = () => {
    // console.log(comment_ref.current.value,"ref")
    const data = {
      comment: comment_ref.current.value,
      boardId: props.postAll.boardId,
      commentId: props.commId
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
              <CommNick>{props.username}</CommNick>&nbsp;&nbsp;
              <CreateAt>{props.createdAt.substr(0, 10).split('-', '3').join(".")}</CreateAt>
            </InR>
            <InL>
              {props.user === props.username ?
                <>
                  {isEdit ?
                    <>
                      <EditBtn>
                        <ModiBtn onClick={() => editComment(props.commId)}><Check /></ModiBtn>
                        <CancBtn onClick={() => { setIsEdit(false) }}><Close /></CancBtn>
                      </EditBtn>
                      <textarea ref={comment_ref} style={{ width: "100%" }} />
                    </>
                    :
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
          <Comment>{props.comment}</Comment>
          {/* <Comment>{props.comment}</Comment> */}
          {/* {isEdit ?
            <>
              <EditBtn>
                <ModiBtn onClick={() => editComment(props.commId)}>슈정</ModiBtn>
                <CancBtn onClick={() => { setIsEdit(false) }}>취소</CancBtn>
              </EditBtn>
              <textarea ref={comment_ref} style={{ width: "100%" }} />
            </> : <Comment>{props.comment}</Comment>} */}

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
/* border: 1px solid blue; */
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
/* width: 90px; */
textarea {
  position: absolute;
  left: 0;
  width: 100%;
}
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
position: relative;
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
/* border: 1px solid orange; */
`;
const CancBtn = styled.button`
/* border: 1px solid gold; */
`;
export default CommentList;