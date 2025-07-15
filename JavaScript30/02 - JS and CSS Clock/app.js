const secondHand = document.querySelector(".second-hand");
const minHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");

let prevSeconds = 0;
let prevMin = 0;
let prevHour = 0;

const setDate = () => {
  const today = new Date();
  const seconds = today.getSeconds();
  const secondsDegrees = (seconds / 60) * 360 + 90;
  if (seconds === 0 && prevSeconds === 59) {
    secondHand.style.transition = "none";
  } else {
    secondHand.style.transition = "all 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)";
  }
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  prevSeconds = seconds;

  const mins = today.getMinutes();
  const minsDegrees = (mins / 60) * 360 + (seconds / 60) * 6 + 90;
  if (mins === 0 && prevMin === 59) {
    minHand.style.transition = "none";
  } else {
    minHand.style.transition = "all 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)";
  }
  minHand.style.transform = `rotate(${minsDegrees}deg)`;
  prevMin = mins

  const hour = today.getHours();
  const hourDegrees = (hour / 12) * 360 + (mins / 60) * 30 + 90;
  if (hour === 0 && prevHour === 59) {
    hourHand.style.transition = "none";
  } else {
    hourHand.style.transition = "all 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)";
  }
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  prevHour = hour
};

setInterval(setDate, 1000);

setDate();
