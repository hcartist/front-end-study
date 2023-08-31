const JwtStrategy = require('passport-jwt').Strategy;
const EztractJwt = require('passport-jwt').ExtractJwt;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/User');
const passport = require('passport');
require('dotenv').config();

// 토큰 처리전략 생성에 필요한 옵션
const opts = {};

// 요청 헤더에서 토큰을 추출하는 것과 관련한 옵션
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// 토큰 해독에 필요한 키
opts.secretOrKey = process.env.SECRET;

// 토큰 처리전략 생성
const jwtStrategy = new JwtStrategy(opts, async (payload, done) => {
    try {
        // payload에 저장된 id를 가지고 유저를 검색한다
        const user = await User.findById(payload.sub);
        // User.findById(id): User 컬렉션에서 해당 id를 가진 유저를 검색한다

        // 인증 실패 
        if (!user) {
            return done(null, false);
        }
        // 인증 성공
        return done(null, user); // 상단의 JwtStrategy의 콜백, 인자의 user을 다음 미들웨어로 전달한다

    } catch (err) {
        return done(err, false)
    }
})

passport.use(jwtStrategy); // 토큰 처리전략 적용

module.exports = passport.authenticate("jwt", { session: false });