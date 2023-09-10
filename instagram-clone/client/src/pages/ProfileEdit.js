import { useState, useContext, useContext } from "react";
import { Link } from "react-router-dom";
import { updateAvatar } from "../service/api";
import AuthContext from "../auth/AuthContext";

export default function ProfileEdit() {
    const { user, setUser } = useContext(AuthContext);
    const [newName, setNewName] = useState(user.name);
    const [newBio, setNewBio] = useState(user.bio);

    // 키 스테이트
    console.log(user);

    // 폼 제출버튼 disabled 처리용 객체
    const isEqual = {
        name: user.name === newName,
        bio: user.bio === newBio
    }

    // 폼 제출처리
    async function handleSubmit(e) { }

    // 폼 제출처리
    async function handleFile(e) { }

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
                            accept="image/png, image/jpg, image/jpeg"
                        />
                        사진 업데이트
                    </label>
                </div>
            </div>

            {/* 폼 */}
        </div>
    )


};