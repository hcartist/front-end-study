// Layout의 역할은 네비게이션 렌더링이라고 보면 됌 (상단바)

import { useContext } from "react";
import { Link, Outlet } from "react-router-dom"; // Outlet는 app.js에서 라우팅 구조 안에서 Layout라우트의 자식라우트 엘리먼트가 렌더링 되는 것, Layout라우트는 트리구조이고, Layout라우트들의 자식라우트엘리먼트가 여기 71번째 줄 <Outlet /> 부분에 렌더링 된다
// 페이지 이동을 했을때 Layout(상단바)은 고정되어있고 Outlet부분만 바뀐다고 보면 됌
import AuthContext from "../auth/AuthContext";

export default function Layout() {
    const { user } = useContext(AuthContext);

    // 20번째 줄의 images불러오는 주소, 경로는 어딜까? client의 public(파일을 저장하는 경로)
    // 63번째의 avatarUrl은 로컬스토리지에 저장되어있다
    return (
        <div className="max-w-sm mx-auto pt-10">

            {/* 네비게이션 */}
            <nav className="fixed top-0 left-0 w-full border-b bg-white">
                <div className="max-w-sm mx-auto px-2 h-10 flex justify-between items-center">

                    {/* 로고 */}
                    <img className="w-24" src="/images/logo.png" />

                    {/* 메뉴 */}
                    <ul className="flex items-center">
                        {/* 홈 */}
                        <li>
                            <Link to="/" className="block">
                                <svg
                                    className="w-6"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    >

                                    </path>
                                </svg>
                            </Link>
                        </li>
                        {/* 검색 */}
                        <li className="ml-2">
                            <Link to="/explore" className="block">
                                <svg
                                    className="w-6"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
                                        fill="none"
                                        stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                    <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line>
                                </svg>
                            </Link>
                        </li>

                        {/* 나의 프로필 */}
                        <li className="ml-2">
                            <Link to={`/profiles/${user.username}`}>
                                <img
                                    src={user.avatarUrl}
                                    className="w-8 h-8 object-cover border rounded-full"
                                />
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* 내용 */}
            <Outlet />
        </div>
    )
};