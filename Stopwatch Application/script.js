let hr = 0, min = 0, sec = 0, ms = 0;
let startTimer;
let lastTime = 0;

const startBtn = document.querySelector(".start"),
  stopBtn = document.querySelector(".stop"),
  resetBtn = document.querySelector(".reset"),
  lapBtn = document.querySelector(".lap"),
  darkModeBtn = document.querySelector(".dark-mode"),
  lapTimesContainer = document.querySelector(".lap-times");

let lapTimes = [];

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", recordLap);
darkModeBtn.addEventListener("click", toggleDarkMode);

function start() {
  startBtn.classList.add("active");
  stopBtn.classList.remove("stopActive");
  lastTime = performance.now();
  startTimer = requestAnimationFrame(updateTime);
}

function stop() {
  startBtn.classList.remove("active");
  stopBtn.classList.add("stopActive");
  cancelAnimationFrame(startTimer);
}

function reset() {
  startBtn.classList.remove("active");
  stopBtn.classList.remove("stopActive");
  cancelAnimationFrame(startTimer);
  hr = min = sec = ms = 0;
  lapTimes = [];
  putValue();
  updateLapTimes();
}

function updateTime(timestamp) {
  const elapsed = timestamp - lastTime;
  lastTime = timestamp;

  ms += elapsed;
  if (ms >= 1000) {
    sec += Math.floor(ms / 1000);
    ms %= 1000;
  }
  if (sec >= 60) {
    min += Math.floor(sec / 60);
    sec %= 60;
  }
  if (min >= 60) {
    hr += Math.floor(min / 60);
    min %= 60;
  }

  putValue();
  startTimer = requestAnimationFrame(updateTime);
}

function putValue() {
  document.querySelector(".millisecond").innerText = ms < 100 ? "0" + Math.floor(ms / 10) : Math.floor(ms / 10);
  document.querySelector(".second").innerText = sec < 10 ? "0" + sec : sec;
  document.querySelector(".minute").innerText = min < 10 ? "0" + min : min;
  document.querySelector(".hour").innerText = hr < 10 ? "0" + hr : hr;
}

function recordLap() {
  const lapTime = `${hr < 10 ? "0" + hr : hr}:${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}:${ms < 100 ? "0" + Math.floor(ms / 10) : Math.floor(ms / 10)}`;
  lapTimes.push(lapTime);
  updateLapTimes();
}

function updateLapTimes() {
  lapTimesContainer.innerHTML = '';
  lapTimes.forEach(time => {
    const li = document.createElement("li");
    li.innerText = time;
    lapTimesContainer.appendChild(li);
  });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}



