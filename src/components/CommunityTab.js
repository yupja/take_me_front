import React,{ useState}from "react";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

import { loadpostsAc, deletePost } from "../redux/modules/post";

import ListModal from "../components/ListModal";
import PostModal from "../components/PostModal";


import styled from "styled-components";

 const CommunityTab= ()=>{
    
    React.useEffect(() => {
        dispatch(loadpostsAc())
    },[])
    
    const navigate = useNavigate();
    const Postdata = useSelector((state) => state.post.postList);
    const [showModal, setShowModal] = useState(false);
    

    
    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const [showModall, setShowModall] = useState(false);

    const openModall = () => {
        setShowModall(true)
    }

    const closeModall = () => {
        setShowModall(false);
    }

    const [showModalll, setShowModalll] = useState(false);

    const openModalll = () => {
        setShowModalll(true)
    }

    const closeModalll = () => {
        setShowModalll(false);
    }


 

    const [isEdit, setIsEdit] = useState(false);

    const openEdit = () => {
        setIsEdit(true)
    }
    
    const editPost = (index) => {
        // 이거왜썼어요??
        window.location.replace(`/community/${index}`);

    }    
    
    const dispatch = useDispatch();

    return (
        <>
             <Box>

         {Postdata.map((postList, index) => {
             return(
             <>
         <ContentBox key={index}>
         <HeadBox>
             <Profile /*src={postList.profileImg}*/></Profile>
             <Nick>{postList.nickname}</Nick>
             {/* <Day>{postList.createAt}</Day> */}
         </HeadBox>
         <ItemImage></ItemImage>
         <button onClick={() => {dispatch(editPost(postList.boardId))}}>수정</button>
      
         <button onClick={() => {dispatch(deletePost(postList.boardId))}}>삭제</button> 
      
         <Content>{postList.contents}</Content>
         <Foot>
             <div>❤{postList.likeCount}</div>
             <div style={{marginLeft:"1rem"}}>💬</div>
                 <button onClick={()=>{
                     navigate(`/Comment/${index}`);
                 }}>댓글 00 개 모두 보기</button>

             {/* 아낌이력조회모달 */}
             <div onClick={openModall} style={{marginLeft:"auto"}}>📃</div>
             {showModall ?
                                     <ListModal showModall={showModall} closeModall={closeModall} />
                                     : null}

            
         </Foot>
         </ContentBox>
         <BtnBox>
         <FootBtn onClick={openModalll}>내 아낌 % 공유</FootBtn>
         {showModalll ?
                                     <PostModal showModalll={showModalll} closeModalll={closeModalll} />
                                     : null}
         <FootBtn>나 이거 사?</FootBtn>
         </BtnBox>
         </>
)})}
        
     </Box>
        </>
    )
 }

 
const Box = styled.div`
width: 100%;
height: 100%;
border: 1px solid black;
margin: auto;
display: flex;
flex-direction: column;
`;

const ContentBox = styled.div`
width: 100%;
padding: 1rem;
border: 1px solid blue;
`;

const HeadBox = styled.div`
width: 80%;
height: 45h;
border: 1px solid yellow;
display: flex;
margin: auto;
align-items: center;
`;

const Profile = styled.img`
width: 50px;
height: 50px;
background-color: gray;
border-radius: 25px;
`;

const Nick = styled.div`
font-size: 1.5rem;
margin-left: 10px;
`;

const Day = styled.div`
font-size: 1.5rem;
margin-left: auto;
`

const ItemImage = styled.div`
width: 80%;
height: 41vh;
border: 1px solid red;
margin: 0 auto;
border-radius: 50rem;
`;

const Content = styled.div`
width: 80%;
height: 7vh;
border: 1px solid black;
margin: 2vw auto 1vw auto;
`;

const Foot = styled.div`
width: 80%;
height: 4vh;
border: 1px solid violet;
display: flex;
font-size: 1.5rem;
margin: auto;
align-items: center;

`;

const Modalbtn = styled.button`
border: none;
background-color: transparent;
font-size: 1rem;
`;

const BtnBox = styled.div`
width: 22vw;
height: 8vh;
margin: 0 auto;
border: 1px solid gray;
display: flex;
justify-content: space-between;
position:fixed;
bottom: 0;
left: 39%

`;

const FootBtn = styled.button`
width: 45%;
height: 8vh;
border-radius: 2.8rem;
font-size: 1.5rem;
font-weight: 700;
background-color: rgb(105, 105, 105, 0.2);
border: none;
`;


export default CommunityTab;