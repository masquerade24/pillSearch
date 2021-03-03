const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
    passport.use(new kakaoStrategy({
        clientID: process.env.KAKAO_ID, // 카카오에서 발급해주는 아이디. 노출되면 안되므로 .env에 넣었다.
        callbackURL: '/auth/kakao/callback', // 카카오로부터 인증 결과를 받을 라우터 주소
    }), async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        try {
            const exUser = await User.findOne({
                where: { snsId: profile.id, provider: 'kakao' },
            });
            if (exUser) { // 기존에 카카오를 통해 가입한 유저가 있는지 조회한다.
                done(null, exUser); // 있다면 이미 회원가입 되어있으므로 전략 종료
            } else {
                const newUser = await User.create({
                    email: profile._json && profile._json.kakao_account_email,
                    name: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                });
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    });
};