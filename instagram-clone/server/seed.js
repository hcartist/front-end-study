// seed.js는 app.js와 상관없이 별도로 관리되는 파일
// 샘플 데이터 생성

// 파일 호출시에 유저가 전달하는 인자(arguments)
const userArgs = process.argv.slice(2);
const mongoose = require("mongoose");
const User = require('./models/User');
const Post = require('./models/Post');

// 올바른 몽고DB 주소가 아닌 경우
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL.');
    return; // 파일 호출 중지
}


// 샘플데이터를 생성하는 함수
seedDatabase();

async function seedDatabase() { // seedDatabase함수 정의
    try {
        // 데이터베이스 연결
        const MONGODB_URL = userArgs[0];

        await mongoose.connect(MONGODB_URL)

        // 생성할 유저 목록
        const users = [
	{
            username: 'michelangelo',
            name: 'Michelangelo',
            avatar: 'michelangelo.jpg',
            bio: '나는 대리석 안에서 천사를 보았고 그를 자유롭게 해줄 때까지 조각했다'
        },
        {
            username: 'jobs',
            name: 'Steve Jobs',
            avatar: 'jobs.jpeg',
            bio: '이야 아이폰 많이 좋아졌다'
        },
        {
            username: 'dog',
            name: 'Mr.Loyal',
            avatar: 'dog.jpeg',
            bio: '멍'
        }
        ]

        // 유저 데이터 생성
        for (let i = 0; i < users.length; i++) {
            const user = new User(); // modles 생성자 호출

            user.username = users[i].username;
            user.name = users[i].name;
            user.avatar = users[i].avatar;
            user.bio = users[i].bio;

            await user.save(); // 데이터 저장

            console.log(user);
        }

        // 생성할 게시물 목록
        const posts = [
            {
                photos: ["david.jpg"],
                caption: "David, Galleria dell'Accademia, Florence"
            },
            {
                photos: ["pieta_1.jpg", "pieta_2.jpg"],
                caption: "Pieta, St. Peter's Basilica, Rome"
            },
            {
                photos: ["bacchus.png"],
                caption: "Bacchus, Museo Nazionale del Bargello, Florence"
            },
            {
                photos: ["angel.jpg"],
                caption: "Angel, Basilica of San Domenico, Bologna"
            }
        ]

        // 게시물 생성
        const user = await User.findOne({ username: 'michelangelo' }); // 미켈란젤로 유저검색

        for (let i = 0; i < posts.length; i++) {
            const post = new Post();

            post.photos = posts[i].photos
            post.caption = posts[i].caption
            post.user = user._id; // 미켈란젤로의 게시물, 게시물의 작성자

            await post.save();

            console.log(post);
        }

    } catch (error) {
        console.error(error)
    } finally {
        mongoose.connection.close(); // 데이터베이스 연결 종료
    } // finally > 에러발생과 상관없이 마지막에 항상 시행되는 함수
};
