const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log(`isAuthenticated()가 true이다!`);
        next();
    } else {
        res.status(403);
        return res.render('error', {
            errorMessage: '로그인 후에 사용 가능한 기능입니다.',
        });
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        console.log(`isAuthenticated()가 false이다!`);
        next();
    } else {
        // const message = encodeURIComponent('you have already logged in');
        // res.redirect(`/error=${message}`);
        res.status(403);
        return res.render('error', {
            errorMessage: '로그인 상태에서는 이용할 수 없습니다.',
        });
    }
};

exports.verifyToken = (req, res, next) => { 
    try {
        // 요청 헤더에 저장된 토큰 req.headers.authorization 을 사용한다.
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') { // 유효 기간 초과
            return res.status(419).json({
                code: 419,
                message: '토큰이 만료되었습니다.',
            });
        }
        return res.status(401).json({
            code: 401,
            message: '유효하지 않은 토큰입니다.',
        });
    }
};