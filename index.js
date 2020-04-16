const timerLabel = document.getElementById('timer-label');
const remainingTimerCircle = document.getElementById('remainingCircle');

const TIME_LIMIT = 90;
let passedTime = 0;
let remainingTime = TIME_LIMIT;
let timerInterval = null;

startTimer();

function startTimer(){
    setUpTimerLabel(remainingTime);
    timerInterval = setInterval(()=>{
        if(remainingTime===TIME_LIMIT)
            animateRemainingCircle();
        passedTime += 1;
        remainingTime = TIME_LIMIT - passedTime;
        setUpTimerLabel(remainingTime);
        if(remainingTime===0)
            clearInterval(timerInterval);
    },1000)
}

function animateRemainingCircle(){
    remainingTimerCircle.style.animation = `draw ${TIME_LIMIT}s linear forwards`;
}

function setUpTimerLabel(timestamp){
    const formattedTime = formatTime(timestamp);
    timerLabel.innerHTML = `${formattedTime.min}:${formattedTime.sec}`
}

function formatTime(timestamp){
    const minutes = Math.floor(timestamp / 60);
    const seconds = timestamp % 60;
    const formattedTime = {
        min: minutes >= 10 ? `${minutes}` : `0${minutes}`,
        sec: seconds >= 10 ? `${seconds}` : `0${seconds}`
    }
    return formattedTime;

}