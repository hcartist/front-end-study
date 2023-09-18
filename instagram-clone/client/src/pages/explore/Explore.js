import { useState } from "react";
import { getProfiles } from "../../service/api";
import Form from "./Form";
import Profile from "./Profile";
import Spinner from "../shared/Spinner";

export default function Explore() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    // 프로필 목록, 검색한 프로필
    const [profiles, setProfiles] = useState([]);

    // 키 스테이트
    console.log(profiles)

    // 검색 처리
    async function search(username) {
        try {
            if (!username) {
                return setProfiles([]);
            }

            setError(null);
            setIsLoaded(false);

            // 서버 요청
            const { profiles } = await getProfiles(username);

            // 프로필 리스트 업데이트
            setProfiles(profiles);

            setIsLoaded(true);
        } catch (error) {
            setError(error)
        }
    }

    // 프로필 목록
    const profileList = profiles.map(profile => (
        // 각각의 프로필
        <Profile
        key={profile.id}
        id={profile.id}
        username={profile.username}
        name={profile.name}
        avatarUrl={profile.avatarUrl}
        isFollowing={profile.isFollowing}
        />
    ))

    return (
        <div className="px-4">
        <h3 className="text-lg font-semibold my-4">검색</h3>
  
        {/* 검색어 입력란 */}
        {/* 따로 컴포넌트로 만들어놓음, Form.js, 저 search Form.js에 파라미터로 받고있음 */}
        <Form search={search} /> 
        
        <ul>
          {profileList}
        </ul>
  
        {!isLoaded && <Spinner />}
        
        {error && <p className="text-red-500">{error.message}</p>}
      </div>
    )
};