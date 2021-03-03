const convert = require('xml-js');
const request = require('request');
const key = require('../keys/key');

const drugInfo =  (itemName, callback) => {
    const url = 'http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList?';

    const ServiceKey = key.publicPortalKey;

    var queryParams = encodeURIComponent('serviceKey') + '=' + ServiceKey;
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('itemName') + '=' + encodeURIComponent(itemName);
    queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('json');

    const fullurl = url + queryParams;

    request(fullurl, (error, body) => {
        console.log(body);
        const drug = JSON.parse(body); // 파싱(parse)한 데이터는 한줄로 쭈우우우욱 나열된다.
        console.log(drug);
        callback(null, { drug }) // undefined는 에러
    });
};

module.exports = drugInfo;