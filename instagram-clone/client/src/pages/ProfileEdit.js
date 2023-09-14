import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { updateProfile, updateAvatar } from "../service/api"; // 서버 요청 라이브러리
import AuthContext from "../auth/AuthContext";

export default function ProfileEdit() {
    const { user, setUser } = useContext(AuthContext);
    const [newName, setNewName] = useState(user.name);
    const [newBio, setNewBio] = useState(user.bio);

    // 키 스테이트
    console.log(user); // 로컬스토리지에 저장된 user, 프로필 수정 페이지에 프로필 초기값은 이 user에서 가져옴

    // 폼 제출버튼 disabled 처리용 객체
    const isEqual = { // 수정을 했을 때 제출버튼이 활성화 된다
        name: user.name === newName, //  user.name > 로그인 유저의 정보와, newName > 변수값을 비교하고 있음
        bio: user.bio === newBio
        // 로그인 유저의 정보와 변수값이 맞지 않을 때 false가 되면서 폼 제출버튼이 활성화 되는 듯
    }

    // 폼 제출처리
    async function handleSubmit(e) {
        try {
            e.preventDefault();

            // 수정한 프로필 정보
            const editedProfile = {
                name: newName, // isEqual로 선언되어있음
                bio: newBio // isEqual로 선언되어있음
            };

            // 서버 요청
            const { user } = await updateProfile(editedProfile); // api.js에서 2205번째에 선언되어 있음

            // 유저 업데이트
            setUser(user);

            // 성공 메시지
            alert('수정되었습니다');

        } catch(error) {
            alert(error)
        }
     }

    // 파일 처리
    async function handleFile(e) { // input의 파일 상태가 변경됐을때(onChange)(92번째줄) 실행되는 함수
        try {
            // 유저가 선택한 파일
            const file = e.target.files[0]; // e.target : input, 클라이언트가 선택한 파일은 이 files라는 변수에 저장됨 이거 자체를 선언한 변수 file

            // 폼데이터 타입: 서버에 파일을 전송할 때 사용한다(JSON형식 아님)
            const formData = new FormData();

            // 폼데이터에 유저가 선택한 파일을 저장한다
            formData.append("avatar", file); // "avatar" > 파일의 name(서버는 name으로 데이터를 구분한다), file > 위에서 선언한 변수(유저가 선택한 파일 들어있음), append - 추가하다

            // 서버 요청
            const { user } = await updateAvatar(formData); // api.js에서 223번째에 선언되어 있음, 응답객체를 user라는 변수에 담고있다

            // 유저 업데이터, 응답객체로 user 업데이트, 프로필을 수정하는거니까 user가 업데이트 되는거임
            setUser(user);

            // 성공 메시지
            alert("수정되었습니다");

        } catch (error) {
            alert(error)
        }
    }


    // 타이틀 업데이트
    useEffect(() => {
        document.title = "프로필 수정 - Instagram";
    }, [])

    return (
        <div className="mt-8 px-4">
            {/* 아바타 이미지, 아바타 업데이트 버튼 */}
            <div className="flex mb-4">
                <img
                    src={user.avatarUrl}
                    className="w-16 h-16 object-cover rounded-full border"
                />

                <div className="flex flex-col grow items-start ml-4">
                    <h3>{user.username}</h3>

                    <label className="text-sm font-semibold text-blue-500 cursor-pointer">
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFile}
                            // 클라이언트 측 파일 포멧 필터링
                            accept="image/png, image/jpg, image/jpeg" // 클라이언트에서 이미지 확장자를 업데이트함, 해당 포멧만 가능
                        />
                        사진 업데이트
                    </label>
                </div>
            </div>

            {/* 폼 */}
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label htmlFor="name" className="block font-semibold">이름</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="border px-2 py-1 rounded w-full"
                        value={newName}
                        onChange={({ target }) => setNewName(target.value)}
                    />
                </div>

                <div className="mb-2">
                    <label htmlFor="bio" className="block font-semibold">자기소개</label>
                    <textarea
                        id="bio"
                        rows="3"
                        name="bio"
                        className="border px-2 py-1 rounded w-full resize-none"
                        value={newBio}
                        onChange={({ target }) => setNewBio(target.value)}
                    />
                </div>

                {/* 제출 및 취소 버튼 */}
                <div className="flex">
                    <button
                        type="submit"
                        className="text-sm font-semibold bg-gray-200 rounded-lg px-4 py-2 disabled:opacity-[0.2]"
                        disabled={isEqual.name && isEqual.bio} // 저장버튼이 비활성화됐을 경우 disabled가 true, isEqual.name과 isEqual.bio가 모두 충족됐을 때 비활성화 됌, 위에 선언되어있으니 보고오셈
                    >
                        저장
                    </button>

                    <Link
                        to={`/profiles/${user.username}`}
                        className="text-sm font-semibold bg-gray-200 rounded-lg px-4 py-2 ml-2"
                    >
                        취소
                    </Link>
                </div>
            </form>
        </div>
    )


};