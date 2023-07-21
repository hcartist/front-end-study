import { useContext, createContext, useState } from "react";

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

// function Content() {
// return (
//   <>
//   <h2>고양이는 액체일까?</h2>

//   {/*video*/}
//   <img 
//   src="https://www.chemicalnews.co.kr/news/photo/202106/3636_10174_4958.jpg"
//   alt=""
//   width="100%"
//   />
//    </>
//   )
// }

// function Comments() {
// return (

//   <ul>
//     <li>댓글1</li>
//     <li>댓글2</li>
//     <li>댓글3</li>
//   </ul>
//   )
// }

// function Suggested() {
// return (
//   <ul>
//     <li>고양이는 정말 폭력적일까?</li>
//     <li>고양이는 정말 폭력적일까?</li>
//     <li>고양이는 정말 폭력적일까?</li>
//   </ul>
//   )
// }

// // 메인 컴포넌트
// function Snippet() {
// return (
//   <>
//   <header>
//     <h1>Youtube</h1>
//   </header>

//   <main>
//     <Content />

//     <h2>Comments</h2>
//     <Comments/>
//   </main>

//   <aside>
//     <h2>Suggested video</h2>
//     <Suggested/>
//   </aside>
//   </>
//   )
// }




/* 
props
컴포넌트에 전달되는 데이터
*/

// function Beer({beer}) {
//   console.log(beer) // 전달받은 변수에 접근한다
// return (
//   <ul>
//     <li>이름: {beer.name}</li>
//     <li>원산지: {beer.origin}</li>
//     <li>판매중: {beer.available ? "예" : "아니오"}</li>
//   </ul>
//   )
// }

// function Snippet() {

//   // 지역 변수(선언된 함수 안에서만 접근할 수 있다)
//   const irishBeer = {
//   name: "Guinness",
//   origin: "Ireland",
//   available: false
//   };

//   return (
//     <>
//     <h2>Beer</h2>
//     {/* Beer컴포넌트에게 irishBeer 변수를 전달한다*/}
//     <Beer beer={irishBeer}/>
//     </>
//     )
// }



/*
DATA, 컴포넌트 합성, props를 이용하여 왼쪽의 뷰를 완성해보세요
*/
// function Snippet() {
// // 지역변수
// const DATA = {
// video: {
// id: 'v0',
// title: '고양이는 왜 액체일까?',
// source: 'https://www.chemicalnews.co.kr/news/photo/202106/3636_10174_4958.jpg'
// },

// comments: [
// { id: 'c0', content: '1빠' },
// { id: 'c1', content: '2빠' },
// { id: 'c2', content: '유치하게 등수는.. 3빠' },
// ],

// suggestedVideos: [
//   { id: 's0', title: '고양이는 정말 폭력적일까?' },
//   { id: 's1', title: '고양이는 정말 자기가 신이라고 생각할까?' },
//   { id: 's2', title: '냥냥펀치는 얼마나 아플까?' },
// ]
// }

// return (
//   <>
// <header>
//   <h1>Youtube</h1>
// </header>

// <main>
//   <Content video={DATA.video}/>

//   <h2>댓글</h2>
//   <Comments comments={DATA.comments}/>
// </main>

// <adide>
//   <h2>추천 영상</h2>
//   Suggested suggestedVideos={DATA.suggestedVideos}/>
// </adide>
// </>
// )
// }


// // 영상 부분
// function Content({video}) {
// console.log(video) // 전달이 잘 되었는지 확인

// return (
//   <>
//   <h2>{video.title}</h2>
//   <img src={video.source} alt={video.title} width='100%' />
//   </>
//   )
// }

// // 댓글
// function Comments({comments}) {
// console.log(comments);

// const commentList = comments.map(comment => (
//   <li key={comment.id}>{comment.content}</li>
//   ))

//   return (
//     <ul>
//       {commentList}
//     </ul>
//     )
// }

// //추천 영상
// function Suggested({suggestedVideos}) {
// console.log(suggestedVideos);

// const suggestedVideoList = suggestedVideos.map(video => (
//   <li key={video.id}>{video.title}</li>
//   ))

//   return (
//     <ul>
//       {suggestedVideoList}
//     </ul>
//     )
// 



/*
children props
컴포넌트를 트리형태로 만들 수 있다
*/

// function Layout({children}) {
// return (
//   <>
//   <h1>Instagram</h1>
//   <nav>
//     <ul>
//       <li>Home</li>
//       <li>Posts</li>
//       <li>Profile</li>
//     </ul>
//   </nav>

//   <main style={{padding: "1rem 0"}}>
//     {/*Articles 컴포넌트를 나타낸다*/}
//     {children}
//   </main>

//   <footer>
//     <small>2023 &copy; Instagram</small>
//   </footer>
//   </>
//   )
// }

// function Articles() {
// return (
//   <>
//   <img src='https://www.chemicalnews.co.kr/news/photo/202106/3636_10174_4958.jpg'
//   alt=''
//   width='100%'
//   />
//   <p>
//     <b>snoop_dogg</b>
//     주인 나가서 한컷.
//   </p>

//   <small>1일 전</small>
//   </>
//   )
// }

// function Snippet() {
// return (
//   <Layout>
//     <Articles/>
//   </Layout>
//   )
// }




/*
useContext Hook(리액트가 제공하는 특별한 함수)
하위 컴포넌트에 대해 데이터를 전달할 수 있다 (트리 구조)
*/



// const AuthContext = createContext();

// // 인증 관리
// function AuthProvider({ children }) {

//   // 유저 정보 (지역 변수)
//   const value = { username: "bunny" };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// function Layout({ children }) {
//   // 전달받은 value 객체에 접근
//   const auth = useContext(AuthContext);

//   console.log(auth);

//   return (
//     <>
//       <h1>Instagram</h1>
//       <nav>
//         <ul>
//           <li>Home</li>
//           <li>Posts</li>
//           <li>Profile</li>
//         </ul>
//       </nav>

//       <p>안녕하세요, {auth.username}님!</p>

//       <main style={{ padding: "1rem 0" }}>
//         {/*Articles 컴포넌트를 나타낸다*/}
//         {children}
//       </main>

//       <footer>
//         <small>2023 &copy; Instagram</small>
//       </footer>
//     </>
//   )
// }
 
// function Article() {

// const auth = useContext(AuthContext);

// console.log(auth);

//   return (
//     <>
//       <img src='https://www.chemicalnews.co.kr/news/photo/202106/3636_10174_4958.jpg'
//         alt=''
//         width='100%'
//       />
//       <p>
//         <b>snoop_dogg</b>
//         주인 나가서 한컷.
//       </p>

//       <small>1일 전</small>
//     </>
//   )
// }

// function Snippet() {
//   return (
//     <AuthProvider>
//       <Layout>
//         <Articles />
//       </Layout>
//     </AuthProvider>
//   )
// }



/*
이벤트 처리
*/

// function Snippet() {
// function handleClick() {
// alert('lol');
// }

// // onEventName={eventHandler}

// return (
//   <>
//   <h3>이벤트 처리</h3>
//   <button onClick={handleClick}>클릭</button>
//   </>
//   )
// }




/*
뷰 업데이트

useState 사용 방법
const [state, setState] = useState(initialValue)

state: 컴포넌트 내의 변수 (상태)
setState(newState): state를 업데이트하는 메서드
initialValue: state의 초기값(최초 렌더링 시)
*/



// function Snippet() {
// const [count, setCount] = useState(0);

// return (
//   <>
//   <p>count: {count}</p>
//   <button onClick={() => setCount(count + 1)}>+</button>
//   </>
//   )
// }




