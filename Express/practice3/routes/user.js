var express = require('express');
var router = express.Router();
let user = require('../models/user2');
let user_db = require('../models/user');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
const crypto = require('../modules/encrypt');
const crypto2 = require('crypto');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//(1)기본 코드
/* router.post('/signup',async (req,res)=>{
  const {id, name, password, email} = req.body;
  user.push({id, name, password, email});
  res.status(200).send(user);
}); */

//(2) 회원가입
router.post('/signup', async (req, res) => {
  let { id, name, password, email } = req.body;
  if (!id || !name || !password || !email) {
      res.status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
  } 
   // 사용자 중복 아이디 없는지 확인 -3주차(DB사용 전)
  // if (user.filter(user => user.id == id).length > 0) {
  //     res.status(statusCode.BAD_REQUEST)
  //         .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
  //     return;
  // }

  //중복값 확인 - 4주차(DB이용)
  if(await user_db.checkUser(id) == true)
  {
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.ALREADY_ID));
    return;
  }
  // //salt 추가 및 패스워드 암호화 -3주차(DB사용 전)
  // const salt = crypto2.randomBytes(32).toString('hex');
  // password = await crypto(salt,password);
  // user.push({ id, name, password, email, salt });
  // res.status(statusCode.OK)
  //     .send(util.success(statusCode.OK, resMessage.CREATED_USER, {
  //         userId: id
  //     }));

    // 4주차 DB에 값 넣기(DB사용)
     const salt = crypto2.randomBytes(32).toString('hex');
     const idx = await user_db.signup(id, name, password, salt, email);
     if(idx == -1){
       return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR,
        resMessage.DB_ERROR));
     }
     res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.CREATED_USER,
      {userId : idx})); 
});

//(3)로그인 구현
router.post('/signin',async (req,res)=>{
  //request body에서 데이터 가져오기
  const {id, password} = req.body;
  //request data 확인 - 없다면 Null Value 반환
  if(!id || !password)
  {
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
    return;
  }
  // //존재하는 아이디인지 확인 - 없다면 No user 반환
  // var user_s = user.filter(user => user.id == id);
  // if(user_s.length == 0)
  // {
  //   res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_USER));
  //   return;
  // }
  // //비밀번호 확인
  // var hashed = await crypto(user_s[0].salt, password);
  // if(user_s[0].password !== hashed)
  // {
  //   res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
  //   return;
  // }

  //4주차
  //중복값 확인 - 4주차(DB이용)
    if(await user_db.checkUser(id) == false)
    {
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_USER));
      return;
    }
  //비밀번호 확인
  if(await user_db.signin(id,password) == false)
  {
     res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
     return;
  }
  //성공
  res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.LOGIN_SUCCESS,{userId: id}));
  return;
}); 

//(4) 프로필 조회 구현
router.get('/profile/:id', async(req,res)=>{
  const id = req.params.id;
  // if(user.filter(user => user.id == id) == 0){
  //   res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_USER));
  //   return;
  // }
  // res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.LOGIN_SUCCESS,{userId : id}));
  
  //id유효성 체크
  if(await user_db.checkUser(id) == false)
  {
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_USER));
    return;
  }
  var result = await user_db.getUserById(id);
    res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.LOGIN_SUCCESS,
      {userId : result.id, userName : result.name, userEmail : result.email}));
      console.log(result.name);
  return;
});
module.exports = router;
