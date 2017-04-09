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

$(document).ready( function () {
    // let audioElement = document.getElementById('audioElement');
    // audioElement.crossOrigin = "anonymous";
    // audioElement.setAttribute('src', './audio/audien1.mp3');
    // audioElement.setAttribute('id', 'audioElement');

    // audioElement.addEventListener('ended', function() {
    //     this.play();
    // }, false);
    //
    // audioElement.addEventListener("canplay",function(){
    //     $("#length").text("Duration:" + audioElement.duration + " seconds");
    //     $("#source").text("Source:" + audioElement.src);
    //     $("#status").text("Status: Ready to play").css("color","green");
    // });
    //
    // audioElement.addEventListener("timeupdate",function(){
    //     $("#currentTime").text("Current second:" + audioElement.currentTime);
    // });

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    let source;
    let source2;



    // $('#restart').click(function() {
    //     audioElement.currentTime = 0;
    // });

// let audioSrc = audioCtx.createMediaElementSource(audioElement);
function getData1(sound) {
  source = audioCtx.createBufferSource();
  let request = new XMLHttpRequest();

  request.open('GET', `./audio/${sound}.mp3`, true);

  request.responseType = 'arraybuffer';


  request.onload = function() {
    let audioData = request.response;

    audioCtx.decodeAudioData(audioData, function(buffer) {
        source.buffer = buffer;

        source.connect(analyser);
        source.connect(audioCtx.destination);
        source.loop = true;
      },

      function(e){ console.log("Error with decoding audio data" + e.err); });

  };

  request.send();
}
function getData2(sound) {
  source2 = audioCtx.createBufferSource();
  let request = new XMLHttpRequest();

  request.open('GET', `${sound}`, true);

  request.responseType = 'arraybuffer';


  request.onload = function() {
    let audioData = request.response;

    audioCtx.decodeAudioData(audioData, function(buffer) {
        source2.buffer = buffer;

        source2.connect(analyser);
        source2.connect(audioCtx.destination);
        source2.loop = false;
      },

      function(e){ console.log("Error with decoding audio data" + e.err); });

  };

  request.send();
}


// audioSrc.connect(analyser);
// audioSrc.connect(audioCtx.destination);

let frequencyData = new Uint8Array(200);

  let svgHeight = '1030';
  let svgWidth = '1800';
  // let barPadding = '1';

  // function createSvg(parent, height, width) {
  //   return d3.select(parent).append('svg').attr('height', height).attr('width', width);
  // }

  function createSvg(parent, height, width) {
    return d3.select(parent).append('svg').attr('height', height).attr('width', width);
  }



  let svg = createSvg('body', svgHeight, svgWidth);

  svg.selectAll('circle')
     .data(frequencyData)
     .enter()
     .append('circle')
     .attr("cx", 600)
     .attr("cy", 370);

   svg.selectAll('circle')
      .data(frequencyData.slice(6, 11))
      .enter()
      .append('circle')
      .attr("cx", 700)
      .attr("cy", 400);

  svg.selectAll('rect')
     .data(frequencyData)
     .enter()
     .append('rect')
     .attr('x', function (d, i) {
        return i * (svgWidth / frequencyData.length);
     })
     .attr('width', svgWidth / frequencyData.length); //- barPadding);

  function renderChart() {
    requestAnimationFrame(renderChart);

    analyser.getByteFrequencyData(frequencyData);
    // console.log(frequencyData);

    svg.selectAll('rect')
      .data(frequencyData)
      .attr('y', function(d) {
        return svgHeight - d;
      })
      .attr('height', function(d) {
        return d;
      })
      .attr('fill', function(d) {
        return 'rgb( 0, 0, ' + (d) + ')';
      });


    svg.selectAll('circle')
      .data(frequencyData)
      .attr('r', function(d) {
        return d;
      })
      .attr('fill', function(d) {
        return 'rgb( 0, ' + (d) + ', ' + (d) + ')';
      });

    svg.selectAll('circle')
      .data(frequencyData.slice(6,11))
      .attr('r', function(d) {
        return 1.5*d;
      })
      .attr('fill', function(d) {
        return 'rgb( 0, 0, ' + (d) + ')';
      });
  }

  document.onkeydown = function(e) {
    let soundId = sounds[e.keyCode];
    let sound;
    if (soundId) {
      sound = new Howl({
        src: [soundId]
      });
    }
    getData2(soundId);
    source2.start(0);
  };

  $('#play').click(function() {
    getData1('slow');
    source.start(0);
      $("#status").text("Status: Playing");
  });

  $('#pause').click(function() {
      source.stop(0);
      $("#status").text("Status: Stopped");
  });

  renderChart();
});
