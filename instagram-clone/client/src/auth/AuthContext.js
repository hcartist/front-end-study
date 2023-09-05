import { createContext } from "react";

// Provider 컴포넌트, 리액트에서 인증이 적용된 라우터, 전체 트리를 감싸는 역할
const AuthContext = createContext();

export default AuthContext; 