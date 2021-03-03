const axios = require('axios');
const cheerio = require('cheerio');

let info = [];
axios.get('http://www.health.kr/searchDrug/result_drug.asp?drug_cd=2018100500001') // 프라미스로 반환
    .then((html) => { // 인수로 get 요청에 대한 response가 전달된다.
        //console.log(data); // html에서 직접 문자열을 검색해서 해당하는 부분을 찾을 수도 있겠지만, 복잡하고 어려운 작업이다.
        // 이를 훨씬 쉽게 해주는 모듈이 바로 cheerio이다. cheerio는 html을 로드하여 jQuery처럼 사용할 수 있게 해준다.
        const $ = cheerio.load(html.data);
        let $bodyList = $('div.tab2_cont').children('div.druginfo').text();
        info = $bodyList.split('\n');
        info.map(item => item.trim());
        console.log(info);
    });
// const getHtml = async () => {
//     try {
//         return await axios.get('https://terms.naver.com/entry.nhn?docId=2122647&cid=51000&categoryId=51000');
//     } catch (error) {
//         console.error(error);
//     }
// };

// getHtml()
//     .then(html => {
//         let ulList =[];
//         const $ = cheerio.load(html.data);
//         console.log($);
//     })