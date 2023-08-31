const express = require('express')
const router = express.Router();
const usersRouter = require("./users");
const postsRouter = require("./posts");
const profilesRouter = require("./profiles");
const auth = require("../auth/auth");

/* INDEX */
router.get('/', (req, res) => {
  res.json({ message: "hello client" });
})

// 유저 라우터 - users인 요청주소가 있을 때 userRouter로 처리하겠다는 뜻
router.use('/users', usersRouter)

router.use('/posts', auth, postsRouter)
// 프로필 라우터
router.use('/profiles', auth, profilesRouter)

module.exports = router;

