import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  audio;
  played = false;
  current_song = 0;
  current_duration = 0;
  current_time = 0;

  ngOnInit() {
    this.audio = new Audio();
    this.loadSong();
  }

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
  }

  backward() {
    console.log("backward");
    if (this.audio.currentTime < 2) {
      if (this.current_song == 0) {
        this.current_song = 2;
      } else {
        this.current_song = this.current_song - 1;
      }
    } else {
      this.audio.currentTime = 0;
    }
    this.loadSong();
  }

  forward() {
    console.log("forward");
    if (this.current_song == 2) {
      this.current_song = 0;
    } else {
      this.current_song = this.current_song + 1;
    }
    this.loadSong();
  }

  loadSong() {
    console.log("loadSong");
    this.audio.src = "../../../assets/songs/song_" + this.current_song + ".mp3";
    this.audio.load();
    this.playPause(false);
    this.getPercentProg();
  }


  getPercentProg() {
    this.audio.addEventListener("timeupdate", (currentTime) => {
      this.current_time = this.audio.currentTime;
    });

    this.audio.addEventListener("loadedmetadata", (meta) => {
      this.current_duration = meta.path[0].duration;
    });

    this.audio.addEventListener("ended", (state) => {
      this.forward();
    });
  }

  changeTime(value) {
    this.audio.currentTime = value;
  }

}
