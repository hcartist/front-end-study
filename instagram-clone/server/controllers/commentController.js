const Post = require('../models/Post');
const Comment = require('../models/Comment');

// 댓글 가져오기
exports.find = async (req, res, next) => {
    try {
        // 댓글을 가져올 게시물을 검색한다
        const post = await Post.findById(req.params.id);

        // 게시물이 존재하지 않는 경우
        if (!post) {
            const err = new Error("Post is not found");
            err.status = 404;
            throw err;
        }

        // 검색 조건: post 필드가 방금 검색한 게시물
        const where = { post: post._id };

        // 검색
        const comments = await Comment
        .find(where)
        .populate({
            path: 'user',
            select: 'username avatar avatarUrl'
        })
        .sort({ createdAt: 'desc' })

        const commentCount = await Comment.count(where);

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
            post: post._id,
            user: req.user._id // 댓글작성자: 로그인 유저
        })

        await comment.save();

        await comment.populate({
            path: 'user', // 작성자 정보
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

        // 요청한 유저가 댓글의 작성자인지 확인
        const isMaster = req.user._id.toString() === comment.user.toString();

        // 작성자가 아닌 경우
        if (!isMaster) {
            const err = new Error("Incorrect user");
            err.status = 400;
            throw err;
        }

        await comment.deleteOne();

        res.json({ comment });

    } catch (error) {
        next(error)
    }
};