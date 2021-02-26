const express = require('express');

const Pill = require('../models/pill');
const pillInfo = require('../utils/pillInfo');
const pillMixtureInfo = require('../utils/pillMixture');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const exPill = await Pill.findOne({
            where: {
                printFront: req.body.print_letter,
                // priintBack:,
                drugShape: req.body.shape,
                colorClass1: req.body.color,
                // colorClass2:,
            },
        })
        const pillInfoPromise = () => new Promise((resolve, reject) => {
            pillInfo(exPill.itemName, (error, { pill } = {}) => {
                if (error) reject(error);
                else {
                    resolve({
                        CLASS_NAME: pill["response"]["body"]["items"]["item"]["CLASS_NAME"]["_text"],
                        INGR_CODE: pill["response"]["body"]["items"]["item"]["INGR_CODE"]["_text"]
                    });
                }
            });
        });
        const pillMixtureInfoPromise = () => new Promise((resolve, reject) => {
            pillMixtureInfo(exPill.itemName, (error, { pillMixture } = {}) => {
                if (error) reject(error);
                else {
                    resolve({
                        PROHBT_CONTENT: pillMixture["response"]["body"]["items"]["item"]["PROHBT_CONTENT"]["_text"].replace(/\n/g, ''),
                        MIXTURE_ITEM_NAME: pillMixture["response"]["body"]["items"]["item"]["MIXTURE_ITEM_NAME"]["_text"],
                    });
                }
            });
        });
        let result = await Promise.all([pillInfoPromise(), pillMixtureInfoPromise()]);
        result = {
            pillInfo: result[0], // 용량주의
            pillMixtureInfo: result[1], // 병용금기
        }
        return res.render('pill', {
            제목: '의약품 정보',
            이름: '김대준',
            이메일: 'ewr1029@naver.com',
            // DB에서 품목명(itemName), entpName(업체명)을 조회한다.
            itemName: exPill.itemName,
            entpName: exPill.entpName,
            ingrCode: result["pillInfo"]["INGR_CODE"], // DUR성분코드
            className: result["pillInfo"]["CLASS_NAME"], // 약효분류
            prohbtContent: result["pillMixtureInfo"]["PROHBT_CONTENT"], // 부작용
            mixtureItemName: result["pillMixtureInfo"]["MIXTURE_ITEM_NAME"], // 병용금기품목명
        });
    } catch (error) {
        console.error(error);
        next(error)
    }
});

module.exports = router;

// router.post('/', async (req, res, next) => {
//     try {
//         let PROHBT_CONTENT = '';
//         let CLASS_NAME = '';
//         let INGR_CODE = '';

//         const exPill = await Pill.findOne({
//             where: {
//                 printFront: req.body.print_letter,
//                 // priintBack:,
//                 drugShape: req.body.shape,
//                 colorClass1: req.body.color,
//                 // colorClass2:,
//             },
//         })
//         pillMixtureInfo(exPill.itemName, (error, { pillMixture } = {}) => {
//             PROHBT_CONTENT = pillMixture["response"]["body"]["items"]["item"]["PROHBT_CONTENT"]["_text"].replace(/\n/g, '');
//         });
//         pillInfo(exPill.itemName, (error, { pill } = {}) => {
//             CLASS_NAME = pill["response"]["body"]["items"]["item"]["CLASS_NAME"]["_text"];
//             INGR_CODE = pill["response"]["body"]["items"]["item"]["INGR_CODE"]["_text"];
//         });
//         return res.render('pill', {
//             제목: '의약품 정보',
//             이름: '김대준',
//             이메일: 'ewr1029@naver.com',
//             // DB에서 품목명(itemName), entpName(업체명)을 조회한다.
//             itemName: exPill.itemName,
//             entpName: exPill.entpName,
//             // 'DUR품목정보.용량금기'의 오픈 API를 통해 가져온 정보
//             className: CLASS_NAME,
//             ingrCode: INGR_CODE,
//             prohbtContent: PROHBT_CONTENT,
//         });
//     } catch (error) {
//         console.error(error);
//         next(error)
//     }
// });