// profile 컴포넌트에서 이미 여기에 데이터 전달한 상태, 여기선 전달받은 데이터를 화면에 표현하는 것

import { Link } from "react-router-dom"

export default function ProfileInfo({
    // props들 (함수 블록 안에 작성하면 안됌, 파라미터 안에 작성해야 함)
    username,
    avatarUrl,
    name,
    bio,
    postCount,
    followerCount,
    followingCount,
    isFollowing,
    handleSignOut,
    handleFollow,
    handleUnfollow,
    isMaster,
}) {

    // 로그아웃 버튼
    const signOutButton = (
        <button
            className="ml-2 bg-gray-200 px-4 py-2 text-sm font-semibold rounded-lg"
            onClick={handleSignOut}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-4"
            >
                <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
            </svg>
        </button>
    )

    // 팔로우 버튼
    const followButton = (
        <button
          className="ml-2 bg-blue-500 text-white text-sm px-4 py-2 font-semibold p-2 rounded-lg"
          onClick={handleFollow}
        >
          팔로우
        </button>
      )

    // 언팔로우 버튼
    const unfollowButton = (
        <button
            className="ml-2 bg-gray-200 text-sm px-4 py-2 font-semibold p-2 rounded-lg"
            onClick={handleUnfollow}
        >
            팔로잉
        </button>
    )

    // 게시물갯수, 팔로워 및 팔로잉 수 표시 부분
    // {followerCount} , {followingCount}는 링크이기도 함, 클릭하면 팔로워, 팔로잉 리스트 페이지로 넘어감
    const countAboutProfile = (
        <ul className="flex itmes-center">
            <li className="w-1/3">
                <div className="text-sm">
                    게시물
                    {" "}
                    <span className="font-semibold">
                        {postCount}
                    </span>
                </div>
            </li>
            <li className="w-1/3">
                <Link to={`/profiles/${username}/followers`} className="block text-sm">
                    팔로워
                    {" "}
                    <span className="font-semibold">
                        {followerCount} 
                    </span>
                </Link>
            </li>
            <li className="w-1/3">
                <Link to={`/profiles/${username}/following`} className="block text-sm">
                    팔로잉
                    {" "}
                    <span className="font-semibold">
                        {followingCount}
                    </span>
                </Link>
            </li>
        </ul>
    )

    return (
        <div className="px-4 mt-8">
            <div className="flex mb-4">
                {/* 아바타 이미지 */}
                <img
                    src={avatarUrl}
                    className="w-20 h-20 object-cover border rounded-full"
                />

                <div className="grow ml-4">
                    <div className="flex items-center mb-4">
                        <h3>{username}</h3>

                        {/* 프로필 수정, 로그아웃 버튼 */}
                        {isMaster && (
                            <div className="flext ml-2">
                                <Link to="/accounts/edit" className="bg-gray-200 rounded-lg px-4 py-2 text-sm font-semibold">
                                    프로필 수정
                                </Link>

                                {signOutButton}
                            </div>
                        )}

                        {/* 팔로우/언팔로우 버튼 */}
                        {/* !isMaster가 true일 경우(isMaster가 아닐경우)에 folloButton과 unfollow버튼이 나옴, 본인 프로필이 아닌경우 나옴, isFollowing > 로그인 유저가 해당 유저를 팔로우했다면 true, 아니면 false(서버에서 처리했던거 기억나시죠 라고 쌤이 말함)*/}
                        {(!isMaster && !isFollowing) && followButton}
                        {(!isMaster && isFollowing) && unfollowButton}
                    </div>

                    {/* 카운팅 정보 */}
                    {countAboutProfile}
                </div>
            </div>

            {/* 이름 */}
            {name && (
                <h3 className="text-sm font-semibold my-2">
                    {name}
                </h3>
            )}

            {/* 자기소개 */}
            {bio && (
                <p className="text-sm font-semibold my-2 whitespace-pre-line">
                  {bio}
                </p>
            )}
        </div>
    )
};