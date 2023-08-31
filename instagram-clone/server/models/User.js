const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Post = require("./Post");

// 유저스키마
// 설정할 데이터의 제약 조건
const userSchema = new Schema({
    email: { type: String, minLegth: 5 },
    password: { type: String, minLegth: 5 },
    salt: { type: String },
    username: { type: String, minLegth: 3, required: true }, // required > 필수라는 뜻
    name: { type: String },
    avatar: { type: String, default: 'default.png' },
    bio: { type: String }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// 가상필드 추가(virtual field)
// 기존의 데이터를 가공하여 새로운 필드를 생성할 수 있다

// 1 아바타 URL
// 클라이언트가 아바타를 쉽게 찾을 수 있게 한다
userSchema.virtual('avatarUrl').get(function () {
    return process.env.FILE_URL + '/avatar/' + this.avatar
})

// 2 유저의 게시물 갯수 파악
userSchema.virtual('postCount', { // 컬렉션 조인(join)
    ref: 'Post', // Post 모델과 조인한다
    localField: '_id', // 기본키
    foreignField: 'user', // 외래키
    count: true
})

// 3 유저의 팔로워 숫자 파악
userSchema.virtual('followerCount', {
    ref: 'Following', // following 모델과 조인
    localField: '_id',
    foreignField: 'user',
    count: true
})

// 4 유저의 팔로잉 숫자 파악
userSchema.virtual('followingCount', {
    ref: 'Following', // following 모델과 조인
    localField: '_id',
    foreignField: 'user',
    count: true
})

// 5 해당 유저의 팔로잉 여부 파악
userSchema.virtual('isFollowing', {
    ref: 'Following', // following 모델과 조인
    localField: '_id',
    foreignField: 'following',
    justOne: true
})

// 오퍼레이션(Operation) - 모델의 데이터 처리 기능

// 1 비밀번호 암호화
userSchema.methods.setPassword = function (password) {
    this.salt = crypto // salt > 암호화에 사용되는 키
        .randomBytes(16).toString("hex");

    // 비밀번호 암호화
    this.password = crypto
        .pbkdf2Sync(password, this.salt, 310000, 32, "sha256")
        .toString("hex")
} // 위의 코드만 보았을때 pbkdf2Sync > 알고리즘, 위의 코드는 알고리즘을 구현한 함수, password는 유저가 직접 친 비밀번호, salt를 사용해서 암호화를 한다, 310000, 32는 암호화 블록의 크기나 알고리즘의 반복횟수, sha256는 알고리즘

// 2 비밀번호 검사
userSchema.methods.checkPassword = function (password) {
    // 로그인 시에 호출되는 오퍼레이션

    // 로그인 시에 입력한 비밀번호를 유저의 salt로 다시 암호화한다
    const hashedPassword = crypto
        .pbkdf2Sync(password, this.salt, 310000, 32, "sha256")
        .toString("hex")

    return this.password === hashedPassword;
}

// 3 로그인 토큰 생성생성
userSchema.methods.generateJWT = function () {
    const payload = { // 유저의 데이터 저장
        sub: this._id,
        username: this.username
    }
    const secret = process.env.SECRET; // 토큰 생성에 사용되는 키

    return jwt.sign(payload, secret);
}

module.exports = mongoose.model('User', userSchema);