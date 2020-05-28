const sum=require('./6.sum');
const sumModule = require('./6.sum2');

//함수
var result = sum(1,3);
console.log("sum result : ",result);

//객체
var result = sumModule.sum(1,3);
console.log("sum result : ",result);