let clearTime;
const displayTimeLeft = document.querySelector('.display__time-left');
const displayTimeEnd = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');



function timer(seconds){
    clearInterval(clearTime);
    const now = Date.now();
    const then = now + seconds*1000;
    displayTime(seconds);
    displayEndTime(then);
    clearTime= setInterval(()=>{
        const secondsRemaining = Math.round((then-Date.now())/1000);
        if(secondsRemaining < 0) { 
            clearInterval(clearTime);
            return;
        }
        displayTime(secondsRemaining);

    },1000);

}
function displayTime(seconds){
    const min = Math.floor(seconds/60);
    const secRemaining = seconds%60;
    const display = `${min}:${secRemaining < 10 ? '0':'' }${secRemaining} `;
    document.title=display;
    displayTimeLeft.textContent = display;
}

function displayEndTime(timestamp){
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  displayTimeEnd.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function handleClick(e){
     timer(parseInt(this.dataset.time));
}


buttons.forEach(button => {button.addEventListener('click',handleClick);});

document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
  });