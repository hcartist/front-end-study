import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFollowers, follow, unfollow } from '../../service/api';
import Follower from './Follower';
import Spinner from '../shared/Spinner';

export default function FollowerList() {
    const { username } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [followers, setFollowers] = useState([]);

    // 키 스테이트
    console.log(followers);

    // 팔로워 리스트 가져오기 요청
    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            const data = await getFollowers(username)

            setFollowers([...followers, ...data.profiles]);

        } catch (error) {
            setError(error)
        } finally {
            setIsLoaded(true)
        }
    }

    // 팔로우 처리
    async function handleFollow(username) { // 하위폴더 Follower.js에도 연결되어 있음
        try {
            // 서버 요청
            await follow(username)

            // 팔로워 리스트 업데이트
            // 팔로우 리스트가 배열이므로 map매서드를 사용해서 팔로우리스트를 순회하면서 전달받은 username과 일치하는 팔로우를 찾아서 그 팔로위의 isFollowing을 true로 만듦
            const updatedFollowers = followers.map(follower => {
                if (follower.username === username) {
                    return {...follower, isFollowing: true }
                }

                return follower;
            })

            setFollowers(updatedFollowers);
        } catch (error) {
            alert(error)
        }
    }

    // 언팔로우 처리
    async function handleUnfollow(username) { // 하위폴더 Follower.js에도 연결되어 있음
        try {
            // 서버 요청
            await unfollow(username)

            // 팔로워 리스트 업데이트
            // 위 팔로우처리랑 똑같은데 isFollowing만 false로 바꾼다
            const updatedFollowers = followers.map(follower => {
                if (follower.username === username) {
                    return {...follower, isFollowing: false }
                }

                return follower;
            })

            setFollowers(updatedFollowers);
            
        } catch (error) {
            alert(error)
        }
    }

    // 팔로워 리스트
    const followerList = followers.map(follower => (
        // 각각의 프로필
        <Follower
        key={follower.username}
        username={follower.name}
        avatarUrl={follower.isFollowing}
        isFollowing={follower.isFollowing}
        handleFollow={handleFollow}
        handleUnfollow={handleUnfollow}
        />
    ))

    return (
        <div className='px-2'>
            <h3 className="text-lg my-4 font-semibold">{username}의 팔로워</h3>
            {/* 팔로워리스트가 0보다 클 경우 followList 나타나고(참), 없을 경우엔 '없습니다'(거짓) */}
            {followerList.length > 0 ? (
                <ul>
                    {followerList}
                </ul>
            ) : (
                <p>팔로워가 없습니다</p>
            )}

            {!isLoaded && <Spinner />}

            {error && <p className='text-red-500'>{error.message}</p>}
        </div>
    )
};