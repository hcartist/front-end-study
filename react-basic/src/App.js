
/*
리액트 튜토리얼

1 리액트 소개
2 JSX
3 컴포넌트
4 이벤트
5 화면 업데이트
6 리액트 라우터
7 데이터 요청
*/


/*
리액트 소개

1 리액트란
UI를 개발하기 위한 자바스크립트 라이브러리
페이스북이 개발 및 유지
가장 인기있는 프론트엔드 프레임워크

2 리액트 특징
컴포넌트 기반
* 컴포넌트: 복잡한 뷰를 설계하기 위한 재사용가능한 부품

선언전 문법으로 사용이 편리하다

3 리액트 구조
SPA(Single Page Application) - 자바스크립트를 사용하여 뷰를 업데이트한다
*/


/*
JSX (JavaScript Extension)
자바스크립트의 확장 문법
가상의 엘리먼트를 생성하기 위해 사용한다
선언적 문법
일반 자바스크립트 객체로 변환된다

1 JSX 기본문법
2 JSX Fragment
3 JSX에 변수 출력하기
4 조건부 렌더링
5 리스트 렌더링
*/



export default function App() {
  return <Snippet />
}


function Snippet() {
  return (
    <form>
      <h1>Goole</h1>
      <input
        type="search"
        className="class1 class2"
        style={{ padding: "0.5rem", width: '20rem' }}
        placeholder="구글 검색"
        autoComplete="off"
      />
    </form>
  )
};