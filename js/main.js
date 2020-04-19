;(function() {
    // Global DOM Elements
    const timeField = document.querySelector('.stopwatch-time'),
          divLap = document.querySelector('.stopwatch .lap'),
          startBtn = document.querySelector('.stopwatch-start'),
          stopBtn = document.querySelector('.stopwatch-stop'),
          resetBtn = document.querySelector('.stopwatch-reset'),
          lapBtn = document.querySelector('.stopwatch-lap');

    // Variables for Stopwatch
    let isActive = false,
        timer,
        stopWatchTime = 0,
        savedLap = [];

    // Event Listeners
    startBtn.addEventListener('click', start);
    stopBtn.addEventListener('click', stop);
    resetBtn.addEventListener('click', reset);
    lapBtn.addEventListener('click', lap);

    /**
     * Runs on click to 'Start' button
     */
    function start() {
        // Check for double start
        if (isActive) return;

        // Save initial time
        let thisTime;
        if (stopWatchTime) {
            thisTime = new Date() - stopWatchTime;
        } else {
            thisTime = new Date().getTime();
        }
        isActive = true;
        
        // Every 10 ms update stopwatch
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

    /**
     * Runs on click to 'Pause' button
     */
    function stop() {
        clearInterval(timer);
        isActive = false;
    }

    /**
     * Runs on click to 'Reset' button
     */
    function reset() {
        clearInterval(timer);
        isActive = false;
        stopWatchTime = 0;
        savedLap = [];
        divLap.innerHTML = '';
        timeField.innerHTML = '00 : 00 : 00 : 00';
    }

    /**
     * Runs on click to 'Lap' button
     */
    function lap() {
        // Check for empty and already existing lap
        if (stopWatchTime == 0 || savedLap.length >= 3) return;
        for (let i = 0; i < savedLap.length; i++) {
            if (savedLap[i] == stopWatchTime) return;
        }

        // Save current lap
        savedLap.push(stopWatchTime);

        // Create new lap 
        let newLap = document.createElement('div');
        newLap.className = 'alert';
        newLap.textContent = timeField.textContent;

        divLap.appendChild(newLap);
    }
})();