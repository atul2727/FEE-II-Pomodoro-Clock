let sessionTime = 25;
let breakTime = 5;
let timeLeft = sessionTime * 60;
let isRunning = false;
let isSession = true;
let sessionCount = 1;
let timerId;

const timeLeftDisplay = document.getElementById('time-left');
const timerLabel = document.getElementById('timer-label');
const startStopBtn = document.getElementById('start-stop');
const resetBtn = document.getElementById('reset');
const sessionLength = document.getElementById('session-length');
const breakLength = document.getElementById('break-length');
const sessionDecrement = document.getElementById('session-decrement');
const sessionIncrement = document.getElementById('session-increment');
const breakDecrement = document.getElementById('break-decrement');
const breakIncrement = document.getElementById('break-increment');
const progressBar = document.querySelector('.progress-bar');

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    timeLeftDisplay.textContent = formatTime(timeLeft);
    timerLabel.textContent = isSession ? `Session ${sessionCount}` : 'Break!';
    progressBar.style.width = `${(timeLeft / (isSession ? sessionTime : breakTime) / 60) * 100}%`;
    progressBar.style.backgroundColor = isSession ? '#4fd1c5' : '#ed8936';
    timeLeftDisplay.style.color = isSession ? '#4fd1c5' : '#ed8936';
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(timerId);
        startStopBtn.textContent = 'Start';
    } else {
        timerId = setInterval(() => {
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(timerId);
                if (isSession) {
                    isSession = false;
                    timeLeft = breakTime * 60;
                } else {
                    isSession = true;
                    timeLeft = sessionTime * 60;
                    sessionCount++;
                }
                toggleTimer();
            }
            updateDisplay();
        }, 1000);
        startStopBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    isSession = true;
    sessionCount = 1;
    timeLeft = sessionTime * 60;
    startStopBtn.textContent = 'Start';
    updateDisplay();
}

function adjustTime(type, amount) {
    if (isRunning) return;
    if (type === 'session') {
        sessionTime = Math.max(1, Math.min(60, sessionTime + amount));
        sessionLength.textContent = `${sessionTime} min`;
        if (isSession) timeLeft = sessionTime * 60;
    } else {
        breakTime = Math.max(1, Math.min(60, breakTime + amount));
        breakLength.textContent = `${breakTime} min`;
        if (!isSession) timeLeft = breakTime * 60;
    }
    updateDisplay();
}

startStopBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);
sessionDecrement.addEventListener('click', () => adjustTime('session', -1));
sessionIncrement.addEventListener('click', () => adjustTime('session', 1));
breakDecrement.addEventListener('click', () => adjustTime('break', -1));
breakIncrement.addEventListener('click', () => adjustTime('break', 1));

updateDisplay();