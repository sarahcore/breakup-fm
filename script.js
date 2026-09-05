const tuneInButton = document.getElementById("tune-in");

const landingScreen = document.getElementById("landing");
const stationsScreen = document.getElementById("stations");

tuneInButton.addEventListener("click", function () {
    landingScreen.classList.remove("active");
    stationsScreen.classList.add("active");
});
const station01Button = document.getElementById("station-01");
const playerScreen = document.getElementById("player");

station01Button.addEventListener("click", function () {
    stationsScreen.classList.remove("active");
    playerScreen.classList.add("active");
});
const viewQueueButton = document.getElementById("view-queue");
const queueScreen = document.getElementById("queue");
const backToPlayerButton = document.getElementById("back-to-player");

viewQueueButton.addEventListener("click", function () {
    playerScreen.classList.remove("active");
    queueScreen.classList.add("active");
});

backToPlayerButton.addEventListener("click", function () {
    queueScreen.classList.remove("active");
    playerScreen.classList.add("active");
});
const changeStationButton = document.getElementById("change-station");

changeStationButton.addEventListener("click", function () {
    playerScreen.classList.remove("active");
    stationsScreen.classList.add("active");
});
const playlist = [
    {
        title: "Someone Real",
        artist: "Jenna Jay",
        file: "music/song1.mp3"
    },
    {
        title: "YOU MOVED ON, I CAN'T",
        artist: "DJ Endre",
        file: "music/song2.mp3"
    },
    {
        title: "Broken Heart",
        artist: "Allerlei von Nicolai",
        file: "music/song3.mp3"
    }

];

let currentSong = 0;

const audio = new Audio(playlist[currentSong].file);
const playPauseButton = document.getElementById("play-pause");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");

const prevSongButton = document.getElementById("prev-song");
const nextSongButton = document.getElementById("next-song");

function loadSong(index) {
    audio.src = playlist[index].file;

    songTitle.textContent = playlist[index].title;
    songArtist.textContent = playlist[index].artist;

    audio.load();

    updateQueue();
}

playPauseButton.addEventListener("click", function () {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = "⏸";
    } else {
        audio.pause();
        playPauseButton.textContent = "▶";
    }
});const progressBar = document.getElementById("progress-bar");
const currentTimeText = document.getElementById("current-time");
const durationText = document.getElementById("duration");

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

audio.addEventListener("loadedmetadata", function () {
    progressBar.max = audio.duration;
    durationText.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", function () {
    progressBar.value = audio.currentTime;
    currentTimeText.textContent = formatTime(audio.currentTime);
});

progressBar.addEventListener("input", function () {
    audio.currentTime = progressBar.value;
});
nextSongButton.addEventListener("click", function () {
    currentSong++;

    if (currentSong >= playlist.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    audio.play();
    playPauseButton.textContent = "⏸";
});

prevSongButton.addEventListener("click", function () {
    currentSong--;

    if (currentSong < 0) {
        currentSong = playlist.length - 1;
    }

    loadSong(currentSong);
    audio.play();
    playPauseButton.textContent = "⏸";
});

audio.addEventListener("ended", function () {
    currentSong++;

    if (currentSong >= playlist.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    audio.play();
    playPauseButton.textContent = "⏸";
});
const queueList = document.getElementById("queue-list");

function updateQueue() {
    queueList.innerHTML = "";

    playlist.forEach(function (song, index) {
        const songItem = document.createElement("p");

        if (index === currentSong) {
            songItem.textContent =
                `▶ ${String(index + 1).padStart(2, "0")} — ${song.title} — ${song.artist}`;

            songItem.classList.add("current-song");
        } else {
            songItem.textContent =
                `${String(index + 1).padStart(2, "0")} — ${song.title} — ${song.artist}`;
        }

        queueList.appendChild(songItem);
    });
}
loadSong(currentSong);