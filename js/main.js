

var isPaused;
var time; // seconds let in the timer
var timer; // timer setInterval ID
var timerDuration;

$(function() {

    timerDuration = weekRestSec;
    // initTimer(timerDuration);
    initTimer(10);

    if (annyang) {
        var commands = {
            'hello': function() {},
            'start :timer': function() { notify(); startTimer(); },
            'stop :timer': function() { notify(); stopTimer(); },
            'reset :timer': function() { notify(); resetTimer(); },
            'start timer for :quantity :unit': handleTimerSpeech,
        }
        annyang.debug();
        annyang.addCommands(commands);
        annyang.start();
    }

});

function handleTimerSpeech(quantity, unit) {
    if(unit.match("^minute")) {
        notify();
        initTimer(parseInt(quantity)*60);
        startTimer(); 
    } else if(unit.match("^second")) {
        notify();
        initTimer(parseInt(quantity));
        startTimer(); 
    } else {
        console.log("didn't recognize quantity, unit = "+quantity+","+unit);
    }
}

function playSound(sound) {
    var snd = new Audio(sound);
    snd.play();
}

function notify() {
    playSound(recognizeSound);
}

function alarm() {
    playSound(alarmSound);
}

function initTimer(secs) { 
    time = (secs || timerDuration) || 60;
    isPaused = true;
    minutes = parseInt(time/60,10);
    seconds = parseInt(time%60,10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    $('.timer').text(minutes + ":" + seconds);
    if(timer) clearInterval(timer);
    timer = window.setInterval(function() {
        if(!isPaused) {
            time--;
            if(time <= 0) {
                isPaused = true;
                time = 0;
                clearInterval(timer);
                alarm();
            }

            minutes = parseInt(time/60,10);
            seconds = parseInt(time%60,10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            $('.timer').text(minutes + ":" + seconds);

        }
    }, 1000);
}
function startTimer() { isPaused = false; }
function stopTimer() { isPaused = true; }
function resetTimer() { initTimer(); }


function update() {
    console.log( $('#container').find("input").serialize() );
    $.post('/update', $('#container').find("input").serialize() ).success(function(result) { console.log(result); $("#message").html(result); });

}

