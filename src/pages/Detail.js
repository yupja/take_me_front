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
import { deletePostAc } from "../redux/modules/post"
import { getUserInfoDB } from "../redux/modules/user";
import DountChart from "../components/Goal";

function Detail(props) {
    const dispatch = useDispatch();
    const params = useParams();
    const comment_ref = React.useRef();

    const boardIdex = params.boardId;
    console.log(boardIdex, "idex")


    React.useEffect(() => {
        dispatch(loadCommentAc(boardIdex))
        dispatch(loadpostsAc())
        dispatch(loadDetailAc(boardIdex))
        dispatch(getUserInfoDB())
    }, []);

    const commentData = useSelector((state) => state.comment.commentList);
    const Postdata = useSelector((state) => state.post.postList);
    const userinfo = useSelector((state) => state.user.infoList)
    const myGoalList = useSelector((state=> state.goal.myGoalList));

    const goal = {
        goalImage : myGoalList.data?.image,
        goalItemId : myGoalList.data?.goalItemId,
        goalPercent : (myGoalList.data?.goalPercent)*0.01,
        goalitemName: myGoalList.data?.itemName
      }
    // console.log(userinfo.username, "userinfo")
    // console.log(Postdata.data[boardIdex].userId, "postdata")
    // console.log(Postdata.data[boardIdex].boardId, "boardId")
    console.log(commentData.data, "comment")

    const createComment = (boardId) => {
        console.log(comment_ref.current.value, "create확인");
        const data = {
            comment: comment_ref.current.value,
        }
        dispatch(createCommentAc(data, Postdata.data[boardIdex].boardId))
    };
    // console.log(Postdata.data[boardIdex].boardId - 1,"??")
    console.log(Postdata,"postdata")

    const [user_nav, setUserNav] = useState(false)

    const onClickNav = (e) => {
        setUserNav(user_nav => user_nav ? false : true)
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
                {userinfo.username === Postdata.data[boardIdex].userId ?
                    <>
                        <Toggle onClick={onClickNav}>...</Toggle>
                        {user_nav && (
                            <UserInfoNav>
                                <div>
                                    <div onClick={() => { openModall() }}>수정하기</div>
                                    <div style={{color:"#FF5E5E"}} onClick={() => {
                                        dispatch(
                                            deletePostAc(Postdata.data[boardIdex].boardId))
                                    }}>삭제하기</div>
                                </div>
                            </UserInfoNav>
                        )}
                    </>
                    : null
                }
                <Img src={Postdata.data[boardIdex].image}></Img>
                    <ContentsBox>
                        <Commu>
                            <Nick>{Postdata.data[boardIdex].nickname}</Nick>
                            <Day>{Postdata.data[boardIdex].createdAt}</Day>
                            <GoalName>{Postdata.data[boardIdex].goalItemName}</GoalName>
                        </Commu>
                        <Content>{Postdata.data[boardIdex].contents}</Content>
                        <Bottom>
                            <Like />&nbsp;<Count>조회수&nbsp;{Postdata.data[boardIdex].viewCount}</Count>
                        </Bottom>
                    </ContentsBox>
                
            </Box>
            {commentData.data && commentData.data?.map((comment_list, index) => (
                <CommentList key={index}
                    username={comment_list.username}
                    createdAt={comment_list.createdAt}
                    comment={comment_list.comment}
                    user={userinfo.username}
                    idUser={Postdata.data[boardIdex].userId}
                />
            ))}
            <Enter>
                <Input ref={comment_ref}></Input>
                <PostBtn onClick={createComment}>게시</PostBtn>
            </Enter>

            {/* 게시글 수정모달 */}
            {showModall ?
                <ModifyModal showModall={showModall} closeModall={closeModall}
                    formodiId={Postdata.data[boardIdex].boardId}
                />
                : null}
        </>
    )
};

const Box = styled.div`
width: 100%;
height: 80vw;
/* border: 3px solid red; */
/* display: flex;
align-items: center;
flex-direction: column; */
/* padding: 0 5vw; */
position: relative;

`;

const InBox = styled.div`
width: 100%;
/* border: 3px solid black; */
display: flex;
`;


const Img = styled.img`
width: 100%;
height: 100%;
background-color: #F5F5F5;
/* border: 5px solid blue; */
display: flex;
position: absolute;
z-index: 1;
justify-content: center;
align-items: center;
filter: brightness(50%);
object-fit: cover;
`;

const Commu = styled.div`
width: 100%;
height: 30%;
/* border: 3px solid blue; */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
color: white;
/* position: absolute; */
/* z-index: 2; */
/* top: 11vw; */
`;

const Toggle = styled.div`
margin-left: 0;
float: right;
/* border: 3px solid orange; */
position: absolute;
z-index: 3;
color: white;
margin-right: 5vw;
right: 0;
`;

const Top = styled.div`
display: flex;
flex-direction: column;
/* border: 3px solid violet; */
`;

const Profile = styled.div`
width: 10vw;
height: 10vw;
border-radius: 10vw;
background-color: gray;
margin-right: 5vw;
`;
const Nick = styled.span`
font-size: 1rem;
font-weight: 600;
/* color: white; */

`;

const Day = styled.span`
font-size: 0.8rem;
font-weight: 200;
/* color: white; */
`

const GoalName = styled.span`
font-size: 1.2rem;
font-weight: 700;
text-align: center;
margin: auto 0;
`;

const Content = styled.div`
width: 70%;
height: 30%;
font-size: 0.8rem;
padding: 3vw;
/* border: 2px solid orange; */
color: white;
/* position: absolute;
z-index: 2; */
`;

const Bottom = styled.div`
width: 50%;
/* border: 3px solid green; */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
color: white;
`;

const Count = styled.span`
font-size: 0.8rem;
font-weight: 200;
/* color: white; */
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
height: 100%;
/* border: 5px solid purple; */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
position: absolute;
z-index: 2;
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
/* border: 1px solid orange; */
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
top: 6%;
right: 6%;
> div {
    position: relative;
    z-index: 5;
    width: 20vw;
    height: 17vw;
    text-align: center;
    line-height: 2rem;
    font-size: 0.7rem;
    border-radius: 1vw;
    background: #fff;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
}`

export default Detail;