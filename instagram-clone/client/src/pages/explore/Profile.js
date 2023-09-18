import { Link } from "react-router-dom"

export default function Profile({ 
  id, 
  username, 
  avatarUrl, 
  name, 
  isFollowing 
}) {

  // 각각의 프로필을 나타내는 컴포넌트
  return (
    <li className="flex items-center justify-between my-2">
      <Link
        to={`/profiles/${username}`}
        className="flex items-center"
      >
        <img
          src={avatarUrl}
          className="w-10 h-10 object-cover rounded-full"
        />
        <div className="ml-2">
          <span className="block font-semibold">
            {username}
          </span>
          <span className="block text-gray-400 text-sm">
            {name}
          </span>
        </div>
      </Link>

      {/* 팔로잉중일 경우 오른쪽에 팔로잉 버튼이 뜬다 */}
      {isFollowing && (
        <div className="ml-2 text-sm text-blue-500 font-semibold">
         팔로잉
        </div>
      )}
    </li>
  )
}