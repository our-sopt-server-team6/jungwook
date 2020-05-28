function great(){
    console.log('Hello!');
}

function timer(){
    return setTimeout(()=>{
        console.log('End!');
    },3000)
}

great();
timer();