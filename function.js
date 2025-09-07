if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log('Service Worker Registered'))
    .catch(err => console.log('Service Worker Failed:', err));
}


document.getElementById('minimize').addEventListener('click', () => {
    window.electronAPI.minimize();
});

document.getElementById('close').addEventListener('click', () => {
    window.electronAPI.close();
});


//for music

// ======== SELECT ELEMENTS ========
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("reverse");
const stopBtn = document.getElementById("stop");

const albumCover = document.getElementById("albumcover");
const songTitle = document.querySelector(".song_title");
const singer = document.querySelector(".singer");

const progressContainer = document.querySelector(".progress_container");
const progressBar = document.querySelector(".progress");
const startTime = document.querySelector(".start");
const endTime = document.querySelector(".end");

const playlistContainer = document.getElementById("playlist_container");

// ======== SONG LIST ========
const songs = [
  {
    title: "Big Girls Don't Cry",
    artist: "Fergie",
    src: "music/big girls dont cry.mp3",
    cover: "music/maroon.jpg"
  },
  {
    title: "Cool About It",
    artist: "boygenius",
    src: "music/cool about it.mp3",
    cover: "music/cool.jpg"
  },
  {
    title: "Margaret",
    artist: "Lana Del Rey",
    src: "music/margaret.mp3",
    cover: "music/margaret.jpg"
  },
  {
    title: "Need You Now",
    artist: "Lady Antebellum",
    src: "music/need you know.mp3",
    cover: "music/need.jpg"
  },
  {
    title: "Out of Reach",
    artist: "Gabrielle",
    src: "music/out of reach.mp3",
    cover: "music/out.jpg"
  },
  {
    title: "Sway",
    artist: "Bic Runga",
    src: "music/sway.mp3",
    cover: "music/sway.jpg"
  },
  {
    title: "When She Cries",
    artist: "Restless Heart",
    src: "music/when she cries.mp3",
    cover: "music/when.jpg"
  }
];

// ======== STATE ========
let songIndex = 0;
let isPlaying = false;

// ======== LOAD SONG ========
function loadSong(index) {
  const song = songs[index];
  songTitle.textContent = song.title;
  singer.textContent = song.artist;
  audio.src = song.src;
  albumCover.style.backgroundImage = `url('${song.cover}')`;

  // Update active playlist item
  document.querySelectorAll(".playlist_item").forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });
}

// ======== PLAY / PAUSE ========
function playSong() {
  isPlaying = true;
  playBtn.textContent = "⏸";
  audio.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.textContent = "▶";
  audio.pause();
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// ======== NEXT & PREVIOUS ========
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// ======== STOP ========
stopBtn.addEventListener("click", () => {
  pauseSong();
  audio.currentTime = 0;
});

// ======== UPDATE PROGRESS ========
audio.addEventListener("timeupdate", () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
  startTime.textContent = formatTime(audio.currentTime);
  endTime.textContent = formatTime(audio.duration);
});

// Click to seek
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

// ======== FORMAT TIME ========
function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// ======== AUTOPLAY NEXT ========
audio.addEventListener("ended", nextSong);

// ======== GENERATE PLAYLIST ========
function createPlaylist() {
  playlistContainer.innerHTML = "";
  songs.forEach((song, index) => {
    const item = document.createElement("div");
    item.classList.add("playlist_item");
    item.dataset.index = index;
    item.innerHTML = `
      <div class="track_info">
        <p class="title">${song.title}</p>
        <p class="artist">${song.artist}</p>
      </div>
    `;
    item.addEventListener("click", () => {
      songIndex = index;
      loadSong(songIndex);
      playSong();
    });
    playlistContainer.appendChild(item);
  });
}

// ======== INIT ========
createPlaylist();
loadSong(songIndex);
