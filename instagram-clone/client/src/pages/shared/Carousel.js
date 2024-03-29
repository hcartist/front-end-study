import { useState } from "react";

export default function Carousel({ photoUrls }) { // photoTemplate로부터 photoUrl props 전달 받음
  
  const [photoIndex, setPhotoIndex] = useState(0);
  // 첫번째 사진인 경우
  const isFirstPhoto = photoIndex === 0;
  // 마지막 사진인경우 > 사진이 총 3개일 경우 photoIndex(현재 보여지는 파일)의 숫자가 전체 파일 수 -1일때(파일은 0,1,2로 센다.(배열의 아이템은 0부터 세므로) 즉 3번째 파일의 숫자는 2)
  const isLastPhoto = photoIndex === photoUrls.length - 1;

  // 사진 인덱스
  console.log(photoIndex);

  // 사진 리스트
  const photoList = photoUrls.map(photoUrl => (
    <li key={photoUrl} className="w-full h-[450px] flex-none">
      <img
        src={photoUrl}
        className="w-full h-full object-cover"
        alt="photo"
      />
    </li>
  ))

  // 캐러셀 원리 : 사진 container가 translate(왼쪽으로 이동하면서) 사진이 바뀌는 원리

  // 이전/다음 버튼
  const buttons = (
    <>
      <div className="absolute top-0 left-0 h-full flex items-center">
        <svg
          className={`w-4 fill-white/[0.8] mx-2 ${isFirstPhoto && 'hidden'}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          onClick={() => setPhotoIndex(photoIndex - 1)} // 클릭하면 현재 인텍스에서 -1된 후 setPhotoIndex로 업데이트
        >
          <path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM310.6 345.4c12.5 12.5 12.5 32.75 0 45.25s-32.75 12.5-45.25 0l-112-112C147.1 272.4 144 264.2 144 256s3.125-16.38 9.375-22.62l112-112c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L221.3 256L310.6 345.4z" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 h-full flex items-center">
        <svg
          className={`w-4 fill-white/[0.8] mx-2 ${isLastPhoto && 'hidden'}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          onClick={() => setPhotoIndex(photoIndex + 1)}
        >
          <path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM358.6 278.6l-112 112c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25L290.8 256L201.4 166.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l112 112C364.9 239.6 368 247.8 368 256S364.9 272.4 358.6 278.6z" />
        </svg>
      </div>
    </>
  )

  // Indicator, 자바스크립트 라이브러리 사용(react) > dotIndex
  const dots = photoUrls.map((photoUrl, dotIndex) => (
    <li
      key={photoUrl}
      // 활성화된 dot - dotIndex와 PhotoIndex가 같은 경우
      className={`w-2 h-2 rounded-full ${dotIndex === photoIndex ? 'bg-white' : 'bg-white/[0.5]'}`} // dotIndex도 photoIndex와 같다(배열의 아이템), dotIndex === photoIndex > 둘을 비교
    >
    </li>
  ))

  return (
    <div className="overflow-x-hidden relative">
      <ul
        className="flex transition"
        style={{ transform: `translateX(-${photoIndex * 100}%)`}} // 100씩 x축으로 이동
      >
        {photoList}
      </ul>

      {buttons}

      <ul className="absolute bottom-0 w-full pb-4 flex justify-center gap-1 ">
        {dots}
      </ul>
    </div>
  )
} 