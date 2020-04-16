const timerLablel = document.getElementById('timerLabel');

const TIME_LIMIT = 489;
let passedTime = 0;
let remainingTime = TIME_LIMIT;
let timerInterval = null;

startTimer();

function startTimer(){
    timerInterval = setInterval(()=>{
        passedTime += 1;
        remainingTime = TIME_LIMIT - passedTime;
        setUpTimerLabel(remainingTime);
    },1000)
}

function setUpTimerLabel(timestamp){
    const formattedTime = formatTime(timestamp);
    timerLablel.innerHTML = `${formattedTime.min}:${formattedTime.sec}`
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