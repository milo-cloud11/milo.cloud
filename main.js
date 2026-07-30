window.onload = function () {

var button = document.getElementById("button");
var next_button = document.getElementById("next_button");
var prev_button = document.getElementById("prev_button");
var audio = document.getElementById("player");
var source = document.getElementById('audiosrc');

button.addEventListener("click", function(){
  if(audio.paused){
    audio.volume = 0.5;
    audio.loop = true;
    audio.play();
    button.src='imgs/pause.png';
  } else {
    audio.pause();
    button.src='imgs/play.png';
  }
});

next_button.addEventListener("click", function(){
  audio.pause();
  audio.src = "mp3s/Bad_One.mp3";
  audio.load();
  audio.play();
  /*if(audio.paused){
    audio.volume = 0.5;
    audio.loop = true;
    audio.play();
    button.src='imgs/pause.png';
  } */
});

prev_button.addEventListener("click", function(){
  if(audio.paused){
    audio.volume = 0.5;
    audio.loop = true;
    audio.play();
    button.src='imgs/pause.png';
  } else {
    audio.pause();
    button.src='imgs/play.png';
  }
});
};