const title = 'password.txt';
const crypto = require('crypto');
const fs = require('fs');
const salt = crypto.randomBytes(32).toString('hex');

const encrypt = (salt, password)=>{
    return new Promise((res,rej)=>{
        crypto.pbkdf2(password, salt.toString(), 1, 32, 'sha512', (err,derivedKey)=>{
            if(err) throw err;
            hashed = derivedKey.toString('hex');
            //console.log('salt : ',salt);
            //console.log('hashed : ',hashed);
            res(hashed);
        });
    })
}

fs.readFile("./jungwook/homework2/password.txt", async(err, data) => {
    if (err) return console.log (err.message);
    var password = data;
    var hashed = await encrypt(salt, password);
    const title2 = 'hashed.txt'
    const data2 = hashed;
    fs.writeFile(title2,data2,(err,data)=>{
        if(err) return console.log(err.message);
        console.log('hashed file 생성 완료\n');
    });
});

