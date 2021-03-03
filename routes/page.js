const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    console.log('무~야~호');
    next();
});

router.get('/', (req, res, next) => {
    try {
        return res.render('index', {
            제목: '의약품 정보 앱',
            이름: '김대준',
            이메일: 'ewr1029@naver.com',
        });
    } catch(error) {
        console.log(error);
        return next(error);
    }
});
router.get('/help', isNotLoggedIn, (req, res, next) => {
    try {
        return res.render('help', {
            제목: '의약품 정보 앱',
            이름: '김대준',
            이메일: 'ewr1029@naver.com',
            메시지: '무엇을 도와드릴깝쇼'
        });
    } catch(error) {
        console.log(error);
        return next(error);
    }
});
router.get('/about', isLoggedIn, (req, res, next) => {
    try {
        return res.render('about', {
            제목: '의약품 정보 앱',
            이름: '김대준',
            이메일: 'ewr1029@naver.com',
        });
    } catch(error) {
        console.log(error);
        return next(error);
    }
});
module.exports = router;