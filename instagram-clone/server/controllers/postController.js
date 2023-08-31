const User = require('../models/User');
const Following = require('../models/Following');
const Post = require('../models/Post');
const Likes = require('../models/Likes');

// 피드 가져오기, 본인이 팔로우하는 유저와 본인 게시물 볼 수 있음
exports.feed = async (req, res, next) => {
    try {
        // 팔로잉 컬렉션 검색
        const followingUsers = await Following.find({ user: req.user._id });
        const followingIds = followingUsers
            .map(followingUser => followingUser.following);

        // 검색 조건: 로그인 유저가 팔로우하는 유저와 본인의 게시물만 검색한다
        const where = { user: [...followingIds, req.user._id] }
        // limit과 skip
        const limit = req.query.limit || 5;
        const skip = req.query.skip || 0;

        // 조건에 맞는 도큐먼트를 검색한다
        const posts = await Post.find(where)
            .populate({ // 컬렉션 조인하는 이유: 기존 컬렉션들을 조인함으로써 데이터가 더 풍부해짐
                path: 'user', // 게시물 작성자에 대한 정보, path > field라고 보면됨
                select: 'username avatar avatarUrl' // select > 추가할 필드
            })
            .populate('commentCount') // 댓글의 갯수
            .populate({
                path: 'liked', // 좋아요 여부
                match: { user: req.user._id }
            })
            .sort({ createAt: 'desc' }) // 정렬(sort) > 인자는 정렬의 조건(createAt: 생성일 기준으로 desc: 내림차순 된다 - 가장 최신 게시물이 위로 올라오게끔)
            .skip(skip)
            .limit(limit)

        // 조건에 해당하는 도큐먼트 갯수
        const postCount = await Post.count(where);

        res.json({ posts, postCount })

    } catch (error) {
        next(error)
    }
};

// 게시물 리스트 가져오기
exports.find = async (req, res, next) => {
    try {
        // 검색조건
        const where = {};

        // 클라이언트가 특정 유저의 게시물만 요청한 경우 (타임라인)
        if ('username' in req.query) {
            // 전송받은 유저이름으로 유저를 검색한다
            const user = await User.findOne({ username: req.query.username });

            // 유저가 존재하지 않을 경우
            if (!user) {
                const err = new Error("User is not found")
                err.status = 404;
                throw err;
            }

            // 조건을 추가한다
            where.user = user._id;
        }

        // 검색
        const posts = await Post
            .find(where)
            .populate('commentCount') // 댓글 갯수 파악
            .sort({ createAt: 'desc' }) // 생성일 기준 내림차순 정렬

        const postCount = await Post.count(where); // 게시물 갯수

        res.json({ posts, postCount });

    } catch (error) {
        next(error)
    }
};

// 게시물 한개 가져오기
exports.findOne = async (req, res, next) => {
    try {
        // 파라미터 아이디로 게시물으 검색한다
        const post = await Post.findById(req.params.id)
            .populate({
                path: 'user', // 작성자 정보
                select: 'username avatar avatarUrl'
            })
            .populate('commentCount') // 댓글 갯수
            .populate({ // 좋아요 여부
                path: 'liked',
                match: { user: req.user._id }
            })

        // 게시물이 존재하지 않을 경우
        if (!post) {
            const err = new Error("Post is not found");
            err.status = 404;
            throw err;
        }

        res.json({ post });

    } catch (error) {
        next(error)
    }
};

// 게시물 생성
exports.create = async (req, res, next) => {
    try {
        // req.files: 클라이언트가 전송한 파일
        const files = req.files;

        // 파일이 없을 경우(사진)
        if (!files || files.length < 1) {
            const err = new Error('File is required');
            err.status = 400;
            throw err;
        }

        // 파일 이름 추출
        const photoNames = files.map(file => file.filename);

        // 도큐먼트 생성
        const post = new Post({
            photos: photoNames, // 파일 이름 저장(바로 위에서 추출한)
            caption: req.body.caption, // 사진에 대한 설명
            user: req.user._id // 게시물 작성자
        });

        await post.save();

        res.json({ post })

    } catch (error) {
        next(error)
    }
};

// 게시물 삭제
exports.deleteOne = async (req, res, next) => {
    try {
        // 삭제할 게시물을 검색한다
        const post = await Post.findById(req.params.id);

        // 게시물이 존재하지 않을 경우
        if (!post) {
            const err = new Error("Post is not found")
            err.status = 404;
            throw err;
        }

        // 본인의 게시물인지 확인한다
        const isMaster = req.user._id.toString() === post.user.toString(); //req.user._id: 로그인유저의 아이디 / post.user: 게시한 유저의 아이디 즉, 본인인지 비교 및 확인

        // 본인의 게시물이 아닌 경우
        if (!isMaster) {
            const err = new Error("Incorrect user");
            err.status = 400;
            throw err;
        }

        await post.deleteOne(); // 도큐먼트 한개를 삭제한다

        res.json({ post });

    } catch (error) {
        next(error)
    }
};

// 좋아요
exports.like = async (req, res, next) => {
    try {
        // 좋아요 할 게시물을 검색한다
        const post = await Post.findById(req.params.id)

        // 게시물이 존재하지 않을 경우
        if (!post) {
            const err = new Error("Post is not found");
            err.status = 404;
            throw err;
        }

        // 이미 좋아요한 게시물인지 확인
        const liked = await Likes
            .findOne({ user: req.user._id, post: post._id });

        // 처음 좋아요하는 게시물일 경우
        if (!liked) {
            // 도큐먼트 생성
            const likes = new Likes({
                user: req.user._id,
                post: post._id
            })

            await likes.save();

            // 게시물의 좋아요를 1 증가시키다
            post.likesCount++;
            // 변경사항 저장
            await post.save();
        }

        res.json({ post })

    } catch (error) {
        next(error)
    }
};

// 좋아요 취소
exports.unlike = async (req, res, next) => {
    try {
        // 좋아요를 취소할 게시물 검색
        const post = await Post.findById(req.params.id)

        // 게시물이 존재하지 않을 경우 404 에러 처리
        if (!post) {
            const err = new Error("Post is not found");
            err.status = 404;
            throw err;
        }

        // 좋아요한 게시물인지 확인
        const liked = await Likes
            .findOne({ user: req.user._id, post: post._id });

            // 좋아요한 게시물이 맞는 경우 취소 처리
        if (liked) {
            await liked.deleteOne();

            // 게시물의 좋아요갯수를 1 감소시킨다
            post.likesCount--;
            // 변경사항 저장
            await post.save();
        }

        res.json({ post });

    } catch (error) {
        next(error)
    }
};