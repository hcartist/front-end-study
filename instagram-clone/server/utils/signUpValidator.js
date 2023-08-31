const User = require('../models/User'); // 회원과 관련있으므로 유저 모델 연결
const { body } = require('express-validator');

// 미들웨어에 함수를 선언하고 export한 것
module.exports = async (req, res, next) => {
    try {
        // 이메일 유효성 검사
        const emailResult = await body('email') // body > express-vaildator에서 가져온 객체
            .isEmail() // 올바른 이메일인지 검사 (express validator의 메서드)
            .custom(async (email) => { // 중복 검사
                // 이메일로 유저를 검색한다
                const user = await User.findOne({ email });
                // Model.fineOne(조건): 조건에 일치하는 도큐먼트 한개를 찾는다

                if (user) { // 유저가 존재할 경우(이메일이 사용중인 경우)
                    throw new Error('E-mail is already in use');
                }
            })
            .run(req)

            // 이메일 유효성 검사에 실패한 경우
            if (!emailResult.isEmpty()) {
                const err = new Error('E-mail validation failed');
                // status: 서버의 응답코드 (상태코드)
                err.status = 400; // 400 BadRequest
                throw err; // catch블록에 에러를 던진다
            }


        // 유저 네임 검사
        const usernameResult = await body('username')
        .trim() // 문자열 앞뒤 공간 제거
        .isLength({ min: 5 }) // 최소 5글자 이상
        .isAlphanumeric() // 알파벳이나 숫자만 가능
        .custom(async (username) => { // 중복검사
            const user = await User.findOne({ username });

            if (user) {
                throw new Error('Username is already in use');
            }
        })
        .run(req) // express vaildator의 규칙


        // 유저네임 유효성 검사 실패
        if (!usernameResult.isEmpty()) {
            const err = new Error('Username validation failed');
            err.status = 400;
            throw err;
        }


        // 비밀번호 유효성 검사
        const passwordError = await body('password')
        .trim()
        .isLength({ min: 5 })
        .run(req) // express-vaildator의 규칙

        if (!passwordError.isEmpty()) {
            const err = new Error('password validation failed');
            err.status = 400;
            throw err;
        }


        // 다음 미들웨어로 이동한다
        next();

    } catch (error) {
        next(error) // 에러 핸들러에게 에러를 전달한다
    }
}