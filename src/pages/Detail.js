import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { useParams } from "react-router-dom";

import Like from "../components/community/Like";
import CommentList from "../components/community/CommentList";
import Modal from "../components/public/BasicModalForm";
import EditPostModal from "../components/community/EditPostModal";
import ModifyModal from "../components/community/ModifyModal";
import { createCommentAc, loadCommentAc } from "../store/modules/community"
import { loadpostsAc, loadDetailAc, deletePostAc } from "../store/modules/community";
import { getUserInfoDB } from "../store/modules/user";
import DountChart from "../components/public/Goal";
import { useLocation } from "react-router";
import Header from "../components/public/Header"

import { ReactComponent as Dot } from "../assets/icons/Dot.svg";
import { ReactComponent as ArrowUp } from "../assets/icons/ArrowUp.svg";


function Detail() {
  const dispatch = useDispatch();
  const params = useParams();
  const comment_ref = React.useRef();

  const boardIdex = params.boardId;

    const  state  = useLocation();
    const postlistdata = state.state.name
    const boardId = postlistdata.boardId

    React.useEffect(() => {
        dispatch(loadCommentAc(boardId))
        dispatch(loadpostsAc())
        dispatch(loadDetailAc(boardId))
        dispatch(getUserInfoDB())
    }, []);

  const commentData = useSelector((state) => state.community.commentList);
  const Postdata = useSelector((state) => state.community.postList);
  const userinfo = useSelector((state) => state.user.infoList)
  const myGoalList = useSelector((state => state.goal.myGoalList));
  const goal = {
    goalImage: myGoalList?.image,
    goalItemId: myGoalList?.goalItemId,
    goalPercent: (myGoalList?.goalPercent) * 0.01,
    goalitemName: myGoalList?.itemName
  }

  const createComment = (boardId) => {
    const data = {
      comment: comment_ref.current.value,
    }
    dispatch(createCommentAc(data, postlistdata.boardId))
    window.location.reload();
  };

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

  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState();
  const [modalName, setModalName] = useState("");
  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };


  //슬릭
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const [limit, setLimit] = useState(51);
  const toggleEllipsis = (str, limit) => {
    return {
      string: str.slice(0, limit),
      isShowMore: str.length > limit
    }
  };

  const onClickMore = (str) => () => {
    setLimit(str.length);
  };


  const onClickClose = (str) => {
    setLimit(51)
  }

  return (
    <>
      <Header title={"커뮤니티"} />
      <Box className="box">
        <BImg src={postlistdata.image}></BImg>
        <StyledSlider {...settings}>
          <div style={{ backgroundColor: "transparent" }}></div>
          <ContentsBox>
            <DountBox>
              <DountChart color="#26DFA6" size="260" position="absolute" percent={goal.goalPercent} />
              <Text>
                <Commu>
                  <GoalName><p className="goalTitle">{Math.floor(goal.goalPercent * 100)}&nbsp;%</p></GoalName>
                  <GoalName>{postlistdata.goalItemName}</GoalName>
                </Commu>
                <Bottom className="bottom">
                  <Like
                    isLike={postlistdata.checkLike}
                    forLikeId={postlistdata.boardId}
                    likeCount={postlistdata.likeCount}
                  />&nbsp;<Count>조회수&nbsp;{postlistdata.viewCount}</Count>
                </Bottom>
                <Day>{postlistdata.createdAt.substr(0, 10).split('-', '3').join(".")}</Day>
              </Text>
            </DountBox>
          </ContentsBox>
        </StyledSlider>
      </Box>
      <Con>
        <Left>
          <WriterImg src={postlistdata.profileImg}></WriterImg>
        </Left>
        <Right>
          <Content>
            <Nick>{postlistdata.nickname}</Nick>&nbsp;&nbsp;
            {/* {postlistdata.contents} */}
            {toggleEllipsis(postlistdata.contents, limit).string}
            {toggleEllipsis(postlistdata.contents, limit)
              .isShowMore ? <MoreBtn onClick={onClickMore(postlistdata.contents)}>
              ...더보기</MoreBtn> : <Arr onClick={onClickClose}><ArrowUp /></Arr>}
          </Content>
        </Right>
        {userinfo.username === postlistdata.userId ?
          <>
            <Toggle onClick={onClickNav}><Dot /></Toggle>
            {user_nav && (
              <UserInfoNav>
                <div>
                  <div onClick={() => {
                     openModal();
                     setModalName("수정하기");
                     setModalState(<EditPostModal close={closeModal} />)
                   }}>수정하기</div>
                  <div style={{ color: "#FF5E5E" }} onClick={() => {
                    dispatch(
                      deletePostAc(postlistdata.boardId))
                  }}>삭제하기</div>
                </div>
              </UserInfoNav>
            )}
          </>
          : null
        }
      </Con>
      {commentData.data && commentData.data?.map((comment_list, index) => (
        <CommentList key={index}
          username={comment_list.username}
          createdAt={comment_list.createdAt}
          comment={comment_list.comment}
          user={userinfo.username}
          idUser={postlistdata.userId}
          commId={comment_list}
          postAll={postlistdata}
          profileImg={comment_list.profileImg}
        />
      ))}
      <Blank></Blank>
      <Enter>
        <Input ref={comment_ref}></Input>
        <PostBtn onClick={createComment}>게시</PostBtn>
      </Enter>

      {/* 게시글 수정모달 */}

      <Modal
        open={modalOpen}
        close={closeModal}
        header={modalName}>
        {modalState}
      </Modal>

      {/* {showModall ?
        <ModifyModal showModall={showModall} closeModall={closeModall}
          formodiId={postlistdata.boardId}
        />
        : null} */}
    </>
  )
};

const StyledSlider = styled(Slider)`
    .slick-list {
        width: 100%;
        height: 286px;
        /* display: flex; */
    }
    .slick-dots {
        bottom: 2px;
    }
    .slick-dots li.slick-active button:before {
        color: #26DFA6;
    }
    .slick-dots li button:before {
        color: #999;
        opacity: 1;
    }
`;
const Box = styled.div`
width: 100%;
height: 284px;
/* border: 3px solid red; */
/* display: flex; */
align-items: center;
flex-direction: column;
/* padding: 0 5vw; */
position: relative;
`;



const BImg = styled.img`
width: 100%;
height: 286px;
background-color: #F5F5F5;
display: flex;
position: absolute;
z-index: 0;
justify-content: center;
align-items: center;
object-fit: cover;
`;



const Commu = styled.div`
width: 100%;
height: 80px;
/* border: 3px solid blue; */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
color: white;
`;

const Toggle = styled.div`
float: right;
/* border: 3px solid orange; */
position: absolute;
z-index: 3;
color: white;
margin-right: 15px;
margin-top: 10px;
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
margin-bottom: 2vw;
/* color: white; */

`;

const Day = styled.span`
font-size: 0.8rem;
font-weight: 200;
color: #999;
/* border: 1px solid red; */
`

const GoalName = styled.span`
font-size: 1.9rem;
font-weight: 700;
text-align: center;
margin-top: 7px;
/* margin: auto 0; */
/* border: 1px solid green; */
`;

const Content = styled.div`
width: 100%;
min-height: 83px;
font-size: 0.8rem;
padding: 10px;
/* border: 2px solid orange; */
color: white;
/* position: absolute;
z-index: 2; */
margin-top: 8px;
line-height: 1rem;
`;

const MoreBtn = styled.button`
color: #26DFA6;
font-weight: 700;
`;

const Bottom = styled.div`
width: 100%;
/* border: 3px solid green; */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
color: white;
margin-top: 40px;
margin-bottom: 7px;

`;

const Count = styled.span`
font-size: 1.1rem;
font-weight: 200;
color: #999999;
`;

const Con = styled.div`
width: 100%;
min-height: 83px;
background-color: #333333;
/* border: 5px solid blue; */
display: flex;
padding: 0 0 0 25px;
`;

const Left = styled.div`
width: 45px;
height: 45px;
/* border: 1px solid pink; */
margin-top: 20px;
`;

const WriterImg = styled.img`
width: 100%;
height: 100%;
border-radius: 50vw;
/* border: 1px solid gold; */
`

const Right = styled.div`
width: 75%;
min-height: 83px;
/* border: 1px solid greenyellow; */
`;

const Arr = styled.div`
bottom: 0;
display: flex;
justify-content: center;
margin-top: 3vw;
`;




// ----------------------------
const ContentsBox = styled.div`
width: 100%;
height: 286px;
/* border: 5px solid purple; */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
/* position: absolute; */
z-index: 2;
background-color: rgb(0,0,0,0.5);
position: relative;
`;

const DountBox = styled.div`
/* background-color: gray; */
position: relative;
width: 260px;
height: 260px;
top: 50%; left: 50%;
transform: translate(-50%, -50%);

`;

const Text = styled.div`
width: 140px;
height: 190px;
position: absolute;
top: 60%; left: 50%;
transform: translate(-50%, -50%);
/* border: 1px solid red; */
`;

const Enter = styled.div`
width: 388px;
height: 84px;
padding: 5px 25px;
border: none;
background-color: #333333;
display: flex;
align-items: center; 
position: fixed;
bottom: 0;
margin-top: 84px;
`;

const Input = styled.input`
width: 100%;
border: 1px solid #A9FFE4;
border-radius: 40px;
background-color: transparent;
color: white;
margin: 0 auto;
padding: 0.81rem;
:focus{
    outline: none;
}
`;

const PostBtn = styled.button`
position: absolute;
right: 2.25rem;
height: 10vw;
border: none;
background-color: transparent;
color: white;
font-size: 0.75rem;
font-weight:700;
`;

const UserInfoNav = styled.div`
position: absolute;
top: 45%;
right: 5%;
> div {
    position: relative;
    z-index: 5;
    width: 70px;
    height: 70px;
    text-align: center;
    line-height: 2rem;
    font-size: 0.7rem;
    border-radius: 6px;
    background: #fff;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
}`

const Blank = styled.div`
width: 100%;
height: 12vw;
/* border: 1px solid black; */
`;

export default Detail;