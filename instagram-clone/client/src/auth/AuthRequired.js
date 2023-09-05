import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

export default function AuthRequired({ children }) {

    // AuthProvider에서 전달한 user객체에 접근하고 있다
    const { user } = useContext(AuthContext);

    // 유저가 없을 경우 로그인 페이지로 이동시킨다, Navigate to: 이동시키는 컴포넌트, to: 목적지, replace={true}: 현재페이지를 대체한다
    // '유저가 요청한 페이지를 로그인 페이지로 대체한다' 라는 뜻, 무효화
    if (!user) {
        return <Navigate to="/accounts/login" replace={true} />
    }

    return children; // AuthRequired로 보호받는 children 컴포넌트(AuthRequired로 children을 감싼다)
}