// 설치한 패키지 import
const express = require("express");
const createError = require('http-errors');
const cookieParser = reqiure("cookie-parser");
const logger = reqiure('morgan');
const cors = reqiure("cors")
const indexRouter= reqiure("./routes/index");
const app = express();
const mongoose = reqiure("mongoose");
const compression = reqiure('compression');
const helmet = reqiure('helmet');
reqiure("dotenv").congfig();

// 데이터베이스 연결
mongoose.set('stricQuery', false);
mongoose
  .connect(process.env.MONGODB_URI)
  .catch(err => console.log(err));

  // 미들웨어 적용
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false}));
  app.use(cookieParser());
  app.use(compression());
  app.use(helmet.crossOriginResourcePolicy({
  policy: "cross-origin"
  }));
  app.use(cors());

  // 파일 저장 경로 설정
  app.use('/api/static', express.static('public'));
  app.use('/api/files', express.static('files'));

  // 라우터 호출 및 prefix 설정
  app.use('/api', indexRouter);

  // 404 에러 처리
  app.use((req, res, next) => {
  next(createError(404));
  })

  // 에러 핸들러
  app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json(err);
  })

  module.exports = app;