const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

const minute = document.getElementById("minute");
const second = document.getElementById("sec");
const msec = document.getElementById("msec");

const bg = document.getElementsByClassName("outer-circle")[0];

let min;
let sec;
let centiSec;
let secCounter = 0;
let centiCounter = 0;
let minCounter = 0;

let isReset = false;
let isStop = false;
let isPlay = false;

const play = () => {
  bg.classList.add("animation-bg");
  min = setInterval(() => {
    minute.innerHTML = ` ${++minCounter} : `;
  }, 60 * 1000);
  sec = setInterval(() => {
    if (secCounter === 60) {
      secCounter = 0;
    }
    second.innerHTML = `&nbsp ${++secCounter} : `;
  }, 1000);
  centiSec = setInterval(() => {
    if (centiCounter === 100) {
      centiCounter = 0;
    }
    msec.innerHTML = ` &nbsp ${++centiCounter}`;
  }, 10);
};
const stop = () => {
  clearInterval(min);
  clearInterval(sec);
  clearInterval(centiSec);
};

const reset = () => {
  bg.classList.remove("animation-bg");
  clearInterval(min);
  clearInterval(sec);
  clearInterval(centiSec);
  minCounter = 0;
  secCounter = 0;
  centiCounter = 0;
  minute.innerHTML = "0 : ";
  second.innerHTML = "&nbsp0 : ";
  msec.innerHTML = "&nbsp00";
};

startButton.addEventListener("click", play);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);
