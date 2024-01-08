const musicList = [
  {
    img: './images/Californication.jpg',
    name: 'Californication',
    artist: 'Red Hot Chili Peppers',
    music: './music/Californication.mp3',
  },
  {
    img: './images/CaliforniaDreamin.jpg',
    name: 'California Dreamin',
    artist: 'The Mamas & The Papas',
    music: './music/CaliforniaDreamin.mp3',
  },
  {
    img: './images/StolenDance.jpg',
    name: 'Stolen Dance',
    artist: 'Milky Chance',
    music: './music/StolenDance.mp3',
  },
  {
    img: './images/BlindingLights.jpg',
    name: 'Blinding Lights',
    artist: 'The Weeknd',
    music: './music/BlindingLights.mp3',
  },
  {
    img: './images/WakeMeUp.jpg',
    name: 'Wake Me Up',
    artist: 'Avicii',
    music: './music/WakeMeUp.mp3',
  },
  {
    img: './images/September.jpg',
    name: 'September',
    artist: 'Earth, Wind & Fire',
    music: './music/September.mp3',
  },
  {
    img: './images/AroundTheWorld.jpg',
    name: 'Around the World',
    artist: 'Daft Punk',
    music: './music/AroundTheWorld.mp3',
  },
  {
    img: './images/StayinAlive.jpg',
    name: 'Stayin Alive',
    artist: 'Bee Gees',
    music: './music/StayinAlive.mp3',
  },
  {
    img: './images/DustInTheWind.jpg',
    name: 'Dust in the Wind',
    artist: 'Kansas',
    music: './music/DustInTheWind.mp3',
  },
  {
    img: './images/IGotYou.jpeg',
    name: 'I Got You',
    artist: 'James Brown',
    music: './music/IGotYou.mp3',
  },
];

const page = document.querySelector('.page');
const details = document.querySelector('.music-player__details');

const nowPlaying = document.querySelector('.music-player__now-playing');
const trackArt = document.querySelector('.music-player__track-art');
const trackName = document.querySelector('.music-player__track-name');
const trackArtist = document.querySelector('.music-player__track-artist');

const currentTimeText = document.querySelector('.music-player__current-time');
const totalDurationText = document.querySelector(
  '.music-player__total-duration'
);

const durationSlider = document.querySelector('.music-player__duration-slider');
const volumeSlider = document.querySelector('.music-player__volume-slider');

const prevTrackBtn = document.querySelector('.music-player__prev-track');
const nextTrackBtn = document.querySelector('.music-player__next-track');
const playpouseTrackBtn = document.querySelector(
  '.music-player__playpause-track'
);

const playIcon = document.querySelector('.fa-play-circle');
const volumeDownIcon = document.querySelector('.fa-volume-down');

const randomTrackBtn = document.querySelector('.music-player__random-track');
const repeatTrackBtn = document.querySelector('.music-player__repeat-track');

const wave = document.querySelector('.wave');

const currentTrack = document.createElement('audio');

let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let isRepeat = false;
let interval;

const resetCurrentTrackDuration = () => {
  currentTimeText.textContent = '00:00';
  durationSlider.value = 0;
};

const setDurationTimeText = (durationType, durationTextElement) => {
  let durationMinutes = Math.floor(durationType / 60);
  let durationSeconds = Math.floor(durationType - durationMinutes * 60);

  if (durationMinutes < 10) {
    durationMinutes = `0${durationMinutes}`;
  }

  if (durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`;
  }

  durationTextElement.textContent = `${durationMinutes}:${durationSeconds}`;
};

const setCurrentDuration = () => {
  currentTrack.currentTime =
    currentTrack.duration * (durationSlider.value / 100);
  setDurationTimeText(currentTrack.currentTime, currentTimeText);
};

const setCurrentVolume = () => {
  currentTrack.volume = volumeSlider.value / 100;
  if (currentTrack.volume === 0) {
    volumeDownIcon.classList.add('fa-volume-xmark');
  } else {
    volumeDownIcon.classList.remove('fa-volume-xmark');
  }
};

const setMinVolume = () => {
  volumeSlider.value = 0;
  setCurrentVolume();
};

const setMaxVolume = () => {
  volumeSlider.value = 100;
  setCurrentVolume();
};

const updateCurrentDuration = () => {
  durationSlider.value =
    currentTrack.currentTime * (100 / currentTrack.duration);
  setDurationTimeText(currentTrack.currentTime, currentTimeText);
};

const updateTotalDuration = () => {
  setDurationTimeText(currentTrack.duration, totalDurationText);
};

const loadTrack = (trackIndex) => {
  clearInterval(interval);
  resetCurrentTrackDuration();

  currentTrack.src = musicList[trackIndex].music;
  trackArt.style.backgroundImage = `url(${musicList[trackIndex].img})`;
  trackName.textContent = musicList[trackIndex].name;
  trackArtist.textContent = musicList[trackIndex].artist;

  nowPlaying.textContent = `Музыкальная композиция ${trackIndex + 1} из ${
    musicList.length
  }`;
  interval = setInterval(updateCurrentDuration, 1000);
};

const randomTrack = () => {
  if (isRandom) {
    isRandom = false;
    randomTrackBtn.classList.remove('music-player__button_active');
  } else {
    isRandom = true;
    randomTrackBtn.classList.add('music-player__button_active');
  }
};

const repeatTrack = () => {
  if (isRepeat) {
    isRepeat = false;
    repeatTrackBtn.classList.remove('music-player__button_active');
  } else {
    isRepeat = true;
    repeatTrackBtn.classList.add('music-player__button_active');
  }
};

const playpauseTrack = () => {
  isPlaying ? pauseTrack() : playTrack();
};

const playTrack = () => {
  currentTrack.play();
  isPlaying = true;
  trackArt.classList.add('music-player__track-art_rotate');
  wave.classList.add('wave_active');
  playIcon.classList.add('fa-pause-circle');
};

const pauseTrack = () => {
  currentTrack.pause();
  isPlaying = false;
  trackArt.classList.remove('music-player__track-art_rotate');
  wave.classList.remove('wave_active');
  playIcon.classList.remove('fa-pause-circle');
};

const nextTrack = () => {
  if (trackIndex < musicList.length - 1 && isRandom === false) {
    trackIndex++;
  } else if (trackIndex < musicList.length - 1 && isRandom === true) {
    trackIndex = Math.round(Math.random() * musicList.length);
  } else {
    trackIndex = 0;
  }
  loadTrack(trackIndex);
  playTrack();
};

const prevTrack = () => {
  if (trackIndex > 0) {
    trackIndex--;
  } else {
    trackIndex = musicList.length - 1;
  }
  loadTrack(trackIndex);
  playTrack();
};

loadTrack(trackIndex);

setCurrentVolume();

currentTrack.addEventListener('loadedmetadata', () => {
  updateTotalDuration();
});

currentTrack.addEventListener('ended', () => {
  if (isRepeat) {
    loadTrack(trackIndex);
    playTrack();
  } else {
    nextTrack();
  }
});
