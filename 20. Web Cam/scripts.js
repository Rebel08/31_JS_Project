const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo(){
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMedia => {
        // console.log(localMedia);
        video.srcObject = localMedia;
        video.play();
       
    })
    .catch(err => {"SomeThing Went Wrong", err});
}

function paintCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.height = height;
    canvas.width = width;
    return setInterval (()=>{
        ctx.drawImage(video, 0,0, width,height);

        let pixels = ctx.getImageData(0,0,width,height);
        // pixels = getFilter(pixels);
        // pixels = rgbSplit(pixels);
        // pixels = greenScreen(pixels);
        ctx.putImageData(pixels, 0,0);

    },16)};

function takePhoto(){
    // sound play
    snap.currentTime = 0;
    snap.play();

    // click pic and show on strip
    const image = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = image;
    link.setAttribute('download','handsome');
    link.innerHTML = `<image src=${image} alt="Handsome Man" />`;
    strip.insertBefore(link,strip.firstChild);

}

function getFilter(pixels) {
    for(var i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 50; // RED
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
    }
    return pixels;
};

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
      pixels.data[i - 150] = pixels.data[i + 0]; // RED
      pixels.data[i + 100] = pixels.data[i + 1]; // GREEN
      pixels.data[i - 150] = pixels.data[i + 2]; // Blue
    }
    return pixels;
  }

  function greenScreen(pixels) {
    const levels = {};
  
    document.querySelectorAll('.rgb input').forEach((input) => {
      levels[input.name] = input.value;
    });
  
    for (i = 0; i < pixels.data.length; i = i + 4) {
      red = pixels.data[i + 0];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];
      alpha = pixels.data[i + 3];
  
      if (red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        && red <= levels.rmax
        && green <= levels.gmax
        && blue <= levels.bmax) {
        // take it out!
        pixels.data[i + 3] = 0;
      }
    }
  
    return pixels;
  }
  

getVideo();
video.addEventListener('canplay', paintCanvas);
