const BlogModel = require('../models/blog');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');

const blog ={
    create : async (req,res)=>{
        const {title,description} = req.body;
        //title, description 값 확인
        if(!title || !description)
        {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
            return ;
        }
        const result = await BlogModel.create(title,description);
        res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.CREATED_BLOG, {blogIdx : result}));
    },
    delete: async(req,res)=>{
        const id = req.params.id;
        //id 유효성 확인
        const result = await BlogModel.checkId(id);
        if(result === false)
        {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_BLOG));
            return ;
        }
        const d_result = await BlogModel.delete(id);
        res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.DELETE_BLOG));
    },
    search: async(req,res)=>{
        const id = req.params.id;
        //id 유효성 확인 
        const result = await BlogModel.checkId(id);
        if(result === false)
        {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_BLOG));
            return ;
        }
        const result_s = await BlogModel.search(id);
        res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.READ_BLOG,result_s[0]));
    },
    searchAll: async(req,res)=>{
        const result = await BlogModel.searchAll();
        res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.READ_BLOG_ALL,result));
    }
}
module.exports = blog;