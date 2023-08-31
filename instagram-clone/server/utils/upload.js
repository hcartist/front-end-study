// 파일 처리 미들웨어

const multer = require('multer');
const path = require('path');

// 처리 옵션 구성
const opts = {}

// 파일의 저장경로와 파일 이름 생성 옵션
opts.storage = multer.diskStorage({
    // destination: 저장 경로 설정
    destination: (req, file, cb) => {
        // 루트 경로의 files 폴더에 저장한다, __dirname: 현재 파일의 경로 리턴 변수
        cb(null, `${__dirname}/../files/${file.fieldname}/`);
    },

    // 파일 이름 생성
    filename: (req, file, cb) => {
        // 파일의 확장자(extension)
        const extname = path.extname(file.originalname);
        // 파일의 고유한 이름을 생성한다, 아주 많은 파일들이 폴더에 저장될 것이므로 여러가지 함수를 통해 이름을 복잡하게 만들고 있다
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
	
        cb(null, uniqueSuffix + extname); // 기존의 확장자를 유지시킨다
    }
})

// 파일 필터 옵션
opts.fileFilter = (req, file, cb) => {
    const extname = path.extname(file.originalname);
    let isError = false;

    switch (extname) { // 이미지 파일만 업로드 가능
        case '.jpg':
        case '.jpeg':
        case '.png':
            break;
        default:
            isError = true;
    }

    if (isError) { // 파일의 타입이 잘못된 경우
        const err = new TypeError('Unacceptable type of file');
        err.status = 400;
        return cb(err);
    }

    cb(null, true);
}


// 파일 제한 옵션
opts.limits = { fileSize: 1e7 } // 파일 사이즈 제한 (10MB)

module.exports = multer(opts)