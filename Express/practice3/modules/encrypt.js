const crypto = require('crypto');

const encrypt = (salt, password)=>{
    return new Promise((res,rej)=>{
        crypto.pbkdf2(password, salt.toString(),1,32,'sha512',(err,derivedKey)=>{
            if(err) throw err;
            const hashed = derivedKey.toString('hex');
            res(hashed);
        })
    })
}

module.exports = encrypt;