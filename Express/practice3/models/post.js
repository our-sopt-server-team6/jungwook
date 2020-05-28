// module.exports =[
//     {
//         id : 1,
//         title : 'post1',
//         description : 'descripttion1'
//     },
//     {
//         id : 2,
//         title : 'post2',
//         description : 'description2'
//     }
// ]


const pool = require('../modules/pool');
const encrypt = require('../modules/encrypt');
const table = 'post';
const post = {
    //모든 게시글 조회
    postSearchAll : async ()=>{
        const query = `SELECT * FROM ${table}`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch (err){
            throw err;
        }
    },
    //게시글 생성
    postCreate : async (title, description)=>{
        const fields = 'title, description';
        const questions = '?, ?';
        const values = [title, description];
        const query = `INSERT INTO ${table}(${fields}) VALUES (${questions})`;
        try{
            const result = await pool.queryParamArr(query,values);
            const insertId = result.insertId;
            return insertId;
        }catch(err){
            if(err.errno == 1062){
                console.log('createPost ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('createPost ERROR : ', err);
            throw err;
        }
    },
    //고유 id 게시글 조회
    postSearch : async (id)=>{
        const query = `SELECT * FROM ${table} WHERE postIdx = "${id}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            throw err;
        }
    },
    //고유 id 게시글 수정
    postUpdate : async(id,title,description)=>{
        const fields = 'title=?, description=?';
        const query = `UPDATE ${table} SET ${fields} WHERE postIdx="${id}"`;
        var value=[title,description];
        try{
            const result = await pool.queryParamArr(query,value);
            return true;
        }catch(err){
            throw err;
        }
    },

    //고유 id 게시글 삭제
    postDelete : async(id)=>{
        const query = `DELETE FROM ${table} WHERE postIdx=${id}`;
        try{
            var result = await pool.queryParam(query);
            return true;
        }catch(err){
            throw err;
        }
    },
    //
    checkPost : async (id)=>{
        const query = `SELECT * FROM ${table} WHERE postIdx = "${id}"`;
        try{
            const result = await pool.queryParam(query);
            if(result.length === 0){
                return false;
            }else{
                return true;
            }
        }catch(err){
            throw err;
        }
    }
}
module.exports = post;