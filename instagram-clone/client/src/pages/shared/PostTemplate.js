import { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import Carousel from "./Carousel";

export default function PostTemplate({
    id,
    username,
    avatarUrl,
    photoUrls,
    caption,
    liked,
    likesCount,
    commentCount,
    displayDate,
    handleLike,
    handleUnlike,
    handleDelete,
    isMaster
}) {
    // 더보기 모달 > 게시물 삭제버튼, 모달 닫기 버튼 있음
    const [modalOpen, setModalOpen] = useState(false);

    // 모달 닫기 처리
    function handleOverlay(e) { 
        if (e.target === e.currentTarget) { // e.current.target > 모달을 제외한 오버레이 부분
            setModalOpen(false);
        }
    }

    // 모달
    const modal = (
        <div
            className="fixed inset-0 flex justify-center items-center bg-black/[0.2] z-10"
            onClick={handleOverlay}
        >
            <ul className="bg-white w-60 rounded-lg">
                <li className="border-b">
                    <button
                        className="w-full px-4 py-2 text-sm font-semibold text-red-500"
                        onClick={() => handleDelete(id)}
                    >
                        삭제
                    </button>
                </li>
                <li>
                    {/* 모달 닫기 버튼 */}
                    <button
                        className="w-full px-4 py-2 text-sm font-semibold"
                        onClick={() => setModalOpen(false)}
                    > 
                        닫기
                    </button>
                </li>
            </ul>
        </div>
    )

    // 좋아요 버튼
    const likeButton = (
        <svg
            className="w-6"
            onClick={() => handleLike(id)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
        >
            <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
        </svg>
    )
    // 좋아요 취소 버튼
    const unlikeButton = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => handleUnlike(id)}
            viewBox="0 0 512 512"
            className="w-6 fill-red-500"
        >
            <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
        </svg>
    )

    return (
        <div className="mt-4 bg-white">
            {/* 유저 아바타, 더보기 버튼 부분 */}
            <div className="px-2 mb-2 flex justify-between items-center">
                <Link // 유저 아바타 부분
                    to={`/profiles/${username}`} // 클릭했을때 유저 프로필로 이동한다
                    className="inline-flex items-center"
                >
                    <img
                        src={avatarUrl}
                        className="w-10 h-10 object-cover border rounded-full"
                    />
                    <span className="ml-2">
                        {username}
                    </span>
                </Link>

                {modalOpen && modal}

                {isMaster && ( // 본인 게시물일 경우(참일 경우) 더보기 버튼이 나옴
                    <svg
                        className="w-1 cursor-pointer"
                        onClick={() => setModalOpen(true)}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 128 512"
                    >
                        <path d="M64 360C94.93 360 120 385.1 120 416C120 446.9 94.93 472 64 472C33.07 472 8 446.9 8 416C8 385.1 33.07 360 64 360zM64 200C94.93 200 120 225.1 120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200zM64 152C33.07 152 8 126.9 8 96C8 65.07 33.07 40 64 40C94.93 40 120 65.07 120 96C120 126.9 94.93 152 64 152z" />
                    </svg>
                )}
            </div>

            {/* 캐러셀 */}
            {/* 컴포넌트를 따로 분리했음 > Carousel.js */}
            <Carousel photoUrls={photoUrls} /> 

            {/* 게시물 정보 */}
            <div className="mt-2 px-2">
                {/* 좋아요/취소 버튼 */}
                <div className="flex">
                    {/* 유저가 좋아하면(참) 좋아요 취소버튼 나타나고 반대면(거짓) 좋아요 버튼 나타남 */}
                    {liked ? unlikeButton : likeButton} 

                    {/* 댓글 버튼 > 댓글 페이지로 넘어감(링크) */}
                    <Link to={`/p/${id}/comments`} className="ml-2">
                        <svg
                            className="w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 47.63 19.91 91.25 52.91 126.2c-14.88 39.5-45.87 72.88-46.37 73.25c-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25C191.1 442.8 223.3 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zM256.1 400c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125l-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29c7.375-12.12 14.37-25.75 19.88-40.25l10.62-28l-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z" />
                        </svg>
                    </Link>
                </div>
                {/* 좋아요 갯수 */}
                <p className="text-sm my-2">좋아요 {likesCount}개</p>

                {/* 사진 설명 */}
                    {caption && (
                        <p className="my-4">
                            <Link to={`/profiles/${username}`} className="font-semibold">
                                {username}
                            </Link>
                            {/* {''} 인 이유 필수 아니라서. 있으면 넣는다 */}
                            {''}
                            {caption}
                        </p>
                    )}
                {/* 댓글 링크 */}
                {commentCount > 0 && (
                    <p className="text-gray-400 text-sm my-2">
                        <Link to={`/p/${id}/comments`}>
                            {commentCount}개의 댓글보기
                        </Link>
                    </p>
                )}

                {/* 작성일 */}
                {/* server model에서 virtual field 만들때 같이 만든 displayDate */}
                <p className="text-gray-400 text-xs">{displayDate}</p> 
            </div>
        </div>
    )
};