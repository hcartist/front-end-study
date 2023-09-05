// 클라이언트 측 폼데이터 유효성 검사 라이브러리(서버에서도 유효성 검사를 하지만 클라이언트 측에서도 유효성 검사를 한다)

// 이메일 유효성 검사
export function isEmail(email) { // isEmail함수는 유저가 전달한 인자 email을 검사해서 boolen타입으로 리턴하고 있다(boolen은 밑에 if (email.match(patt))로 시작되는 코드
    // 정규식: 문자열 검색을 위한 패턴을 제공한다, 레그엑스라고도 부름 /패턴/
    const patt = /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/ // 이메일 검사하는 패턴, [] > 범위, 이 범위에 속한 문자가 있는지 확인(a~z(소문자)사이에 속한 문자가 있는지 확인), $ > 끝을 뜻함, {} > 길이 (2 이상만 되면 된다), + > 앞에 패턴 바로 뒤에 해당 패턴이 연결되야한다는 뜻

    if (email.match(patt)) {
        return true; // 검색 결과 리턴
    }

    return false;
}

// 유저이름 유효성 검사
export function isUsername(username) {
    const patt = /^[a-zA-Z0-9]{5,}$/ // ^ > 시작을 의미

    if (username.match(patt)) {
        return true;
    }

    return false;
}

// 비밀번호 유효성 검사
export function isPassword(password) {
    if (password.trim().length >= 5) { // 5글자 이상인지 확인
        return true;
    }

    return false;
}