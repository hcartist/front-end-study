
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


// function Snippet() {
//   return (
//     <form>
//       <h1>Goole</h1>
//       <input
//         type="search"
//         className="class1 class2"
//         style={{ padding: "0.5rem", width: '20rem' }}
//         placeholder="구글 검색"
//         autoComplete="off"
//       />
//     </form>
//   )
// };



// 2 Fragment
// 엘리먼트를 생성하지 않고 트리를 감쌀 수 있다

// function Snippet() {
// return (
//   <>
//     <h1>JSX Fragment</h1>
//     <ul>
//       <li>list item</li>
//       <li>list item</li>
//       <li>list item</li>
//     </ul>
//   </>
//   )
// }




// 3 JSX에 변수 출력하기

// function Snippet() {

//   let cat = {
//   name: '치즈',
//   age: 2,
//   home: null,
//   sound: function () {
//   return '야옹'
//   }
//   }

//   return (
//     <ul>
//       <li>이름: {cat.name}</li>
//       <li>나이: {cat.age}</li>
//       <li>집: {cat.home}</li>
//       <li>울음소리: {cat.sound()}</li>
//     </ul>
//     )
// }




/*
조건부 렌더링

1 && (그리고)
표현식1 && 표현식2
표현식1이 참일 경우 표현식2가 렌더링된다

2 ||(또는)
표현식1 || 표현식2
표현식1이 참일 경우 표현식1이 렌더링 된다
표현식1이 거짓일 경우 표현식2가 렌더링된다

3 ?(삼항연산자)
조건 ? 표현식1 : 표현식2
조건이 참인 경우 표현식1이 렌더링된다
조건이 거짓일 경우 표현식2가 렌더링된다
*/




// function Snippet() {
//   return (
//     <>
//       <h2>JSX Conditional rendering</h2>

//       <h3>&&</h3>
//       <p>{true && "나는 보입니다"}</p>
//       <p>{null && "나는 안보입니다"}</p>

//       <h3>||</h3>
//       <p>{"나는 보입니다" || "나는 안보입니다"}</p>
//       <p>{null || "나는 보입니다"}</p>

//       <h3>Ternary (삼향연산자)</h3>
//       <p>{true ? "조건이 참입니다" : "조건이 거짓입니다"}</p>
//       <p>{false ? "조건이 참입니다" : "조건이 거짓입니다"}</p>
//     </>
//   )
// }




// 리스트렌더링

// function Snippet() {
// const beers = [
// { name: "Heineken", origin: "Netherlands"},
// { name: "Guinness", origin: "Ireland"},
// { name: "Asahi", origin: "Japan"}
// ]

// const beerList = beers.map((beer, index) => (
//   <li key={index}>{beer.name}, {beer.origin}</li>
//   ))

//   return (
//     <>
//     <h3>세계맥주</h3>
//     <ul>
//       {beerList}
//       </ul>
//       </>
//     )
// }




// function Snippet() {
//   const beers = [
//     { name: "Heineken", origin: "Netherlands", available: false },
//     { name: "Guinness", origin: "Ireland", available: true },
//     { name: "Asahi", origin: "Japan", available: true }
//   ]

//   // Q 리스트 렌더링

//   //  내 답
// //   const beerList = beers.map((beer, index) => (
    
// //     <table key={index}>
// //       <th>Name</th>
// //       <th>Origin</th>
// //       <th>Available</th>
// //       <tr>
// //         <td>{beer.name}</td>
// //         <td>{beer.origin}</td>
// //         <td>{null || "No"}</td>
// //         </tr>
// //     </table>
// //   ))

// //   return (
// //     <>
// //       <h3>Beers</h3>
// //       <table>
// //         {beerList}
// //       </table>
// //     </>
// //   )
// // }


// // 쌤 답
// const beerRows = beers.map((beer, index) => (
//   <tr key={index}>
//     <td>{beer.name}</td>
//     <td>{beer.origin}</td>
//     <td>{beer.available ? "Yes" : "No"}</td>
//   </tr>
//   ))

//   return (
//     <>
//     <h1>세계맥주</h1>
//     <table border="1">
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Origin</th>
//           <th>Available</th>
//         </tr>
//       </thead>
//       <tbody>
//         {beerRows}
//       </tbody>
//     </table>
//     </>
//     )
//   }




/*
컴포넌트

1 컴포넌트 합서
2 props
3 children props
4 useContext Hook
*/



// 1 컴포넌트 합성

function Content() {
return (
  <>
  <h2>고양이는 액체일까?</h2>

  {/*video*/}
  <img 
  src="https://www.chemicalnews.co.kr/news/photo/202106/3636_10174_4958.jpg"
  alt=""
  width="100%"
  />
   </>
  )
}

function Comments() {
return (
  
  <ul>
    <li>댓글1</li>
    <li>댓글2</li>
    <li>댓글3</li>
  </ul>
  )
}

function Suggested() {
return (
  <ul>
    <li>고양이는 정말 폭력적일까?</li>
    <li>고양이는 정말 폭력적일까?</li>
    <li>고양이는 정말 폭력적일까?</li>
  </ul>
  )
}

// 메인 컴포넌트
function Snippet() {
return (
  <>
  <header>
    <h1>Youtube</h1>
  </header>

  <main>
    <Content />

    <h2>Comments</h2>
    <Comments/>
  </main>

  <aside>
    <h2>Suggested video</h2>
    <Suggested/>
  </aside>
  </>
  )
}