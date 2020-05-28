var server1 = ["김해리","손예지",43,null,true];
var server2 = Array("신윤제","유가희",13);
var server3 = new Array("이현주","조충범",false,undefined);

console.log('server1 : ',server1);
console.log('server2 : ',server2);
console.log('server3 : ',server3);


// 배열 추가 실습
server1.push(123);
server2[server2.length] = "글쎄요";
server3[99] = "server3의 길이는 몇일까요?";

console.log('server1 : ',server1);
console.log('server2 : ',server2);
console.log('server3 : ',server3);


//배열 순회 연습

let str1 = 'server1에는 "';
for(var item of server1){
    str1+=item+', ';
}
str1 += '"이 들어있네요~';
console.log(str1);


let str2 = 'server2에는"';
for(var item in server2){
str2 += server2[item]+', ';
}
str2 += '"이 들어있네요';
console.log(str2);

let str3 ='server3에는 "';
server3.forEach(item => str3 += ', ');
str3 += '"이 들어있네요~';
console.log(str3);