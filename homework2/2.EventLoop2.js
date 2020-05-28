function task1(){
    setTimeout( ()=>{
        console.log('Task1!');
    },0);
}

function task2(){
    console.log('Task2!');
}

function task3(){
    console.log('Task3!');
}

task1();
task2();
task3();

//실행결과가 Task2 -> Task3 -> Task1 순서로 나온다,
//이유는 setTimeout의 경우 Background로 먼저 가지만 내부 콜백함수가 
//CALLBACK QUEUE를 지나 다시 CALL STACK에 쌓이기 때문에 마지막에 실행 된다.
