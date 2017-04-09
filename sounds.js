const sounds = {
  90: 'bass1', // z
  88: 'bass2', // x
  67: 'bass3', // c
  86: 'bass4', // v
  66: 'bass5', // b
  78: 'bass6', // n
  77: 'bass7', // m

  65: 'tom1', // a
  83: 'tom2', // s
  68: 'tom3', // d
  70: 'snare1', // f
  71: 'snare2', // g
  72: 'snare3', // h
  74: 'tom4', // j
  75: 'tom5', // k
  76: 'tom6', // l

  81: 'hihat1', //q
  87: 'hey', //w
  69: 'perc-bolly', //e
  82: 'tamb', //r
  84: 'crash', //t
  89: 'cowbell', //y
  85: 'clap', //u
  73: 'hihat2', //i
  79: 'ride', //o
  80: 'cabasppsa', //p
};

document.onkeydown = function(e) {
    let soundId = sounds[e.keyCode];
    if (soundId) document.getElementById(soundId).play();
    else console.log("key not mapped : code is", e.keyCode);
};
