import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../service/api"; // 서버 요청 라이브러리, 여긴 회원가입 페이지이므로 createUser(유저 생성) 함수 임포트
import { isEmail, isUsername, isPassword } from "../utils/validator"; // 클라이언트측에서 폼데이터 유효성 검사

export default function SignUp() {
    const navigate = useNavigate(); // 가입 성공 시 로그인 페이지로 이동하는 함수
    const [error, setError] = useState(null); // 에러 처리
    const [email, setEmail] = useState(""); // 가입에 필요한 정보들
    const [name, setName] = useState(""); // 가입에 필요한 정보들
    const [username, setUsername] = useState(""); // 가입에 필요한 정보들
    const [password, setPassword] = useState(""); // 가입에 필요한 정보들

    // 폼 제출처리 함수
    async function handleSubmit(e) { 
        try {
            e.preventDefault();

            const newUser = { email, name, username, password }

            // 유저 생성 요청
            await createUser(newUser); // api.js 1 유저 생생 요청 부분에 선언되어있음

            // 가입 환영 인사
            alert(`안녕하세요 ${name}님!`);

            // 로그인 페이지로 이동시킨다(엄밀히 말하면 피드로 이동시키지만 어차피 피드에서 로그인 페이지로 이동시키므로 걍 로그인 페이지로 이동한다 한다)
            navigate('/');

        } catch (error) {
            setError(error)
        }
    }

    // 타이틀 업데이트
    useEffect(() => {
        document.title = "가입 - instagram"
    }, [])

    return (
        <form onSubmit={handleSubmit} className="max-w-xs mx-auto p-4 mt-16">
            {/* 로고 이미지 */}
            <div className="mt-4 mb-4 flex justify-center">
                <img src="/images/logo.png" className="w-36" />
            </div>

            {/* 이메일 입력란 */}
            <div className="mb-2">
                <label className="block">
                    <input
                        type="text"
                        name="email"
                        className="border px-2 py-1 rounded w-full"
                        onChange={({ target }) => setEmail(target.value)}
                        placeholder="이메일"
                    />
                </label>
            </div>

            {/* 이름 입력란 */}
            <div className="mb-2">
                <label className="block">
                    <input
                    type="text"
                    name="name"
                    className="border rounded px-2 py-1 w-full"
                    onChange={({ target }) => setName(target.value)}
                    placeholder="Full Name"
                    />
                </label>
            </div>


            {/* 유저네임(아이디) 입력란 */}
            <div className="mb-2">
                <label className="block">
                    <input
                        type="text"
                        name="username"
                        className="border px-2 py-1 rounded w-full"
                        onChange={({ target }) => setUsername(target.value)}
                        placeholder="Username"
                    />
                </label>
            </div>

            {/* 비밀번호 입력란 */}
            <div className="mb-2">
                <label className="block">
                    <input
                        type="password"
                        name="password"
                        className="border rounded px-2 py-1 w-full"
                        onChange={({ target }) => setPassword(target.value)}
                        placeholder="Password"
                        autoComplete="new-password"
                    />
                </label>
            </div>

            {/* 제출 버튼 */}
            <div className="mb-2">
                <button
                    type="submit"
                    className="bg-blue-500 rounded-lg text-sm font-semibold px-4 py-2 text-white w-full disabled:opacity-[0.5]"
                    disabled={!isEmail(email) || !isUsername(username) || !isPassword(password)} // 유효성 검사, isEmail, isUsername, isPassword가 모두 통과되어야 버튼 활성화, utils에서 찾아볼 수 있다, 쌤 왈 "필수적인건 아니지만 최소한 서버에 정제된 데이터를 보내기 위함"
                    // 하단의 error부분, 에러가 생길 경우 버튼 밑에 에러메시지 띄운다
                >
                    가입하기
                </button>
                {error && <p className="text-red-500 text-center my-4">{error.message}</p>} 
            </div>

            <p className="text-center mt-4">
                계정이 있으신가요 ? {" "}
                <Link to="/accounts/login" className="text-blue-500 font-semibold">
                    로그인
                </Link>
            </p>
        </form>
    )
};