const body=document.querySelector("body");
const colorBox = document.querySelector(".colorbox");
const button=document.querySelector(".btn");

function changeCol(){
    let red=Math.floor(Math.random()*256);
    let green=Math.floor(Math.random()*256);
    let blue=Math.floor(Math.random()*256);
    return `rgb(${red},${green},${blue})`;
}
 button.addEventListener("click",()=>{
    let randomCol=changeCol();
    body.style.background=randomCol;
    colorBox.innerText=`Current color is ${randomCol}`;
 })
