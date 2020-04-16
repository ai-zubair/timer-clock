const timerLabel = document.getElementById('timer-label');
const remainingTimerCircle = document.getElementById('remainingCircle');

const TIME_LIMIT = 20;
const TOTAL_PATH_LENGTH = 251;/*Math.floor(2*Math.PI*40);*/

let passedTime = 0;
let remainingTime = TIME_LIMIT;
let timerInterval = null;

startTimerMethod2();


function startTimerMethod2(){

    /* required to prevent initial sudden transition of 1s */
    remainingTimerCircle.setAttribute("stroke-dasharray","251 251");

    /* show the initial time limit in the clock circle before the countdown starts*/
    setUpTimerLabel(remainingTime);
    
    /* set up the countdown which is asynchronous code */
    timerInterval = setInterval(()=>{
        
        /* countdown */
        passedTime += 1;
        remainingTime = TIME_LIMIT - passedTime;
        setUpTimerLabel(remainingTime);

        redrawTimerCircle();

        /* stop the timer */
        if(remainingTime===0){
            clearInterval(timerInterval);
            /* required to achieve the effect of forward fill as in css animation */
            remainingTimerCircle.setAttribute("stroke-dasharray","0 251");
        }
    },1000)
}

function redrawTimerCircle(){
    const remainingTimerCircleLength = calculateRemainingTimeFraction()*TOTAL_PATH_LENGTH;
    remainingTimerCircle.setAttribute("stroke-dasharray",`${remainingTimerCircleLength} ${TOTAL_PATH_LENGTH}`);
}

function calculateRemainingTimeFraction(){
    /* extra subtraction factor to overcome the lag between text and circle when trying to achieve a smooth transition effect */
    return (remainingTime/TIME_LIMIT) - (1 / TIME_LIMIT) * (1 - remainingTime/TIME_LIMIT);
}

function startTimerMethod1(){

    /* show the initial time limit in the clock circle before the countdown starts*/
    setUpTimerLabel(remainingTime);

    /* set up the countdown which is asynchronous code */
    timerInterval = setInterval(()=>{
        /* since the countdown starts asynchronously start animating once this code executes */
        if(remainingTime===TIME_LIMIT)
            animateRemainingCircle();
        /* countdown */
        passedTime += 1;
        remainingTime = TIME_LIMIT - passedTime;
        setUpTimerLabel(remainingTime);

        /* stop the timer */
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