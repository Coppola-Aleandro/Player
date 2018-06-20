import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor() {

  }

  player = {
    songs: [
      new Song(0, "Canzone 1", "01"),
      new Song(1, "Canzone 2", "02"),
      new Song(2, "Canzone 3", "03"),
      new Song(3, "Canzone 4", "04"),
      new Song(4, "Canzone 5", "05"),
      new Song(5, "Canzone 6", "06"),
      new Song(6, "Canzone 7", "07"),
      new Song(7, "Canzone 8", "08"),
      new Song(8, "Canzone 9", "09"),
      new Song(9, "Canzone 10", "10"),
    ]
  }
  audio;

  //controls
  played = false;
  current_time = 0;
  mute = false;
  songRepeat = false;
  song_random = false;

  //Song info
  song;
  song_index;

  ngOnInit() {
    this.audio = new Audio();
    this.song_index = 0;
    this.loadSong();
  };


 /**
   * Load song
   */
  loadSong() {
    if(this.player.songs[this.song_index] == null) {
      return
    }
    console.log("loadSong");
    this.song = this.player.songs[this.song_index];
    console.log(this.song.getSongFileName());
    this.audio.src = "../../../assets/songs/" + this.song.getSongFileName() + ".mp3";
    this.audio.load();
    this.playPause(false);
    this.songEvent();
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
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.played = !this.played;
  };

  backward() {
    console.log("backward");
    if (this.audio.currentTime < 2) {
      if (this.randomSong()) { return }

      if (this.song_index == 0) {
        this.song_index = this.player.songs.length - 1;
      } else {
        this.song_index = this.song_index - 1;
      }
    }
    this.audio.currentTime = 0;
    this.loadSong();
  };

  forward() {
    console.log("forward");
    if (this.randomSong()) { return }
    if (this.song_index == this.player.songs.length - 1) {
      this.song_index = 0;
    } else {
      this.song_index = this.song_index + 1;
    }
    this.loadSong();
  };

  /**
   * Random song
   */
  randomSong(){
    if (this.song_random) {
      this.song_index = this.getRandomInt(0, this.player.songs.length - 1);
      this.loadSong();
      return true
    }
    return false
  }

  goToSong(song: Song){
    this.song_index = song.song_id;
    this.loadSong();
  }

  songEvent() {
    this.audio.addEventListener("timeupdate", (currentTime) => {
      this.current_time = this.audio.currentTime;
    });

    this.audio.addEventListener("loadedmetadata", (meta) => {
      this.song.song_duration = meta.path[0].duration;
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
    this.song_random = !this.song_random;
    console.log(this.song_random);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

class Song {
  song_id: Int8Array;
  song_name: string;
  song_file: string;
  song_duration: Float32Array;
  constructor(song_id, song_name, song_file){
    this.song_id = song_id;
    this.song_name = song_name;
    this.song_file = song_file;
  }

  getSongNumber(){
    return parseInt(this.song_file);
  }

  getSongFileName(){
    return "track-"+this.song_file;
  }
}
