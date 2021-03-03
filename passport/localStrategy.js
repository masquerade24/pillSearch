const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        // session: true,
    }, async (email, password, done) => {
        try {
            const exUser = await User.findOne({ where: { email } }); // User 릴레이션에서 일치하는 email이 있는지 찾는다.
            if (exUser) { // 일치하는 email이 있다면 비밀번호를 비교한다.
                const result = await bcrypt.compare(password, exUser.password);
                if (result) { // 비밀번호까지 일치한다면 done 함수의 2번 인수로 사용자 정보를 넣어서 보낸다(콜백).
                    done(null, exUser);
                } else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                }
            } else {
                done(null, false, { message: '가입되지 않은 회원입니다.' });
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};