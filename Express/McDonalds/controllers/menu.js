const UserMenu = require('../models/menu');
const UserAllergy = require('../models/allergy');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');

function rand_choice(min, max){
    var ranNum = Math.floor(Math.random()*(max-min+1))+min;
    return ranNum;
}
var val_title = ["뭔가 조금 배고픈데.. 맥날 고?","오늘은 맥도날드 먹는날^_^","맥날 맥날먹고싶다구~~"];
var val_text1 = ["참깨빵 위에 순쇠고기 패티 두 장 특별한 소스, 양상추, 치즈, 피클 양파까지~",
                 "그거들었어? 맥도날드 메뉴가 전면 개편됬대!! 얼른먹으러가자~~~~~~",
                "저는 개인적으로 1955버거를 제일 좋아합니다ㅎㅎ"];
var today = new Date();
var month = today.getMonth();
var val_text2 = `${month}월 맥날 소식!!`;
const menu = {
    READ : async (req,res)=>{
        const menu = req.params.menu;
        const order = req.params.order;
        // menu, order 유효값 검증
        if((menu <0 || menu >4) || (order <0 || order >1))
        {
            req.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.OUT_OF_VALUE));
            return ;
        }
        const result = await UserMenu.READ_MENU(menu, order);

        for(var a in result)
        {
            var arr = [];
            // allergy정보 가져와서 JSON에 추가
            const result2 = await UserAllergy.READ(result[a].menuIdx);
            for(var b in result2)
            {
                arr.push(result2[b]);
            }
            result[a].allergy = arr;
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.MENU_READ_SUCCESS,result));
    },
    HOME : async (req, res)=>{
        var banner1 = await UserMenu.READ_BANNER1();
        //var val_title="val_title1";
        var data =
        {
            "title1" : val_title[await rand_choice(0,2)], 
            "title2" : "지금 바로 할인쿠폰",
            "banner1" :banner1,
            "text1" : val_text1[await rand_choice(0,2)], 
            "text2" : "오늘의 메뉴는 무엇인가요?",
            "img" :
            {
                "beef" : "https://postfiles.pstatic.net/MjAyMDA1MzFfMTA3/MDAxNTkwOTE2OTA5ODI4.Qwz-HIfIvPvmKxIdD_ViJ3kKXvdWdCr6yq2TWgLnGfkg.FzN_BckRafgqOU2T9FDelrEDWrvhqRdfhsIlVPcJPMwg.PNG.wjddnr972/beef.png?type=w773",
                "chicken" : "https://postfiles.pstatic.net/MjAyMDA1MzFfMTY3/MDAxNTkwOTE2OTE0NzI5.pf-mai_ersM0NWMz72r8IsS1W6OUkenww5EqPk2y1h0g.dhBiRylD1U-3fFQ6w13WDDkvlxxVs7aVjLUDnrpSeA0g.PNG.wjddnr972/chicken.png?type=w773",
                "special" : "https://postfiles.pstatic.net/MjAyMDA1MzFfMjY1/MDAxNTkwOTE2OTQ1MTE2.kZCv786iVS73NPhqNRU-j7Glk3VsROaqz2-TnRtWQjgg.aObdtpNJNZJufjzeE9BjxpVi63orTEdF2M180Ytd8E4g.PNG.wjddnr972/special.png?type=w773"
            },
            "text3" : val_text2, 
            "banner2" :
            [
                {
                    "text" : "허니 크림치즈 상하이버거 출시!",
                    "img" : "https://www.mcdonalds.co.kr/upload/main/banner/1587529093913.png"
                },
                {
                    "text" : "바나나 오레오 맥플러리 & 바나나콘 출시!",
                    "img" : "https://www.mcdonalds.co.kr/upload/main/banner/1590473693572.png"
                },
                {
                    "text" : "한라봉 칠러 출시!",
                    "img" : "https://www.mcdonalds.co.kr/upload/main/banner/1590474205585.png"
                } 
            ],
            "text4" : "더 나은 맥도날드가 되기위해 언제나 여러분의 목소리에 귀를 기울입니다",
            "text5" : "고객의 소리",
            "myvoice_img" : "https://postfiles.pstatic.net/MjAyMDA1MzFfMjUw/MDAxNTkwOTE2OTM5Njc3.r6M6YbHrUD8EFeOD3QsLZ-4zg6yLbCJEPzp4iQMjnI8g.8nbPYT7emEXTWdZUYtn1rx-izBOJax1DkglrjMSallEg.PNG.wjddnr972/myvoice.png?type=w773",
            "qna_img" : "https://postfiles.pstatic.net/MjAyMDA1MzFfMjAw/MDAxNTkwOTE2OTQyNjYx.teEiWjpfUJdihn4XQIDUQWnRgjWJXqviesKIz5izn80g.-s1T4U6QUWNZZHQBoiN9xu7PVm93ZBWpBSvwyQMHSiQg.PNG.wjddnr972/qna.png?type=w773"
          }
        res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.HOME_READ_SUCCESS,data));
    }
}
module.exports = menu;