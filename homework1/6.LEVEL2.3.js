var team6 = [
    {name:"정욱", age:25, check:true},
    {name:"형준", age:28, check:true},
    {name:"예지", age:23, check:true},
    {name:"경선", age:23, check:true},
    {name:"해리", age:25, check:false},
    {name:"지윤", age:23, check:false}
]

team6.forEach(
    item => {
        console.log("name: "+item.name+", age: "+item.age+", 뒷풀이 참석 여부: "+item.check+"\n")
    }
)

