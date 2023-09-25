import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import PostTemplate from "./shared/PostTemplate";
import { getFeed, deletePost, likePost, unlikePost } from "../service/api";
import Spinner from './shared/Spinner';
import AuthContext from "../auth/AuthContext";

export default function Feed() {
    const { user } = useContext(AuthContext) // 유저
    const [error, setError] = useState(null); // 에러관리
    const [isLoaded, setIsLoaded] = useState(false); //대기상태
    const [posts, setPosts] = useState([]); // 게시물 관리
    const [postCount, setPostCount] = useState(0); // 게시물 갯수
    const [skip, setSkip] = useState(0); // 더보기 기능에 필요한 변수
    const limit = 5; // 더보기 기능에 필요한 변수

    // 키 스테이트
    console.log(posts);

    // 피드 요청
    useEffect(() => { // 서버 요청 부분(dependencies)에 skip이 있는 이유: 더보기 기능때문에, skip이 업뎃 되면 서버에 게시물을 다시 요청, useEffect에서 dependency(skip)가 있을때 dependency가 업데이트 되면 useEffect를 다시 실행한다
        fetchData()
    }, [skip])

    // 피드 요청 함수
    async function fetchData() {
        try {
            setError(null);
            setIsLoaded(false);
            // 서버 요청 > api에 선언되어 있음, limit과 skip을 서버에 같이 전송하고 있음
            const data = await getFeed(limit, skip);

            // posts 업데이트 (더보기 기능)
            // 1 posts - 이전에 요청한 게시물
            // 2 data.posts - 새롭게 요청한 게시물
            const updatedPosts = [...posts, ...data.posts]; // 기존(...posts)에 새롭게 추가된 posts(...data.posts > 새롭게 요청한 게시물) 추가

            setPosts(updatedPosts);
            setPostCount(data.postCount);

        } catch (error) {
            setError(error);
        } finally {
            setIsLoaded(true)
        }
    }

    // 좋아요
    async function handleLike(id) {
        try {
            // 서버 요청
            await likePost(id);

            // posts 업데이트
            const updatedPosts = posts.map(post => {
                if (post.id === id) {
                    return {
                        ...posts,
                        liked: true,
                        likesCount: post.likesCount + 1
                    }
                }
                return post;
            })

            setPosts(updatedPosts);
        } catch (error) {
            alert(error)
        }
    }

    // 좋아요 취소
    async function handleUnlike(id) {
        try {
            // 서버 요청
            await unlikePost(id)

            // post 업데이트
            const updatedPosts = posts.map(post => {
                if (post.id === id) {
                    return {
                        ...posts,
                        liked: false,
                        likesCount: post.likesCount - 1
                    }
                }
                return post;
            })

            setPosts(updatedPosts);
        } catch (error) {
            alert(error)
        }
    }

    // 게시물 삭제
    async function handleDelete(id) {
        try {
            // 서버 요청
            await deletePost(id);

            // post 업데이트
            // id가 일치하는 post를 제외하고 나머지를 리턴시킨다
            const remainingPosts = posts.filter(post => {
                if (id !== post.id) {
                    return post;
                }
            });

            setPosts(remainingPosts);

        } catch (error) {
            alert(error)
        }
    }

    // 피드 목록(필요한 목록)
    const postList = posts.map(post => (
        // PostTemplate 재사용, postTemplate은 보여지는 부분. 게시물 상세보기같이 보여지는 부분 담당하는 컴포넌트였음, postView, Feed에서 활용
        // Feed는 연속적으로 게시물이 보여지는 공간이므로 재사용하고있음(반복문)
        <PostTemplate
            key={post.id}
            id={post.id}
            username={post.user.username}
            avatarUrl={post.user.avatarUrl}
            photoUrls={post.photoUrls}
            caption={post.caption}
            liked={post.liked}
            likesCount={post.likesCount}
            commentCount={post.commentCount}
            displayDate={post.displayDate}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            handleDelete={handleDelete}
            isMaster={user.username === post.user.username}
        />
    ))

    // 더 가져올 게시물이 있는지 확인
    // postCount: DB에 있는 게시물의 총 갯수
    // posts.length: 현재 클라이언트가 가지고 있는 게시물의 수
    const doesMoreExists = postCount > posts.length;

    // 더보기 버튼
    const moreButton = (
        <div className="flex justify-center my-2">
            <button
                className="p-1 text-blue-500 font-semibold"
                onClick={() => setSkip(skip + limit)} // skip을 증가시킨다, 현재 skip값에 limit을 더한다
            >
                더보기
            </button>
        </div>
    )

    return (
        <>
        {/* 게시물이이 1개 이상이면 postList를 출력하고 없으면 'Instagram불러오기' 링크가 뜬다*/}
            {postList.length > 0 ? (
                <ul>
                    {postList}
                </ul>
            ) : (
                <div className="p-8 text-center">
                    <Link
                        to="/explore"
                        className="text-blue-500"
                    >
                        Instagram 둘러보기
                    </Link>
                </div>
            )}
            {/* 더 가져올 게시물이 있을때(참) 더보기 버튼 뜸, 현재는 없으면(거짓) 버튼 안뜸 */}
            {doesMoreExists && moreButton}

            {!isLoaded && <Spinner />}

            {error && <p className="text-red-500">{error.message}</p>}
        </>
    )
};