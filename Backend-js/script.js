//  alert("This is a basic site");
var arr=[1,2,3,"hey",{},function(){},[]];
console.log(arr);
// foresch map filter find indexof 
arr.forEach(function(val){
console.log(val) ; 
})

var myarr=arr.map(function(val){     /// blank array from arr 
     return val+1; 
})
console.log(myarr);
var filterarr=arr.filter(function(val){  // filter  - return true or false 
    return typeof val=="number"; 
})
console.log(filterarr);

var findarr=arr.find(function(val){   //  return first matching element
    return typeof val=="number"; 
})
console.log(findarr);

var index=arr.indexOf("hey");  // return index of element
console.log(index);

// objects 
var obj={ name:"john",age:30, } // key value pairs
console.log(obj.name);
console.log(obj["age"]);
obj.age=31;
console.log(obj.age);
Object.freeze(obj); // make object read only
obj.age=32;
console.log(obj.age);
console.log(arr.length); 
// functions 
// function length - no. of parameters (functions - objects in js)
function add(a,b,c){

}
console.log(add.length);


// synchronous code - line by line execution
// asynchronous code - take that in side stack and execute later .
// Execute sync code first and then after it put async code in stack and execute  it. 

async function myfun(){
var blob = await fetch('https://jsonplaceholder.typicode.com/todos/1');  // fetch - make network request (async by default)
var data= await blob.json();
console.log(data);
}
myfun(); 
