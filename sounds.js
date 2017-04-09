const sounds = {
  90: './sounds/Kick-808-Tone6-q.wav', // z
  88: './sounds/Kick-909-Tune10-i.wav', // x
  67: './sounds/Kick-90s-3.wav', // c
  86: './sounds/Kick-90s-2.wav', // v
  66: './sounds/Kick-Sub-909-Long.wav', // b
  78: './sounds/Kick-808-Thud.wav', // n
  77: './sounds/Kick-Big-Sine.wav', // m

  65: './sounds/Tom-505-ASR-1.wav', // a
  83: './sounds/Tom-505-ASR-2.wav', // s
  68: './sounds/Tom-505-ASR-3.wav', // d
  70: './sounds/Snare-BamVin.wav', // f
  71: './sounds/Snare-70s-MPC-1.wav', // g
  72: './sounds/Snare-Vinyl-01.wav', // h
  74: './sounds/Tom-DDD-Fatx-1.wav', // j
  75: './sounds/Tom-DDD-Fatx-2.wav', // k
  76: './sounds/Tom-DDD-Fatx-3.wav', // l

  81: './sounds/Hihat-505-ASR-Open.wav', //q
  87: './sounds/hey.wav', //w
  69: './sounds/Perc-Bolly-1.wav', //e
  82: './sounds/Tamb-ShortAndSolid.wav', //r
  84: './sounds/Cymbal-Boring.wav', //t
  89: './sounds/Cowbell-SP.wav', //y
  85: './sounds/Clap_BitNighties.wav', //u
  73: './sounds/Hihat-80sSpaceCraft-Closed.wav', //i
  79: './sounds/Ride-Real-SP-2.wav', //o
  80: './sounds/Cabassa SP.wav', //p
};

document.onkeydown = function(e) {
  let soundId = sounds[e.keyCode];
  let sound;
  if (soundId) {
    sound = new Howl({
      src: [soundId]
    });
  }
  sound.play();
};

//   90: 'bass1', // z
//   88: 'bass2', // x
//   67: 'bass3', // c
//   86: 'bass4', // v
//   66: 'bass5', // b
//   78: 'bass6', // n
//   77: 'bass7', // m
//
//   65: 'tom1', // a
//   83: 'tom2', // s
//   68: 'tom3', // d
//   70: 'snare1', // f
//   71: 'snare2', // g
//   72: 'snare3', // h
//   74: 'tom4', // j
//   75: 'tom5', // k
//   76: 'tom6', // l
//
//   81: 'hihat1', //q
//   87: 'hey', //w
//   69: 'perc-bolly', //e
//   82: 'tamb', //r
//   84: 'crash', //t
//   89: 'cowbell', //y
//   85: 'clap', //u
//   73: 'hihat2', //i
//   79: 'ride', //o
//   80: 'cabasppsa', //p
// };
