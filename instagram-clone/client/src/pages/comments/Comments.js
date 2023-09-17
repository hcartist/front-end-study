import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getComments, createComment, deleteComment } from "../../service/api";
import Form from "./Form";
import Comment from './Comment';
import Spinner from '../shared/Spinner';

export default function Comments() {
    const { id } = useParams(); // 댓글을 가져올 게시물의 아이디
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false); // 대기상태 관리하는 변수
    const [comments, setComments] = useState([]); // 댓글 목록

    // 키 스테이트
    console.log(comments);

    // 댓글 가져오기 요청
    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            // 서버 요청, 게시물의 아이디 요청
            const data = await getComments(id);

            // comments 업데이트
            setComments([...comments, ...data.comments]);

        } catch (error) {
            setError(error)
        } finally {
            setIsLoaded(true)
        }
    }

    // 댓글 추가
    async function handleAddComment(content) {
        // 서버 요청 (댓글 생성 요청)
        const data = await createComment(id, content); // id > 게시물의 아이디, content > 댓글의 내용

        // 댓글 목록 업데이트, 클라이언트 측에서 댓글 목록 업데이트
        const updatedComments = [data.comment, ...comments];
        setComments(updatedComments);
     }

    // 댓글 삭제
    async function handleDelete(id) { 
        // 서버 요청
        await deleteComment(id);

        // comments 업데이트
        const remainingComments = comments.filter(comment => comment.id !== id);

        setComments(remainingComments);
    }

     // 댓글 목록
    const commentList = comments.map(comment => (
        // 각각의 댓글, Comment컴포넌트 재사용
        <Comment
            key={comment.id}
            id={comment.id}
            username={comment.user.username}
            avatarUrl={comment.user.avatarUrl}
            content={comment.content}
            displayDate={comment.displayDate}
            handleDelete={handleDelete}
        />
    ))

    return (
        <div className="px-4">
            <h3 className="text-lg font-semibold my-4">댓글</h3>

            {/* 댓글 입력창 */}
            {/* 따로 컴포넌트로 구분해놓음(createComment) > api,js 168번째*/}
            <Form handleAddComment={handleAddComment} />

            {/* 댓글 목록 구조는 Todo 때 할일 목록과 구조가 같음 */}
            {/* 댓글이 있으면(0보다 크면(참)) 댓글 출력, 없으면(거짓) '댓글이 없습니다' 띄움 */}
            {commentList.length > 0 ? (
                <ul>
                    {commentList}
                </ul>
            ) : (
                <p className="text-center">댓글이 없습니다</p>
            )}

            {/* 대기상태 */}
            {!isLoaded && <Spinner />}
            
            {/* 에러 */}
            {error && <p className="text-red-500">{error.message}</p>}
        </div>
    )
};