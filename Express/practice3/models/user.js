// module.exports = [
//     {
//         id: 'gngsn',
//         name: '박경선',
//         password: 'qwerty',
//         email: 'gngsn@gmail.com'
//     },
//     {
//         id: 'EZYOON',
//         name: '이지윤',
//         password: 'fl0wer',
//         email: 'gngsn@gmail.com'
//     },
//     {
//         id: 'wjdrbs',
//         name: '최정균',
//         password: 'password',
//         email: 'wjdrbs@gmail.com'
//     }
//   ];

const pool = require('../modules/pool');
const encrypt = require('../modules/encrypt');
const table = 'user';
const user = {
    signup : async (id, name, password, salt, email)=>{
        const fields = 'id, name, password, salt, email';
        const questions = '?, ?, ?, ?, ?';
        var hashed = await encrypt(salt, password);
        values = [id, name, hashed, salt, email];
        const query = `INSERT INTO ${table}(${fields}) VALUES (${questions})`;
        try{
            const result = await pool.queryParamArr(query,values);
            const insertId = result.insertId;
            return insertId;
        }catch(err){
            if(err.errno == 1062){
                console.log('signup ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signup ERROR : ', err);
            throw err;
        }
    },
    signin : async (id, password)=>{
        const query = `SELECT * FROM user WHERE id="${id}"`;
        try{
            const result = await pool.queryParam(query);
            var hashed = await encrypt(result[0].salt, password);
            if(result[0].password === hashed)
            {
                return true;
            }
            else
            {
                return false;
            }
        }catch(err){
            throw err;
        }
    },
    checkUser : async (id) =>{
    const query = `SELECT * FROM user WHERE id="${id}"`;
        try{
        const result = await pool.queryParam(query);
        if(result.length != 0)
        {
            return true;
        }
        else
        {
            return false;
        }
        }catch(err){
            throw err;
        }
    },
        getUserById : async (id) =>{
        const query = `SELECT * FROM user WHERE id="${id}"`;
        try{
        const result = await pool.queryParam(query);
        return result[0];
        }catch(err){
            throw err;
        }
    }
}
module.exports = user;
