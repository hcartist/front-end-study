import { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AuthContext from "../../auth/AuthContext";
import ProfileInfo from "./ProfileInfo"; // 프로필 페이지를 구성하는 컴포넌트
import Thumbnail from "./Thumbnail"; // 프로필 페이지를 구성하는 컴포넌트
import PostCreate from "../PostCreate"; // 게시물 생성 페이지
import { getProfile, getTimeline, follow, unfollow } from "../../service/api"; // 서버 요청 라이브러리 여기에서 필요한 요청들을 임포트하고있음
import Spinner from "../shared/Spinner"; // 대기상태 표현할때 사용하기 위해서 만든 컴포넌트

export default function Profile() {
    const { username } = useParams(); // app.js 53번째 줄의 username 파라미터에 useParams Hook을 사용해서 접근하고 있음, 현재 username은 bunny일것임(현재 내가 로그인한 유저네임)
    const { user, setUser } = useContext(AuthContext); // 현재 user을 업데이트 시키는 함수, AuthProvider에서 전달해줌
    const [profile, setProfile] = useState(null); // 서버에서 전송해준 프로필 데이터를 담을 변수, 초기값 null
    const [posts, setPosts] = useState([]); // user의 타임라인을 담을 변수, 초기값 빈배열
    const [modalOpen, setModalOpen] = useState(false); // 프로필 생성 페이지에서 사용하는 변수, 게시물 생성 페이지를 모달로 구현
    const navigate = useNavigate(); // 프로필 요청 실패했을 경우 404페이지로 이동시킴, 유저의 위치를 이동시킬 때 사용

    // 키 스테이트 추적
    console.log(profile);
    console.log(posts);

    // 서버에 데이터 요청
    useEffect(() => { // useEffect Hook을 사용하는 이유: 비동기적을 작동하고, 한번만 요청을 해야하기 때문에 사용함
        fetchData()
      }, [username]);

    // 서버에 데이터 요청하는 함수
    async function fetchData() {
        try {
            setProfile(null)

            const profileData = await getProfile(username); // api.js에서 임포트한 요청 처리 함수, username 파라미터 인자 전달함
            const timelineData = await getTimeline(username); // api.js에서 임포트한 요청 처리 함수, username 파라미터 인자 전달함

            setProfile(profileData.profile); // profile을 응답객체로 업데이트함
            setPosts(timelineData.posts); // posts 응답객체로 업데이트함

        } catch (error) {
            navigate("/notfound", { replace: true }); // 에러가 발생했을 때 notfound 페이지로 이동시킨다, 이 프로필 페이지에서 따로 에러처리하지 않고 404페이지로 넘겨버린다(404 = 공통적으로 사용되는 에러페이지)
        }
    }

    // 팔로우 처리
    async function handleFollow() {
        try {
          await follow(username)
    
          setProfile({ ...profile, isFollowing: true })
    
        } catch (error) {
          alert(error)
        }
      }

    // 언팔로우 처리
  async function handleUnfollow() {}

    // 로그아웃
    async function handleSignOut() {
        const confirmed = window.confirm('로그인하시겠습니까?'); // confirmed 메서드로 간단하게 구현, 유저가 alret에서 '확인'누르면 true 리턴, '취소' 누르면 false리턴

        if (confirmed) {
            setUser(null); // user를 null로 업데이트하여 로그아웃, 로그인 페이지로 이동
        }
    };

    // 타이틀 업데이트
    useEffect(() => {
        document.title = `${username} - instagram`
    }, [])

    // 타임라인
    const postList = posts.map(post => (
        <Thumbnail
        // Thumbnail.js에 해당 props를 다 전달함, 재사용
        key={post.id}
        id={post.id}
        thumbnailUrl={post.photoUrls[0]}
        likesCount={post.likesCount}
        commentCount={post.commentCount}
        />
    ))

    if (!profile) { // 프로필 가져오는 중 일때 대기 상태 표현
        return <Spinner />
    }

    return (
        <>
        <ProfileInfo // profileInfo 컴포넌트에 프로필 데이터를 전달하는 중, profileInfo란 프로필에서 유저 정보 있는 상단 부분
        username={profile.username}
        name={profile.name}
        avatarUrl={profile.avatarUrl}
        bio={profile.bio}
        postCount={profile.postCount}
        followerCount={profile.followerCount}
        followingCount={profile.followingCount}
        isFollowing={profile.isFollowing}
        handleSignOut={handleSignOut}
        handleFollow={handleFollow}
        handleUnfollow={handleUnfollow}
        isMaster={user.username === username} // user.username > AuthProvider에서 전달받은 로그인 유저, username > 파라미터로 전달받은 username, 이 두개를 비교한 결과가 isMaster, 본인 프로필에 방문한거면 true, 본인게 아닌곳을 방문한거면 false
        />

        <div className="border-t my-4"></div>

        {/* 타임라인 */}
        {postList.length > 0 ? (
            <ul className="grid grid-cols-3 gap-2 mb-2">
                {postList}
            </ul>
        ) : (
            <p className="text-center">게시물이 없습니다</p>
        )}

        {/* 게시물 생성 버튼 */}
        <svg
        className="opacity-40 w-12 fixed right-8 bottom-8 hover:opacity-80 cursor-pointer z-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        onClick={() => setModalOpen(true)}
      >
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
      </svg>

      {/* 게시물 생성 모달*/}
      {modalOpen && <PostCreate setModalOpen={setModalOpen} />}
    </>
    )
};