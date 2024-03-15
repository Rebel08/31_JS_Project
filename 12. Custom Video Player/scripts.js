
// select 
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const zoomBtn = player.querySelector('.btn-full');

//function

function togglePlayer(e){
    const method = video.paused? 'play': 'pause';
    video[method]();
}
function spacePlay(e){
    const method = video.paused? 'play': 'pause';
    if(e.keyCode === 32){
        video[method]();
    }
}
function updatePlayIcon(){
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent=icon;
}
function skipPlay(){
    // console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}
function updateRange(){
    video[this.name]= this.value;
}
function updateProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    
    progressBar.style.flexBasis = `${percent}%`; 
}
function  scrub(e){
   const scrubTime = (e.offsetX / progress.offsetWidth )* video.duration;
   video.currentTime = scrubTime;}
function makeFull(){
    if (video.requestFullscreen) {
        video.requestFullscreen();}
}

//add event_listeners

toggle.addEventListener('click', togglePlayer);
video.addEventListener('click', togglePlayer);
document.addEventListener('keydown', spacePlay);
video.addEventListener('play',updatePlayIcon);
video.addEventListener('pause',updatePlayIcon);
video.addEventListener('timeupdate',updateProgress);
skipButtons.forEach(skipBtn=>{skipBtn.addEventListener('click', skipPlay)});
ranges.forEach(range=>{range.addEventListener('change',updateRange)});
progress.addEventListener('click', scrub);
let mouseClick=false;
progress.addEventListener('mousemove',(e)=> mouseClick && scrub(e));
progress.addEventListener('mousedown', ()=> mouseClick=true);
progress.addEventListener('mouseup', ()=>mouseClick=false);
zoomBtn.addEventListener('click',makeFull);
