const pool = require('../modules/pool');
const table ='blog';

const blog={
    create : async (title, description)=>{
        //const query = `INSERT INTO ${table}(title,description) VALUES("${title}", "${description}")`;
        const fields = 'title, description';
        const questions = `?, ?`;
        const query = `INSERT INTO ${table}(${fields}) VALUES (${questions})`;
        const values = [title, description];
        //console.log(title);
        //console.log(description);
        try{
            const result = await pool.queryParamArr(query,values);
            const insertId = result.insertId;
            return insertId;
        }catch(err){
            throw err;
        }
    },
    delete : async (id)=>{
        const query = `DELETE FROM ${table} WHERE blogIdx="${id}"`;
        try{
            const result = await pool.queryParam(query);
        }catch(err){
            throw err;
        }
    },
    searchAll : async ()=>{
        const query = `SELECT * FROM ${table}`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            throw err;
        }
    },
    search : async(id)=>{
        const query = `SELECT * FROM ${table} WHERE blogIdx="${id}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            throw err;
        }
    },
    checkId : async(id)=>{
        const query = `SELECT * FROM ${table} WHERE blogIdx="${id}"`;
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
module.exports = blog;