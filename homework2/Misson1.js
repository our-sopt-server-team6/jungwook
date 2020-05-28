let isMomHappy = true;
//let isMomHappy = false;
let phone = {
    brand : "Samsung",
    color : "black"
};

var WillIGetNewPone = new Promise((resolved, rejected)=>{
    if(isMomHappy === true){
        resolved("isMomHappy is true");
        console.log("brand : "+phone.brand+", color : "+phone.color);
    }else{
        rejected(new Error('Mom is Not Happy'));
    }
});

//return 으로 promise객체를 주면 따로 실행해야 하지만, 바로 생성하면 즉시 실행되므로 밑에처럼 실행하지 않아도 된다. 아마 서버 파트장은 이런 의도로 바로 생성하라고 한 것 같음.
/* 
WillIGetNewPone
.then(()=>console.log("brand : "+phone.brand+", color : "+phone.color)
,(error)=>console.error(error)
); 
*/