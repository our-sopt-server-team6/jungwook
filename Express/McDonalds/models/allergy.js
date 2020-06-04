const pool = require('../modules/pool');
const table = 'allergy';

const menu = {
    READ : async (menuIdx) =>{
            var query = `SELECT topic FROM ${table} WHERE menuIDx="${menuIdx}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            throw err;
        }
    }
}

module.exports = menu;