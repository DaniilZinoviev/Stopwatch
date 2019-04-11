// Global DOM Elements
const timeField = document.querySelector('.stopwatch-time');
const startBtn = document.querySelector('.stopwatch-start');
const stopBtn = document.querySelector('.stopwatch-stop');
const resetBtn = document.querySelector('.stopwatch-reset');

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);

let wasActive = false;
let timer;
let stopWatchTime;

function start() {
    let thisTime;
    if (stopWatchTime) {
        thisTime = new Date() - stopWatchTime;
    } else {
        thisTime = new Date().getTime();
    }
    timer = setInterval(() => {
        let newTime = new Date() - thisTime;
        // Calculate by difference between old time and new
        let mil   = Math.floor(newTime % 1000 / 10); // first 2 numbers of milliseconds
        let sec   = Math.floor(newTime/1000) % 60; // seconds
        let min   = Math.floor(newTime/1000/60) % 60; // minutes
        let hours = Math.floor(newTime/1000/60/60) % 24; // hours
        // Correcting time
        if (mil.toString().length == 1) mil = '0' + mil;
        if (sec.toString().length == 1) sec = '0' + sec;
        if (min.toString().length == 1) min = '0' + min;
        if (hours.toString().length == 1) hours = '0' + hours;
        // Show time
        stopWatchTime = newTime;
        timeField.innerHTML = hours + ' : ' + min + ' : ' + sec + ' : ' + mil;
    }, 10);
}


function stop() {
    clearInterval(timer);
}

function reset() {
    clearInterval(timer);
    wasActive = false;
    stopWatchTime = 0;
    timeField.innerHTML = '00 : 00 : 00 : 00';
}