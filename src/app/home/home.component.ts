import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor() { }

  player = {
    songs: [
      {
        name: "Canzone 1",
        file: "01",
      }, {
        name: "Canzone 2",
        file: "02",
      }, {
        name: "Canzone 3",
        file: "03",
      }, {
        name: "Canzone 4",
        file: "04",
      }, {
        name: "Canzone 5",
        file: "05",
      }, {
        name: "Canzone 6",
        file: "06",
      }, {
        name: "Canzone 7",
        file: "07",
      }, {
        name: "Canzone 8",
        file: "08",
      }, {
        name: "Canzone 9",
        file: "09",
      }, {
        name: "Canzone 10",
        file: "10",
      }
    ]
  }
  audio;

  //controls
  played = false;
  current_time = 0;
  mute = false;
  songRepeat = false;
  songRandom = false;

  //Keys
  song_first_key = 1;
  song_last_key = 10;

  //Song info
  current_song = 1;
  current_duration = 0;
  current_song_name = "";

  ngOnInit() {
    this.audio = new Audio();
    this.loadSong();
  };

  playPause(toggle) {
    console.log("playPause");
    if (!toggle) {
      if (this.played) {
        this.audio.play()
      } else {
        this.audio.pause();
      }
      return
    }
    if (this.played) {
      this.played = false
      this.audio.pause();
    } else {
      this.played = true
      this.audio.play();
    }
  };

  backward() {
    console.log("backward");
    if (this.audio.currentTime < 2) {
      if (this.randomSong()) { return }
      if (this.current_song == this.song_first_key) {
        this.current_song = this.song_last_key;
      } else {
        this.current_song = this.current_song - 1;
      }
    } else {
      this.audio.currentTime = 0;
    }
    this.loadSong();
  };

  forward() {
    console.log("forward");
    if (this.randomSong()) { return }
    if (this.current_song == this.song_last_key) {
      this.current_song = this.song_first_key;
    } else {
      this.current_song = this.current_song + 1;
    }
    this.loadSong();
  };

  /**
   * Random song
   */
  randomSong(){
    if (this.songRandom) {
      this.current_song = this.getRandomInt(this.song_first_key, this.song_last_key);
      this.loadSong();
      return true
    }
    return false
  }

  goToSong(song){
    var songID = parseInt(song);
    this.current_song = songID
    this.loadSong();
  }

  /**
   * Load song
   */
  loadSong() {
    console.log("loadSong");
    this.current_song_name = this.player.songs[this.current_song-1].name
    console.log(this.getFileName(this.current_song));
    this.audio.src = "../../../assets/songs/" + this.getFileName(this.current_song) + ".mp3";
    this.audio.load();
    this.playPause(false);
    this.songEvent();
  };


  songEvent() {
    this.audio.addEventListener("timeupdate", (currentTime) => {
      this.current_time = this.audio.currentTime;
    });

    this.audio.addEventListener("loadedmetadata", (meta) => {
      this.current_duration = meta.path[0].duration;
    });

    this.audio.addEventListener("ended", (state) => {
      this.forward();
    });
  };

  changeAudio() {
    this.mute = !this.mute;
    this.audio.volume = this.mute ? 0 : 1;
  };

  changeRandom() {
    this.songRandom = !this.songRandom;
    console.log(this.songRandom);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getFileName(file) {
    var songID = parseInt(file);
    var fileName = ""
    if (songID < 10) {
      fileName = "0" + songID
    } else {
      fileName = songID.toString()
    }
    return "track-" + fileName;
  }

}
