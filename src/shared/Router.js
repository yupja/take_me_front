import { BrowserRouter, Routes, Route } from "react-router-dom";


import Main from "../pages/Main" // 메인
import Save from "../pages/Save";  // 티끌 등록

import Community from "../pages/Community"; // 커뮤니티 
import Detail from "../pages/Detail"; // 상세페이지
import CommunityChatting from "../pages/CommunityChtting"; // 채팅 리스트

import Ranking from "../pages/Ranking" // 랭킹

import MyPage from "../pages/MyPage"; // 마이페이지 

import Login from "../pages/Login" // 로그인
import SignUp from "../pages/SignUp" // 회원가입
import FindPwChange from "../pages/FindPwChange"; // 비밀번호 변경
import SociallLogin from "../pages/SociallLogin"; // 소셜 로그인

import RoomDetail from "../components/community/RoomDetail"//채팅
import ClosedChattingLog from "../components/community/ClosedChattingLog" //종료된 채팅

import Guide from "../components/community/Guide"//가이드
import NotFound from "../pages/NotFound"; // NotFound



function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main />} />
        {localStorage.getItem("accessToken") ?
          <Route path="/" element={<Save />} /> : <Route path="/" element={<Main />} />
        }

        <Route path="/save" element={<Save />} />

        <Route path="/community" element={<Community />} />
        <Route path="/community/:id" element={<Community />} />
        <Route path="/detail/:boardId" element={<Detail />} />
        <Route path="/chattingList" element={<CommunityChatting />} />

        <Route path="/ranking" element={<Ranking />} />

        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/:name" element={<MyPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/login/:name" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user/changePassword/:token" element={<FindPwChange />} />
        <Route path="/oauth" element={<SociallLogin />} />

        <Route path="/chat/roomdetail/:roomId" element={<RoomDetail />} />
        <Route path="/chat/closedChttinglog/:closedRoomId" element={< ClosedChattingLog />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="*" element={<NotFound />} />
      </Routes >
    </BrowserRouter >
  );
}

export default Router;