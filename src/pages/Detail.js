import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { useParams } from "react-router-dom";

import HeaderMenue from "../components/HeaderMenu";
import Like from "../components/Like";
import CommentList from "../components/CommentList";
import ModifyModal from "../components/ModifyModal";
import { createCommentAc } from "../redux/modules/comment"
import { loadCommentAc } from "../redux/modules/comment"
import { loadpostsAc } from "../redux/modules/post";
import { loadDetailAc } from "../redux/modules/post"
import { deletePostAc} from "../redux/modules/post"
import {getUserInfoDB} from "../redux/modules/user";

function Detail(props) {
    const dispatch = useDispatch();
    const params = useParams();
    const comment_ref = React.useRef();

    const boardIdex = params.boardId -1 ;
    console.log(boardIdex, "idex")
   

    React.useEffect(() => {
        dispatch(loadCommentAc(boardIdex))
        dispatch(loadpostsAc())
        // dispatch(loadDetailAc(boardIdex))
        dispatch(getUserInfoDB())
    }, []);

    const commentData = useSelector((state) => state.comment.commentList);
    const Postdata = useSelector((state) => state.post.postList);
    const userinfo = useSelector((state) => state.user.infoList)
  console.log(userinfo.username,"userinfo")
  console.log(Postdata.data[boardIdex].userId,"postdata")
  console.log(Postdata.data[boardIdex].boardId,"boardId")
  console.log(commentData,"comment")

    const createComment = (boardId) => {
        console.log(comment_ref.current.value, "create확인");
        const data = {
            comment: comment_ref.current.value,
        }
        dispatch(createCommentAc(data, Postdata.data[boardIdex].boardId))
    };
    // console.log(Postdata.data[boardIdex].boardId - 1,"??")

    const [user_nav, setUserNav] = useState(false)

    const onClickNav = (e) => {
        setUserNav(user_nav =>user_nav ?false :true)
    }


    const [showModall, setShowModall] = useState(false);
    const openModall = () => {
      setShowModall(true)
    }
    const closeModall = () => {
      setShowModall(false);
    }

    const state = "커뮤니티"

    return (
        <>
            <HeaderMenue state={state} />
            <Box>
                <Img>
                {userinfo.username === Postdata.data[boardIdex].userId ?
                         <>
                        <Toggle onClick={onClickNav}>...</Toggle>
                        {user_nav && (
                            <UserInfoNav>
                                <div>
                                <div onClick={() => {openModall()}}>수정하기</div>
                                <div onClick={() => {
                                    dispatch(
                                    deletePostAc(Postdata.data[boardIdex].boardId))
                                }}>삭제하기</div>
                                </div>
                            </UserInfoNav>
                        )}
                        </>
                         : null
                         }
                         <ContentsBox>
                    <Commu>
                        <Top>
                            <GoalName>{Postdata.data[boardIdex].nickname}</GoalName>
                            <GoalName>{Postdata.data[boardIdex].createdAt}</GoalName>
                            <GoalName>{Postdata.data[boardIdex].goalItemName}</GoalName>
                        </Top>
                    </Commu>
                    <Content>{Postdata.data[boardIdex].contents}</Content>
                    <Bottom>
                        <Like />&nbsp;<span>조회수&nbsp;{Postdata.data[boardIdex].viewCount}</span>
                    </Bottom>
                    </ContentsBox>
                </Img>
                {commentData.data&&commentData.data?.map((comment_list, index) => (
                    <CommentList key={index}
                    nickname = {comment_list.nickname}
                    createdAtt = {comment_list.createdAt}
                    comment = {comment_list.comment}
                    user = {userinfo.username}
                   idUser = {Postdata.data[boardIdex].userId}
                    />
                ))}
            </Box>
            <Enter>
                <Input ref={comment_ref}></Input>
                <PostBtn onClick={createComment}>게시</PostBtn>
            </Enter>
            
            
            
            {/* 게시글 수정모달 */}
             {showModall ?
            <ModifyModal showModall={showModall} closeModall={closeModall} 
                        formodiId = {Postdata.data[boardIdex].boardId}
                        />
            : null} 
        </>
        
    )
};

const Box = styled.div`
width: 100%;
height: 80vw;
border: 3px solid red;
`;


const Img = styled.div`
width: 100%;
height: 100%;
background-color: #F5F5F5;
border: 1px solid blue;
`;

const Commu = styled.div`
width: 100%;
height: 30%;
border: 3px solid blue;
display: flex;
justify-content: center;
align-items: center;
`;

const Toggle = styled.div`
margin-left: 0;
`;

const Top = styled.div`
display: flex;
flex-direction: column;
border: 3px solid violet;
`;

const Profile = styled.div`
width: 10vw;
height: 10vw;
border-radius: 10vw;
background-color: gray;
margin-right: 5vw;
`;

const GoalName = styled.span`
font-size: 1.2rem;
font-weight: 700;
text-align: center;
margin: auto 0;
color: black;
`;

const Content = styled.div`
width: 100%;
height: 30%;
padding: 3vw;
border: 2px solid orange;
`;

const Bottom = styled.div`
width: 100%;
height: 30%;
border: 3px solid green;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`;

const CommentBox = styled.div`
width: 100%;
height: 25vw;
/* border: 1px solid green; */
display: flex;
margin-top: 4vw;
`;

const CoProfile = styled.div`
width: 8vw;
height: 8vw;
border-radius: 8vw;
background-color: gray;
`;

const CreateAt = styled.span`
margin-right: 3vw;
font-size: 0.8rem;
color: #999999;
`;

const ContentsBox = styled.div`
width: 100%;
border: 5px solid purple;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: auto 0;
`;

const DelBtn = styled.button`
background-color: transparent;
border: none;
`;

const Right = styled.div`
float: right;
`;

const Comment = styled.div`
width: 100%;
height: 15vw;
margin-top: 1.5vw;
border: 1px solid orange;
`;

const Ddu = styled.div`
width: 100%;
margin-left: 2vw;
/* border: 1px solid violet; */
`;

const Enter = styled.div`
width: 100%;
height: 12vw;
border: none;
background-color: #333333;
display: flex;
/* justify-content: center; */
align-items: center; 
position: fixed;
bottom: 0;
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

const PostBtn = styled.button`
width: 10vw;
height: 10vw;
border: none;
background-color: transparent;
color: white;
position: absolute;
float: left;
left: 83%;
`;

const UserInfoNav = styled.div`
position: absolute;
top: 5%;
right: 10%;
> div {
    position: relative;
    z-index: 5;
    width: 20vw;
    height: 10vw;
    background: #fff;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
}`

export default Detail;