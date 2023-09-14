// 메인 컴포넌트. 여기서 컴포넌트들이 합성되서 html주입되는 구조
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from './auth/AuthProvider';
import AuthRequired from "./auth/AuthRequired";
import Layout from "./pages/Layout";
import Feed from "./pages/Feed";
import PostView from "./pages/PostView";
import Comments from "./pages/comments/Comments";
import Explore from "./pages/explore/Explore";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/profile/Profile";
import FollowerList from "./pages/followerList/FollowerList";
import FollowingList from "./pages/followingList/FollowingList";
import ProfileEdit from "./pages/ProfileEdit";
import NotFound from "./pages/NotFound";
// AuthProvider: 유저데이터관리, 그의 하위 트리에서 유저 데이터에 접근 가능
// Routes는 Route컴포넌트의 부모
// Route는 트리형태
// 자식의..자식의.. 자식형태

// Route에서 element부분에서 AuthRequired가 Latout을 감싸고 있다 > Layout은 인증이 필요한 컴포넌트라는 뜻, 즉 index Route(Route이지만 index Route라고 부르겠다)의 엘리먼트가 인증이 필요하기 때문에 index Route의 자식라우트들은 모두 인증이 필요하다

/*          <Route path="p/:id">       // 자식이 2개가 있는데 path가 부모 path 뒤에 연결된다, (p/:id/comments), (path를 그룹화하기 위해 트리구조 만듦)
            <Route index element={<PostView />} />      // index element > 이렇게 써있는 애들은 부모랑 똑같단 얘기
            <Route path="comments" element={<Comments />} />       //path="comments" > 이렇게 써있는 애들은 부모+자기 path로 된다는 얘기
            </Route>
*/

/* 인증이 적용되지 않는 라우트
          <Route path="accounts/login" element={<Login />} />     // 로그인 > 인증을 받기 위한 페이지므로 인증 적용 x
          <Route path="accounts/signup" element={<SignUp />} />      // 회원가입 > 인증을 받기 위한 페이지므로 인증 적용 x
          <Route path="*" element={<NotFound />} />      //404페이지 > 요청한 주소에 해당하는 라우트가 없을때 최종적으로 호출
        </Routes>
*/
export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <AuthRequired>
              <Layout />
            </AuthRequired>
          }>
            <Route index element={<Feed />} />
            <Route path="explore" element={<Explore />} />
            <Route path="p/:id">
              <Route index element={<PostView />} />
              <Route path="comments" element={<Comments />} />
            </Route>
            <Route path="profiles/:username">
              <Route index element={<Profile />} />
              <Route path="followers" element={<FollowerList />} />
              <Route path="following" element={<FollowingList />} />
            </Route>
            <Route path="accounts/edit" element={<ProfileEdit />} />
          </Route>
          <Route path="accounts/login" element={<Login />} />
          <Route path="accounts/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}