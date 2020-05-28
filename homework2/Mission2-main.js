const calcurator = require('./Mission2-calculator');

var a = 1;
var b = 3;
//sum
var result = calcurator.sum(a,b);
console.log("a : "+a+', b : '+b+', sum='+result);

//minus
var result = calcurator.minus(a,b);
console.log("a : "+a+', b : '+b+', minus='+result);

//mul
var result = calcurator.mul(a,b);
console.log("a : "+a+', b : '+b+', mul='+result);

//div
var result = calcurator.div(a,b);
console.log("a : "+a+', b : '+b+', div='+result);
