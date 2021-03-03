const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const passport = require('passport')
const dotenv = require('dotenv');
const path = require('path');
const hbs = require('hbs');

dotenv.config();
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const pillRouter = require('./routes/pill');
const { sequelize } = require('./models');
const passportConfig = require('./passport/index');

const publicDir = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './templates/views'); // templates 안에 views가 있다.
const partialsPath = path.join(__dirname, './templates/partials');

const app = express();
passportConfig();
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'hbs');
app.set('views', viewsPath);
sequelize.sync({ force: false })
.then(() => {
    console.log('DB와 연동 성공');
})
.catch((error) => {
    console.error(error);
});
hbs.registerPartials(partialsPath);

app.use(morgan('dev'));
app.use(express.static(publicDir)); // 익스프레스한테 스태틱파일이 여기에 있다고 알려줌
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true, // 실제 서비스 배포할 때는 false로
        secure: false, // 실제 서비스 배포할 때는 true로
    }
}))
app.use(passport.initialize()); // passport.initialize(): req 객체에 passport 설정을 심는다.
app.use(passport.session()); // passport.session(): req.session 객체에 passport 설정을 심는다.

app.use('/', pageRouter);
app.use('/pill', pillRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});


app.listen(app.get('port'), () => {
    console.log(`Server is up and running at port ${app.get('port')}`);
});