const express = require('express')
// 라우터
const router = express.Router();
// 유저 컨트롤러
const {
  create,
  login,
  update
} = require("../controllers/userController");
// 회원가입 폼 유효성 검사 미들웨어
const signUpValidator = require('../utils/signUpValidator');
// 로그인 데이터 유효성 검사 미들웨어
const loginValidator = require('../utils/loginValidator');
// 파일 처리 미들웨어
const upload = require("../utils/upload");
// 인증처리 미들웨어
const auth = require("../auth/auth");

// 라우팅

/*
HTTP 요청 메서드

1 GET
데이터 읽기 요청
2 POST
데이터 생성 요청
3 PUT
데이터 수정 요청
4 DELETE
데이터 삭제 요청
*/

// router.HttpRequestMethod(요청주소, 미들웨어, 컨트롤러)
router.post('/', signUpValidator, create); // signUpValidator > 유저 생성 전 유효성 검사 후, create 로직이 호출되며 유저가 생성되는 순서)
router.post('/login', loginValidator, login); // /login > 요청 주소가 login일때, loginValidator < 로그인 유저 데이터 유효성 검사 후 login 진행
router.put('/user', auth, upload.single('avatar'), update); // /user > 요청주소가 user일때, auth > 인증처리 후, upload.single('avatar') > 파일 처리 미들웨어로 이동, 그후 업데이트 진행 (위 코드에선 미들웨어가 2개)

module.exports = router;