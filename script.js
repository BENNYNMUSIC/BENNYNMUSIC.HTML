const radioPlayer = document.getElementById('radioPlayer');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');

playBtn.addEventListener('click', () => {
  radioPlayer.play();
});

pauseBtn.addEventListener('click', () => {
  radioPlayer.pause();
});
