const express = require('express')
const router = express.Router();

const {
    find,
    findOne,
    follow,
    unfollow
} = require("../controllers/profileController"); // route와 controller가 연결된 모습

router.get('/', find);
router.get('/:username', findOne) // '/:어쩌구' < 요 부분이 파라미터, / 뒤에 입력된 값을 파라미터로 취급하겠다는 의미
router.post('/:username/follow', follow)
router.delete('/:username/unfollow', unfollow)

module.exports = router;