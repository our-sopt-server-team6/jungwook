const mysql = require('promise-mysql');

const dbConfig = {
    host : 'db-our-sopt.cfd7pgthcmlu.ap-northeast-2.rds.amazonaws.com',
    port : 3306,
    user : 'cheeze',
    password : 'cheeze123',
    database : 'McDonalds', // schema
    dataString : 'date'
}
module.exports = mysql.createPool(dbConfig);