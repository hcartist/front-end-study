import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
    // 로컬스토리지로부터 초기 유저데이터를 가져온다 (로그인 상태 유지), 유저 데이터를 변수에 저장하면 새롭게 로드됬을때 초기화된다. 따라서 로컬스토리지에서 유저 데이터를 동기화한다
    const initialUser = JSON.parse(localStorage.getItem('user'));
    // 유저 데이터 관리
    const [user, setUser] = useState(initialUser);

    // 유저 상태 감시자(user상태를 감시하기 위한 목적)
    useEffect(() => { // user의 상태가 변할때 useEffect가 실행됨(if 구간은 useEffect의 콜백 구간)
        if (user) { // 유저가 존재하는 경우, 로그인 했을때 시행되는 코드
            localStorage.setItem('user', JSON.stringify(user)); // 로그인해서 유저데이터가 생성됬을 때, 로컬 스토리지에 user을 저장하고 있다
        } else { // 로그아웃
            localStorage.removeItem('user'); // 로그아웃했을때 로컬 스토리지에서 user데이터 삭제
        }
    }, [user]) // useEffect의 dependency [user], 로그인한 유저 상태 말하는 듯

    const value = { user, setUser }; // AuthProvider에서 선언된 지역변수인 user와 setUser를 업데이트하는 메서드를 value 객체에 저장

    return (
        // provider 컴포넌트 사용 이유: 컴포넌트 내에서 자식컴포넌트에서(지역변수) 전달한 value객체에 접근하려고
        <AuthContext.Provider value={value}>
            {children} 
        </AuthContext.Provider>
    )
}