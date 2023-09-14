import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from '../service/api';

export default function PostCreate({ setModalOpen }) { // PostCreate의 props는 setModalOpen
    const navigate = useNavigate(); // 게시물 생성이 되면 feed로 이동하므로 navigate가 필요
    // 게시물의 내용
    const [caption, setCaption] = useState("");
    // 게시물의 사진
    const [files, setFiles] = useState([]);

    // 폼 제출처리
    async function handleSubmit(e) {
        try {
            e.preventDefault();

            // 폼데이터(파일 전송)
            const formData = new FormData();

            //폼데이터에 유저가 업로드한 파일을 저장한다
            files.forEach(file => {
                formData.append('photos', file);
            })

            // 폼데이터에 유저가 입력한 사진 설명을 저장한다
            formData.append('caption', caption);

            // 서버 요청(폼데이터에 파일, 사진 설명 저장한 후 서버 요청)
            await createPost(formData); // api.js 85전째 줄에 선언되어있음

            // 피드로 이동
            navigate('/');
            
        } catch (error) {
            alert(error)
        }
    }

    // 모달 닫기 처리
    function handleOverlay(e) {
        // 오버레이 버튼을 클릭했을 때 (모달 제외한 나머지 영역 클릭했을 때)
        if (e.target === e.currentTarget) {
            //e.currentTarget = 오버레이
            setModalOpen(false)
        }
    }

    // 사진 미리보기, 모달 렌더링 부분
    const photoPreviewList = files.map(file => (
        <li key={file.name} className="pt-[100%] relative">
            <img
                className="absolute inset-0 w-full h-full object-cover"
                // URL.createObjectURL(blob객체): blob객체에 접근 가능한 URL을 생성한다
                // blob > 미가공 데이터(따로 저장하지 않는)
                src={URL.createObjectURL(file)}
                alt={file.name}
            />
        </li>
    ));

    return (
        <div
            className="fixed inset-0 bg-black/[0.2] z-10"
            onClick={handleOverlay}
        >
            {/* 폼 */}
            <form
                className="bg-white max-w-xs mt-20 mx-auto rounded-2xl"
                onSubmit={handleSubmit}
            >
                <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold text-center">게시물 업로드</h3>
                </div>

                <div className="p-4">
                    <label className="inline-block mb-2 font-semibold text-sm px-4 py-2 bg-gray-200 rounded-lg cursor-pointer">
                        <input
                            type="file"
                            className="hidden"
                            // Array.from(target.files) > drag and drop때 봤던 메서드, fileList타입의 객체를 자바스크립트 배열로 변환할때 사용하는 메서드 fileList는 현재 지원되지 않는 포멧이기 때문
                            onChange={({ target }) => setFiles(Array.from(target.files))}
                            multiple={true}
                            // accept > 클라이언트 측 파일 포맷 필터링, image/png, image/jpg, image/jpeg 만 가능하게끔 함
                            accept="image/png, image/jpg, image/jpeg"
                        />
                        사진 선택
                    </label>

                    {/* 사진 미리보기 */}
                    {files.length > 0 && (
                        <ul className="grid grid-cols-3 mb-2">
                            {photoPreviewList}
                        </ul>
                    )}

                    {/* 게시물 내용 */}
                    <div className="mb-2">
                        <label
                            htmlFor="caption"
                            className="block font-semibold"
                        >
                            사진 설명
                        </label>
                        <textarea // input하고 비슷한 느낌
                            row="2"
                            id="caption"
                            className="block w-full px-2 py-1 rounded border resize-none"
                            onChange={({ target }) => setCaption(target.value)}
                            value={caption}
                        />
                    </div>

                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-semibold bg-blue-500 rounded-lg text-white disabled:opacity-[0.2]"
                        disabled={files.length < 1} // file이 1개 이상일때 활성화, 클라이언트 측에서 필터링하는 것 중 하나(서버로 전송되기 전에 겸사겸사 필터링)
                    >
                        업로드
                    </button>

                </div>
            </form>
        </div>
    )
};