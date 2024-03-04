let name = "piyush anand";
console.log("rebel");
console.log(name);
console.log(clock.innerHTML);
function clk(){
let dat=new Date;
let hr=dat.getHours();
let min = dat.getMinutes();
let sec = dat.getSeconds();
document.getElementById(`clock`).innerHTML =(hr+"h:"+min+"m:"+sec+"s");
// console.log(dat);
}
setInterval(clk,1000);