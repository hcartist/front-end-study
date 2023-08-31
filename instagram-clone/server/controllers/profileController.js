const User = require("../models/User");
const Following = require("../models/Following");

// 프로필 목록
exports.find = async (req, res, next) => {
    try {
        // 검색 조건 where < 검색 조건을 저장할 객체
        const where = {}

        // 여러가지 조건으로 프로필 목록을 만든다
        // 특정 유저가 팔로우하는 프로필 목록
        if ("following" in req.query) {
            // 쿼리에 담긴 정보로 유저(특정 유저)를 검색한다
            const user = await User
                .findOne({ username: req.query.following }); // models에서 한개의 도큐먼트를 찾고 findOne의 인자는 검색 조건이 된다, username: req.query.following > username은 qurey로 전송된 following이라는 값

            // 유저가 존재하지 않을 경우
            if (!user) {
                const err = new Error("User is not found");
                err.status = 404;
                throw err;
            }

            // 팔로잉 컬렉션 검색
            const followingUsers = await Following
                .find({ user: user._id })

            // 도큐먼트에서 following필드만 추출한 데이터
            const followingIds = followingUsers
                .map(followingUser => followingUser.following); // models에서 following.js 부분에 followingSchema에서 user, following 중 following만 추출하는 것

            // 검색 조건을 추가한다
            where._id = followingIds;
        }

        // 특정 유저의 팔로워 리스트
        if ('followers' in req.query) {
            // 쿼리에 저장된 값으로 유저를 검색한다
            const user = await User
                .findOne({ username: req.query.followers });

            // 유저가 존재하지 않는 경우 404에러 처리
            if (!user) {
                const err = new Error("User is not found");
                err.status = 404;
                throw err;
            }

            // 팔로잉 컬렉션을 검색한다
            const followers = await Following
                .find({ following: user._id })

            const followerIds = followers.map(follower => follower.user);

            // 검색 조건을 추가한다
            where._id = followerIds;
        }

        // 특정 문자를 포함한 프로필 리스트
        if ('username' in req.query) {
            // 정규식(regular expression < 문자열 검색할 때)을 사용한다
            const patt = new RegExp(req.query.username, 'i');

            where.username = patt
        }

        // 프로필 필드
        const profileFields = 'username name avatar avatarUrl bio';

        // 검색 실행, 실제 데이터베이스에 query전송
        const profiles = await User // Model.find(검색조건, 필드)
            .find(where, profileFields) // profileFields > 바로 위에서 선언한 필드들만 컬렉션에서 추출하겠다는 뜻("username name avatar avatarUrl bio")
            .populate({ // 컬렉션 조인 실행, mongoose의 기능 중 하나, modles에서 user.js 55번째 줄에서 이미 isFollowing을 선언했음(user.js에서 선언 후, profilesController에서 실행하는 구조)
                path: 'isFollowing',
                match: { user: req.user._id }
            })

        // 프로필 갯수를 구한다
        const profileCount = await User.count(where);

        res.json({ profiles, profileCount });

    } catch (error) {
        next(error);
    }
};

// 프로필 상세보기
exports.findOne = async (req, res, next) => {
    try {
        // 프로필 필드
        const profileFields = 'username name avatar avatarUrl bio';

        // 프로필 검색
        const profile = await User
            .findOne({ username: req.params.username }, profileFields) // findOne > 하나의 도큐먼트를 찾고 있다, 인자 > 검색 조건(클라이언트가 파라미터로 전송한 유저네임을 가지고 검색하고 있다)
            .populate('postCount') // 컬렉션 조인 실행
            .populate('followerCount')
            .populate('followingCount')
            .populate({
                path: 'isFollowing',
                match: { user: req.user._id }
            })

        // 프로필이 존재하지 않은 경우
        if (!profile) {
            const err = new Error("profile is not found");
            err.status = 404;
            throw err;
        }

        res.json({ profile }); // 검색한 profile을 클라이언트에게 전송

    } catch (error) {
        next(error)
    }
};

// 팔로우
exports.follow = async (req, res, next) => {
    try {
        // 프로필 필드
        const profileFields = 'username name avatar avatarUrl bio';

        // 파라미터로 전달된 유저이름으로 유저를 검색한다
        const profile = await User
            .findOne({ username: req.params.username }, profileFields)
        // params(파라미터)나 query는 클라이언트가 서버에 전송하는 데이터, findOne(models findOne에서 조건에 해당하는 한개의 도큐먼트를 검색한다)

        // 프로필이 존재하지 않을 경우
        if (!profile) {
            const err = new Error('Profile is not found')
            err.status = 404; // 클라이언트가 요청한 리소스를 서버가 가지고 있지 않을 때 404처리
            throw err;
        }

        // req.user과 req.params.username 2개를 비교하고 있다
        // req.user: 토큰 기반으로 검색한 유저(로그인 유저, bunny로 로그인했으므로 bunny이다) / req.params.username: 로그인 유저가 팔로우를 요청한 유저
        // 두 유저가 같다 = 본인이 본인을 팔로우한 상황, 즉 에러 처리한다
        if (req.user.username === req.params.username) {
            const err = new Error('Cannot follow yourself')
            err.status = 400; // bad request 나쁜 에러
            throw err;
        } // 위의 상황이 클라이언트에서 처리되므로 나올수 없는 상황, 하지만 서버에서는 이런 상황까지 가정해두어야 한다(논리적으로는 가능한 요청이라서)

        // 이미 팔로우 상태인지 확인한다
        const isFollowing = await Following // follow상태인지 확인하기 위해 following컬렉션을 검색하고 있다
            .findOne({ user: req.user._id, following: profile._id }); // req.user._id(유저)가 profile._id(방금 검색한 프로필)인 도큐먼트를 검색하고 있다(특정 유저가 어떤 프로필을 팔로우 중인지 / 유저가 누구를 팔로잉하고있는지 알기 위해서 user가 해당유저이고, 팔로잉이 아무개(대상유저) 인것을 찾으면 됨)

        // 팔로우 상태가 아닌 경우
        if (!isFollowing) {
            const following = new Following({ // 팔로우 처리를 한다 (해당유저가 대상유저를 팔로잉하는 도큐먼트를 만든다  참고 > + user: 형우 following: 진태민)
                user: req.user._id,
                following: profile._id
            }) // 새 도큐먼트를 만든 후

            await following.save(); // 저장한다
        }

        // 서버의 응답
        res.json({ profile }) // 방금 팔로우한 프로필을 응답해준다
        
    } catch (error) {
        next(error)
    }
};

// 팔로우 취소
exports.unfollow = async (req, res, next) => {
    try {
        const profileFields = 'username name avatar avatarUrl bio';

        // 팔로우를 취소할 프로필을 검색한다, 클라이언트가 파라미터로 취소할 유저네임을 전송하고 있음
        const profile = await User
            .findOne({ username: req.params.username }, profileFields)

        // 프로필이 존재하지 않은 경우
        if (!profile) {
            const err = new Error('Profile is not found')
            err.status = 404;
            throw err;
        }

        // 현재 프로필 유저를 팔로우 중인지 확인
        const isFollowing = await Following
            .findOne({ user: req.user._id, following: profile._id });

        // 팔로우 중이 맞다면 팔로우를 취소한다
        if (isFollowing) {
            // deletOne: 한개의 도큐먼트를 삭제한다
            await isFollowing.deleteOne();
        }

        res.json({ profile });

    } catch (error) {
        next(error)
    }
};