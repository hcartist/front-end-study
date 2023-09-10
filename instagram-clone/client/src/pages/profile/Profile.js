import { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AuthContext from "../../auth/AuthContext";
import ProfileInfo from "./ProfileInfo";
import Thumbnail from "./Thumbnail";
import PostCreate from "../PostCreate";
import { getProfile, getTimeline, follow, unfollow } from "../../service/api";
import Spinner from "../shared/Spinner";

export default function Profile() {
    const { username } = useParams();
    const { user, setUser } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    // 키 스테이트 추적
    console.log(profile)
    console.log(posts)

    // 서버에 데이터 요청
    useEffect(() => {
        fetchData()
      }, [username]);

    // 서버에 데이터 요청하는 함수
    async function fetchDate() {
        try {
            setProfile(null)

            const profileData = await getProfile(username);
            const timelineData = await getTimeline(username);

            setProfile(profileData.profile)
            setPosts(timelineData.posts);

        } catch (error) {
            navigate("/notfound", { replace: true });
        }
    }

    // 팔로우 처리
    async function handleFollow() {};

    // 언팔로우 처리
  async function handleUnfollow() {}

    // 로그아웃
    async function handleSignOut() {
        const confirmed = window.confirm('로그인하시겠습니까?');

        if (confirmed) {
            setUser(null);
        }
    };

    // 타이틀 업데이트
    useEffect(() => {
        document.title = `${username} - instagram`
    }, [])

    // 타임라인
    const postList = posts.map(post => (
        <Thumbnail
        key={post.id}
        id={post.id}
        thumbnailUrl={post.photoUrls[0]}
        likeCount={post.likeCount}
        commentCount={post.commentCount}
        />
    ))

    if (!profile) {
        return <Spinner />
    }

    return (
        <>
        <ProfileInfo
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
        isMaster={user.username === username}
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