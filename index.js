const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const pillRouter = require('./routes/pill');
const { sequelize } = require('./models');

const publicDir = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './templates/views'); // templates 안에 views가 있다.
const partialsPath = path.join(__dirname, './templates/partials');

const app = express();
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

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicDir)); // 익스프레스한테 스태틱파일이 여기에 있다고 알려줌
app.use('/pill', pillRouter);

app.get('/', (req, res) => {
    res.render('index', {
        제목: '의약품 정보 앱',
        이름: '김대준',
        이메일: 'ewr1029@naver.com',
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        제목: '의약품 정보 앱',
        이름: '도우미',
        이메일: 'ewr1029@daum.net',
        메시지: '의약품 정보에 관한 앱'
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        제목: '의약품 정보 앱',
        이름: '김대준',
        이메일: 'ewr1029@naver.com',
    });
});

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