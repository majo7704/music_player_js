const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');

//Song titles
const songs = ['hey', 'summer', 'ukulele'];

//Keep track of song
let songIndex = 2;

//Initial load song details into DOM
loadSong(songs[songIndex]);

//Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}
//Play song
function playtheSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  //audio api with method play
  audio.play();
}

//Pause the somg
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

//Previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playtheSong();
}
//Next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playtheSong();
}

//UpdateProgress
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  //console.log(duration, currentTime);
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

//Set Progress
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;

  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

//Event LISTENER
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playtheSong();
  }
});

//Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//Time/song update event
audio.addEventListener('timeupdate', updateProgress);

//Click on progress bar
progressContainer.addEventListener('click', setProgress);

//Song ends
audio.addEventListener('ended', nextSong);

const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerBar = document.querySelector('.timer div');
//Time
function setTime() {
  let minutes = Math.floor(audio.currentTime / 60);
  let seconds = Math.floor(audio.currentTime - minutes * 60);
  let minuteValue;
  let secondValue;

  if (minutes < 10) {
    minuteValue = '0' + minutes;
  } else {
    minuteValue = minutes;
  }

  if (seconds < 10) {
    secondValue = '0' + seconds;
  } else {
    secondValue = seconds;
  }

  let audioTime = minuteValue + ':' + secondValue;
  timer.textContent = audioTime;

  let barLength = this.clientWidth * (audio.currentTime / audio.duration);
  timerBar.style.width = barLength + 'px';
}

audio.addEventListener('timeupdate', setTime);
