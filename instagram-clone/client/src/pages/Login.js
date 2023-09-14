import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // 리액트 라우터 기능을 지원하는 패키지
import AuthContext from "../auth/AuthContext"; // AuthProvider에서 전달한 value객체에 접근할때 필요한 객체
import { signIn } from "../service/api" // 서버 요청 라이브러리, 로그인 처리하는 함수, 여기가 로그인 페이지이므로
import { isEmail, isPassword } from "../utils/validator" // 클라이언트측에서 폼데이터 유효성 검사할때 우리가 사용하기 위해서 선언한 함수, 올바른이메일인지, 올바른비밀번호인지 검사하는 함수

export default function Login() {
    const { setUser } = useContext(AuthContext); // 유저 업데이트  시키는 메서드, 로그인 시 서버가 전송해준 응답객체로 유저 업데이트
    const navigate = useNavigate(); // 페이지 이동시킬 때 사용하는 Hook, 보통 use붙으면 Hook이다(Hook = 리액트나 라이브러리가 제공하는 특별한 함수)
    const [error, setError] = useState(null); // 에러처리 state
    const [email, setEmail] = useState(localStorage.getItem("email") || ""); // 이메일의 경우 로컬스토리지에 이메일이 있으면 "email", 없으면 ""(빈문자열) 가져오는 state, 로그인 성공하고 나서 다음부터 로그인 할때 로그인이 자동을 입력되게 하는, 로그인 간편하게 하는 state
    const [password, setPassword] = useState("") 
    const [showPassword, setShowPassword] = useState(false); // 비번 가릴건지 결정하는 변수, 기본값 false(비번 숨기기가 기본값)

    // 폼 제출처리
    async function handleSubmit(e) { 
        try {
            e.preventDefault();

            setError(null);

            // user변수 > 로그인에 성공한 유저 데이터
            const { user } = await signIn(email, password); // signIn: 서버에 로그인 요청하는 함수, 로그인에 성공했을때 user객체를 리턴함, 사용자가 입력한 email과 password함수를 signIn함수에 전달, api.js의 로그인 요청 부분에 선언되어있음

            // 유저 업데이트
            setUser(user)

            // 로그인에 성공한 이메일을 로컬스토리지에 저장한다
            localStorage.setItem('email', email); // 최초 로그인 성공 후 그 다음 로그인 할때는 이메일을 자동완성 할수 있게끔 로컬스토리지에 저장

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
                disabled={!isEmail(email) || !isPassword(password)} //올바른 형식의 이메일이 아니거나 올바른 형식의 비밀번호가 아닌경우 비활성화, !isEmail,!isPassword가 참이면(조건 불충족의 경우가 맞을 경우(true) 비활성화 됌)
            >
                login
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