const Post = require('../models/Post');
const Comment = require('../models/Comment');

// 댓글 가져오기
exports.find = async (req, res, next) => {
    try {
        // 댓글을 가져올 게시물을 먼저 검색한다
        const post = await Post.findById(req.params.id);

        // 게시물이 존재하지 않는 경우
        if (!post) {
            const err = new Error("Post is not found");
            err.status = 404;
            throw err;
        }

        // 검색 조건: post 필드가 방금 검색한 게시물, 댓글 도큐먼트에서 postfield가 방금 검색한 게시물의 아이디를 찾는다, models의 Comment.js의 post이다
        const where = { post: post._id };

        // 검색
        const comments = await Comment
        .find(where) // 게시물에 달린 댓글 모두 가져온다
        .populate({ // userfield 게시물 작성자에 대한 정보
            path: 'user',
            select: 'username avatar avatarUrl'
        })
        .sort({ createdAt: 'desc' }) // sort: 정렬

        const commentCount = await Comment.count(where); // 도큐먼트의 갯수파악, 더보기 버튼 등의 기능을 위해서

        res.json({ comments, commentCount });

    } catch (error) {
        next(error)
    }
};

// 댓글 생성
exports.create = async (req, res, next) => {
    try {
        // 댓글을 달 게시물을 검색한다
        const post = await Post.findById(req.params.id);

        // 게시물이 존재하지 않을 경우
        if (!post) {
            const err = new Error("Post is not found")
            err.status = 404;
            throw err;
        }

        // 댓글 생성
        const comment = new Comment({
            content: req.body.content,
            post: post._id, // 방금 검색한 게시물의 아이디
            user: req.user._id // 댓글작성자: 로그인 유저
        })

        await comment.save();

        await comment.populate({
            path: 'user', // 작성자 정보, 방금 생성한 comments도큐먼트에 컬렉션 조인 하고있음
            select: 'username avatar avatarUrl'
        })

        res.json({ comment });

    } catch (error) {
        next(error)
    }
};

// 댓글 삭제
exports.deleteOne = async (req, res, next) => {
    try {
        // 삭제할 댓글을 검색한다
        const comment = await Comment.findById(req.params.id);

        // 댓글이 존재하지 않는 경우
        if (!comment) {
            const err = new Error("Comment is not found")
            err.status = 404;
            throw err;
        }

        // 요청한 유저가 댓글의 작성자인지 확인, req.user._id: 로그인 유저/comment.user: 댓글 작성자, 문자열로 비교
        const isMaster = req.user._id.toString() === comment.user.toString();

        // 작성자가 아닌 경우
        if (!isMaster) {
            const err = new Error("Incorrect user");
            err.status = 400;
            throw err;
        }

        await comment.deleteOne(); // 댓글 삭제

        res.json({ comment }); // 방금 삭제한 도큐먼트 전송

    } catch (error) {
        next(error)
    }
};