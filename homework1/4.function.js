function addNum(x,y){
    console.log(x+y);
}

addNum(2,3);

//표현식 연습

var addStr = function (x,y){
    console.log(x+y);
}
addStr("함수"," 표현식");

//2.1 화살표 함수

var addBool= (x,y) => {
    console.log(x+y);
}

addBool(true,false);
