// main-menu btns
const TimerButton = document.getElementById("Timer");
const StopWatchButton = document.getElementById("Stop-watch");
const AlarmButton = document.getElementById("Alarm");

// timer-menu btns
const TimerUpButton = document.getElementById("up");
const TimerDownButton = document.getElementById("down");
const TimerStartButton = document.getElementById("timer-start");

// stop-watch-menu btns
const stopWatchStartBtn = document.getElementById("StopWatch-start");
const stopWatchStopBtn = document.getElementById("stop");
const stopWatchResetBtn = document.getElementById("reset");

// alarm-menu btns
const alarmSetBtn = document.getElementById("setAlarm");
const alarmStopBtn = document.getElementById("stopAlarm");
const alarmTimeBox = document.getElementById("alarmTime");

// back btn
const BackButton = document.getElementById("back");

// veiw time
const minute = document.getElementById("minute");
const second = document.getElementById("sec");
const msec = document.getElementById("msec");
const timeInputBox = document.getElementById("alarmTime");

// btns
const menuBtns = document.querySelectorAll(".Menu.button");
const stopWatchBtns = document.querySelectorAll(".StopWatch.button");
const timerBtns = document.querySelectorAll(".Timer.button");
const alarmBtns = document.querySelectorAll(".Alarm.button");

// circle-background
const bg = document.getElementsByClassName("outer-circle")[0];

let min;
let sec;
let centiSec;
let secCounter = 0;
let centiCounter = 0;
let minCounter = 0;

let timerMinute = 0;

// flag
let timerFlag = false;
let currentFlag = true;
let stopWatchFlag = false;
let alarmFlag = false;

// interval
let timerIter = false;
let curInter = false;
let stopWatchInter = false;

// sound
var alarmSound = new Audio("ringtone.mp3");

// currentTime
const currentTime = () => {
  cur = setInterval(() => {
    let currentTime = new Date();

    minute.innerHTML =
      (currentTime.getHours() < 10 ? "0" : "") +
      currentTime.getHours() +
      `&nbsp :`;
    second.innerHTML =
      `&nbsp` +
      (currentTime.getMinutes() < 10 ? "0" : "") +
      currentTime.getMinutes();
    +" : ";
    msec.innerHTML =
      `&nbsp` +
      " : " +
      (currentTime.getSeconds() < 10 ? "0" : "") +
      currentTime.getSeconds();
  }, 1000);
};

// play currentTime
if (currentFlag) {
  currentTime();
}

// click timerBtn
const timer = () => {
  timerFlag = true;
  BackButton.style.display = "block";
  clearInterval(cur);
  minute.innerHTML = "00 : ";
  msec.style.display = "none";
  second.innerHTML = "&nbsp00";

  menuBtns.forEach((cell) => {
    cell.style.display = "none";
  });

  timerBtns.forEach((cell) => {
    cell.style.display = "block";
  });
};

// timer timeUp
const upTimer = () => {
  timerMinute = timerMinute + 5;
  second.innerText = (timerMinute < 10 ? "0" : "") + timerMinute;
};

// timer timeDown
const downTimer = () => {
  if (timerMinute > 1) {
    timerMinute = timerMinute - 5;
    second.innerText = (timerMinute < 10 ? "0" : "") + timerMinute;
  }
};

// timer start
const timerStart = () => {
  timerIter = true;
  timerInterval = setInterval(() => {
    if (timerMinute === 0) {
      bg.classList.add("animation-bg");
      alarmSound.play();
    } else {
      timerMinute--;
      second.innerText = (timerMinute < 10 ? "0" : "") + timerMinute;
    }
  }, 1000);
};

// click stopWatchBtn
const stopWatch = () => {
  stopWatchFlag = true;
  clearInterval(cur);
  BackButton.style.display = "block";
  menuBtns.forEach((cell) => {
    cell.style.display = "none";
  });
  stopWatchBtns.forEach((cell) => {
    cell.style.display = "block";
  });

  minute.innerHTML = "00 : ";
  second.innerHTML = "&nbsp00 : ";
  msec.innerHTML = "&nbsp00";
};

// play stop-watch
const stopWatchStart = () => {
  stopWatchInter = true;
  bg.classList.add("animation-bg");
  min = setInterval(() => {
    minute.innerHTML = (minCounter < 9 ? "0" : "") + ` ${++minCounter} : `;
  }, 60 * 1000);
  sec = setInterval(() => {
    if (secCounter === 59 && centiCounter === 99) {
      secCounter = 0;
    }
    second.innerHTML = (secCounter < 9 ? "0" : "") + `${++secCounter} : `;
  }, 1000);
  centiSec = setInterval(() => {
    if (centiCounter === 99) {
      centiCounter = 0;
    }
    msec.innerHTML = `${++centiCounter}`;
  }, 10);
};

// stop stop-watch
const stopStopWatch = () => {
  clearInterval(min);
  clearInterval(sec);
  clearInterval(centiSec);
};

// reset stop-watch
const resetStopWatch = () => {
  bg.classList.remove("animation-bg");
  clearInterval(min);
  clearInterval(sec);
  clearInterval(centiSec);
  minCounter = 0;
  secCounter = 0;
  centiCounter = 0;
  minute.innerHTML = "00 : ";
  second.innerHTML = "&nbsp00 : ";
  msec.innerHTML = "&nbsp00";
};

// click alarmBtn
const alarm = () => {
  alarmFlag = true;
  BackButton.style.display = "block";
  alarmTimeBox.style.display = "block";
  menuBtns.forEach((cell) => {
    cell.style.display = "none";
  });

  alarmBtns.forEach((cell) => {
    cell.style.display = "block";
  });
};

// setting alarmTime
const setAlarm = () => {
  var alarmTime = document.getElementById("alarmTime").value;
  var now = new Date();
  var alarm = new Date(now.toDateString() + " " + alarmTime);

  var timeRemaining = alarm - now;

  setTimeout(playAlarm, timeRemaining);
  document.getElementById("alarmTime").disabled = true;
};

// play alarm
const playAlarm = () => {
  alarmSound.play();
  bg.classList.add("animation-bg");
  document.getElementById("alarmTime").disabled = false;
};

// stop alarm
const stopAlarm = () => {
  alarmSound.pause();
};

// back to main menu
const back = () => {
  BackButton.style.display = "none";
  alarmTimeBox.style.display = "none";
  msec.style.display = "block";
  bg.classList.remove("animation-bg");
  currentTime();
  if (stopWatchFlag) {
    if (stopWatchInter) {
      clearInterval(min);
      clearInterval(sec);
      clearInterval(centiSec);
      stopWatchInter = false;
    }
    stopWatchBtns.forEach((cell) => {
      cell.style.display = "none";
    });
    stopWatchFlag = false;
  }
  if (timerFlag) {
    timerMinute = 0;
    if (timerIter) {
      alarmSound.pause();
      clearInterval(timerInterval);
      timerIter = false;
    }
    timerBtns.forEach((cell) => {
      cell.style.display = "none";
    });
    timerFlag = false;
  }
  if (alarmFlag) {
    alarmSound.pause();
    alarmBtns.forEach((cell) => {
      cell.style.display = "none";
    });
    alarmFlag = false;
  }
  menuBtns.forEach((cell) => {
    cell.style.display = "block";
  });
};

// addEvent
TimerButton.addEventListener("click", timer);
TimerUpButton.addEventListener("click", upTimer);
TimerDownButton.addEventListener("click", downTimer);
TimerStartButton.addEventListener("click", timerStart);

StopWatchButton.addEventListener("click", stopWatch);
stopWatchStartBtn.addEventListener("click", stopWatchStart);
stopWatchStopBtn.addEventListener("click", stopStopWatch);
stopWatchResetBtn.addEventListener("click", resetStopWatch);

AlarmButton.addEventListener("click", alarm);
alarmSetBtn.addEventListener("click", setAlarm);
alarmStopBtn.addEventListener("click", stopAlarm);

BackButton.addEventListener("click", back);
