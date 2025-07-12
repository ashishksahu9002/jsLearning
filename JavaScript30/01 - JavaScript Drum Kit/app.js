const keys = Array.from(document.querySelectorAll(".key"));

const playSound = (e) => {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) return;
  key.classList.add("playing");
  audio.currentTime = 0;
  audio.play();
};

const removeTransion = () => {
  keys.forEach((key) => {
    key.classList.remove("playing");
  });
};

window.addEventListener("keydown", playSound);
window.addEventListener("keyup", removeTransion);

