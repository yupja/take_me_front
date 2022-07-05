import { BrowserRouter, Routes, Route } from "react-router-dom";


import Main from "../pages/Main" // 메인
import Save from "../pages/Save";  // 아끼기
import MyPage from "../pages/MyPage"; // 마이페이지 
import Community from "../pages/Community"; // 커뮤니티 
import Detail from "../pages/Detail"; //상세페이지
import Comment from "../pages/Comment";// 코멘트페이지
import Ranking from "../pages/Ranking" // 통계
import Login from "../pages/Login" // 통계
import SignUp from "../pages/SignUp" // 통계


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="*" element={<NotFound />} /> */}
        {/* <Route path="/main" element={<Main />} />  */}
        <Route path="/" element={<Save />} />
        {/* <Route path="/statistics" element={<Statistics />} /> */}
        <Route path="/detail/:boardId" element={<Detail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/:id" element={<Community />} />
        <Route path="/comment/:postid" element={<Comment />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;