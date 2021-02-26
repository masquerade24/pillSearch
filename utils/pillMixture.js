const convert = require('xml-js');
const request = require('request');
const serviceKey0 = require('../keys/key');

const pillMixtureInfo = (itemName, callback) => {
    const url = 'http://apis.data.go.kr/1470000/DURPrdlstInfoService/getUsjntTabooInfoList?';
    const ServiceKey = serviceKey0.publicPortalKey;

    var queryParams = encodeURIComponent('serviceKey') + '=' + ServiceKey;
    queryParams += '&' + encodeURIComponent('typeName') + '=' + encodeURIComponent('병용금기');
    queryParams += '&' + encodeURIComponent('itemName') + '=' + encodeURIComponent(itemName);
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('_returnType') + '=' + encodeURIComponent('json');

    const fullurl = url + queryParams;

    request(fullurl, (error, body) => { // body는 url의 데이터. 여기서는 XML 형식으로 제공되었다.
        const result = body;
        // result의 body항목만 따로 json 형식으로 바꾸고 그것을 다시 파싱해준다
        const hello = convert.xml2json(result.body, { compact: true, spaces: 2 });
        const pillMixture = JSON.parse(hello); // 파싱(parse)한 데이터는 한줄로 쭈우우우욱 나열된다.
        callback(null, {
            pillMixture: pillMixture,
        })
    });
};

module.exports = pillMixtureInfo;