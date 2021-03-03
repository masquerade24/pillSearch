const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');
// const Prescription = require('../models/prescription');
// const Medication = require('../models/medication');

module.exports = () => {
	// serializeUser는 사용자 정보 객체를 세션에 id로 저장하는 것 { passport: { user: 1} }
	passport.serializeUser((user, done) => { // 로그인 시 실행된다.
		// req.session 객체에 어떤 데이터를 저장할 지 결정하는 메서드이다. 매개변수로 user를 받고나서
		// done함수에 2번 인수로 user.id를 준다. 2번 인수는 저장하고 싶은 데이터이다.
		console.log('serializeUser 실행!', user.id);
		done(null, user.id);
	});
	// deserializeUser는 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러온다.
	passport.deserializeUser((id, done) => { // 매 요청 시 실행
		console.log('deserializeUser 실행!', id);
		User.findOne({
			where: { id },
			// include: [{
			// 	model: Prescription,
			// }, {
			// 	model: Medication,
			// }]
		})
			.then(user => { done(null, user) })
			.catch(err => { done(err); });
	});

	local();
	//  kakao();
};