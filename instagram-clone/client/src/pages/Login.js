login

import { useState, useContext, useEffect } from "react";
import { Link, isRouteErrorResponse, useNavigate } from "react-router-dom";
import AuthContext from "../auth/AuthContext";
import { signIn } from "../service/api"
import { isEmail, isPassword } from "../utils/validator"

export default function Login() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate(); // 페이지 이동시킬 때 사용하는 Hook
    const [error, setError] = useState(null);
    const [email, setEmail] = useState(localStorage.getItem("email") || "");
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    // 폼 제출처리
    async function handleSubmit(e) { 
        try {
            e.preventDefault();

            setError(null);

            // user변수 > 로그인에 성공한 유저 데이터
            const { user } = await signIn(email, password); // signIn: 서버에 로그인 요청하는 함수

            // 유저 업데이트
            setUser(user)

            // 로그인에 성공한 이메일을 로컬스토리지에 저장한다
            localStorage.setItem('email', email);

            // 피드로 이동한다 (유저데이터 처리하는데 시간이 오래걸리기 때문에 일부러 시간 딜레이를 줬음)
            setTimeout(() => {
                navigate('/');
            }, 500);
        
        } catch (error) {
            setError(error)
        }
    };

    // 타이틀 업데이트
    useEffect(() => {
        document.title = "로그인 - instagram"
    }, [])

    // 비밀번호 토글 버튼
    const passwordToggleButton = (
        <button
            type="Button"
            className="absolute right-0 h-full px-4 py-2 text-sm font-semibold"
            onClick={() => setShowPassword(!showPassword)}
        >
            {showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
        </button>
    )

    return (
        <form onSubmit={handleSubmit} className="max-w-xs p-4 mt-16 mx-auto">
            <div className="mt-4 mb-4 flex justify-center">
                <img src="/images/logo.png" className="w-36" />
            </div>

            {/* 이메일 입력란 */}
            <div className="mb-2">
                <label className="block">
                    <input
                        type="text"
                        className="border px-2 py-1 w-full rounded"
                        value={email}
                        placeholder="E-mail"
                        onChange={({ target }) => setEmail(target.value)}
                    />
                </label>
            </div>

            {/* 비밀번호 입력란 */}
            <div className="mb-2">
                <label className="block relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="border px-2 py-1 w-full rounded"
                        value={password}
                        placeholder="password"
                        autoComplete="new-password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    {/* 비밀번호가 한글자 이상 입력됐을때 나온다는 뜻 */}
                    {password.trim().length > 0 && passwordToggleButton}
                </label>
            </div>

            {/* 제출버튼 */}
            <button
                type="submit"
                className="bg-blue-500 text-sm text-white font-semibold rounded-lg px-4 py-2 w-full disabled:opacity-[0.5]"
                disabled={!isEmail(email) || !isPassword(password)} //올바른 형식의 이메일이 아니거나 올바른 형식의 비밀번호가 아닌경우
            >
                로그인
            </button>

            {/* 에러 메시지 */}
            {error && <p className="my-4 text-center text-red-500">{error.message}</p>}

            <p className="text-center my-4">
                계정이 없으신가요? {" "}
                <Link to="/account/signup" className="text-blue-500 font-semibold">가입하기</Link>
            </p>
        </form>
    )
};