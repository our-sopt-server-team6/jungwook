var express = require('express');
var router = express.Router();

let post = require('../models/post');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');

//모든 게시글 조회
router.get('/', async function(req, res, next) {
    // var data = [];
    // for(item in post){
    //     data.push(post[item]);
    // }
    // res.status(statusCode.OK).send(post);
    // return;    

    var data = [];
    var result = await post.postSearchAll();
    res.status(statusCode.OK).send(result);
    return;    
});

//게시글 고유 id 값을 조회
router.get('/:id', async function(req,res,next){
     const id = req.params.id;
    //  if(!id || post.filter(post=>post.id == id).length == 0){
    //      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_ID));
    //      return;
    //  }
    // var data = post.filter(post=>post.id == id);
    // res.status(statusCode.OK).send(data[0]);
    // return;

    //특정 post id가 존재하는지 유효성 검사
    if(await post.checkPost(id) == false)
    {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_ID));
        return;
    }
    res.status(statusCode.OK).send(await post.postSearch(id));
    return;
})

//게시글 생성
router.post('/',async function(req,res,next){
    const {title, description} = req.body;
    //const id = post.length+1;
    if(!title || !description){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_POST));
        return;
    }
    //post.push({id,title,description});
    var result = await post.postCreate(title,description);
    res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.CREATED_POST,{post_id : 
    result}));
})

//게시글 고유 id값을 가진 게시글을 수정
router.put('/:id',async function(req, res, next){
    const id = req.params.id;
    const {update_title, update_description} = req.body;
    // if(!id || post.filter(post => post.id == id).length == 0){
    //     res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_ID));
    //     return;
    // }
    if(!update_title || !update_description){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.OUT_OF_VALUE));
        return;
    }

    //id 유효성 검사
    if(await post.checkPost(id) == false)
    {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_ID));
        return;
    }

    // for(item in post){
    //     if(post[item].id == id){
    //         post[item].title = update_title;
    //         post[item].description = update_description;
    //         //console.log(post[item]);
    //         post.splice(id-1,1,post[item]); //replace 역할
    //         res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.UPDATE_SUCCESS,{post_id : id}));
    //         return;
    //     }
    // }

    //DB 수정하기
    var result = post.postUpdate(id,update_title,update_description);
    res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.UPDATE_SUCCESS,{postId : result}));
    return;
})

//게시글 고유 id값을 가진 게시글을 삭제
router.delete('/:id',async function(req, res, next){
    const id = req.params.id;
    // if(!id || post.filter(post => post.id == id).length == 0){
    //     res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_ID));
    //     return;
    // }
    // post.pop(id-1);

    //id 유효성 검사
    if(await post.checkPost(id) == false)
    {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_ID));
        return;
    }
    //DB에서 삭제
    var result = await post.postDelete(id);
    res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.DELETE_SUCCESS,{post_id : result}));
    return;
})
module.exports = router;
