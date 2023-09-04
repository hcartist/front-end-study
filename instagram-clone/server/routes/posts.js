const express = require('express')
const router = express.Router();
const {
    feed,
    find,
    create,
    findOne,
    deleteOne,
    like,
    unlike
} = require("../controllers/postController");
const commentController = require('../controllers/commentController');
const upload = require("../utils/upload");

router.get('/feed', feed)
router.get('/', find)
router.post('/', upload.array('photos', 10), create) // upload.array는 파일 처리 미들웨어(10은 파일의 최대 갯수). 게시물이 만들어지기 전에 해당 미들웨어를 먼저 거친후 나온다. 해당 미들웨어 코드는 upload.js에 있다
router.get('/:id', findOne)
router.delete('/:id', deleteOne)
router.post('/:id/like', like)
router.delete('/:id/unlike', unlike)

// comment
router.get('/:id/comments', commentController.find)
router.post('/:id/comments', commentController.create)
router.delete('/comments/:id', commentController.deleteOne)

module.exports = router;