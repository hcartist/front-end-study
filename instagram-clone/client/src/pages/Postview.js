import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostTemplate from "./shared/PostTemplate";
import { getPost, deletePost, likePost, unlikePost } from "../service/api";
import Spinner from "./shared/Spinner";
import AuthContext from "../auth/AuthContext";

export default function PostView() {
    // id: 요청할 게시물의 아이디
    const { id } = useParams();
    const [post, setPost] = useState(null); // post: 게시물에 저장할 변수
    const navigate = useNavigate(); // navigate: 게시물 저장한 뒤 피드로 이동해야하므로
    const { user } = useContext(AuthContext)

    // 키 스테이트
    console.log(post);

    // 게시물 요청
    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            const data = await getPost(id); // api.js 70번째줄에서 선언되어 있음

            setPost(data.post);

        } catch (error) {
            navigate('/notfound', { replace: true });
        }
    }

    // 좋아요 처리
    async function handleLike(id) {
        try {
            // 서버 요청
            await likePost(id)

            // post 업데이트
            const updatedPost = {
                ...post, // 기존의 포스트를 뜻하는 말
                liked: true,
                likesCount: post.likesCount + 1
            }

            setPost(updatedPost)

        } catch (error) {
            alert(error)
        }
    }

    // 좋아요 취소 처리
    async function handleUnlike(id) {
        try {
            await likePost(id)

            const updatedPost = {
                ...post,
                liked: false,
                likesCount: post.likesCount - 1
            }

            setPost(updatedPost)

        } catch (error) {
            alert(error)
        }
    }

    // 게시물 삭제 처리
    async function handleDelete(id) { 
        try {
            // 게시물 삭제 요청
            await deletePost(id);

            // 삭제 후 피드로 이동
            navigate('/', { replace: true }); // replace: true > 현재 페이지 대체

        } catch (error) {
            alert(error)
        }
    }
    
    if (!post) {
        return <Spinner />
    }

    return (
        // PostTemplate > 보여지는 부분 처리, 피드에서도 사용할 것이므로 따로 컴포넌트로 만듦
        <PostTemplate
            id={post.id}
            username={post.user.username}
            avatarUrl={post.user.avatarUrl}
            photoUrls={post.photoUrls}
            caption={post.caption}
            likesCount={post.likesCount}
            commentCount={post.commentCount}
            displayDate={post.displayDate}
            liked={post.liked}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            handleDelete={handleDelete}
            isMaster={user.username === post.user.username}
        />
    )
}