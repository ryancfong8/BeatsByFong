var modal = document.getElementById('i-modal');

// Get the button that opens the modal
var open = document.getElementById("instructions");

// Get the <span> element that closes the modal
var close = document.getElementById("close-modal");

// When the user clicks on the button, open the modal
open.onclick = function() {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
close.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

const sounds = {
  90: './sounds/Kick-808-Tone6-q.wav', // z
  88: './sounds/Kick-909-Tune10-i.wav', // x
  67: './sounds/Kick-90s-3.wav', // c
  86: './sounds/Kick-90s-2.wav', // v
  66: './sounds/Kick-Sub-909-Long.wav', // b
  78: './sounds/Kick-808-Thud.wav', // n
  77: './sounds/Kick-Big-Sine.wav', // m

  65: './sounds/Tom-DMX-Fatso-1.wav', // a
  83: './sounds/Tom-DMX-Fatso-2.wav', // s
  68: './sounds/Tom-DMX-Fatso-3.wav', // d
  70: './sounds/Tom-DMX-Fatso-4.wav', // f
  71: './sounds/Tom-DMX-Fatso-5.wav', // g
  72: './sounds/Tom-DMX-Fatso-6.wav', // h
  74: './sounds/SnareClap-Disco.wav', // j
  75: './sounds/Snare-70s-MPC-1.wav', // k
  76: './sounds/Snare-Vinyl-01.wav', // l

  81: './sounds/Hihat-505-ASR-Open.wav', //q
  87: './sounds/Snap-SP.wav', //w
  69: './sounds/Perc-Bolly-1.wav', //e
  82: './sounds/Tamb-ShortAndSolid.wav', //r
  84: './sounds/Cymbal-Boring.wav', //t
  89: './sounds/Cowbell-SP.wav', //y
  85: './sounds/Clap-BitNighties.wav', //u
  73: './sounds/Hihat-80sSpaceCraft-Closed.wav', //i
  79: './sounds/Ride-Real-SP-2.wav', //o
  80: './sounds/Cabassa-SP.wav', //p

  49: './sounds/one.wav', //1
  50: './sounds/two.wav',//2
  51: './sounds/three.wav', //3
  52: './sounds/jump.wav',//4
  53: './sounds/yeah.wav', //5
  54: './sounds/yeah2.wav',//6
  55: './sounds/what.wav',//7
  56: './sounds/okay.wav', //8
  57: './sounds/hey.wav', //9
  48: './sounds/go.wav' //0
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
    const analyser2 = audioCtx.createAnalyser();
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
        source.loop = false;
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
        source2.connect(analyser2);
        source2.connect(audioCtx.destination);
        source2.loop = false;
      },

      function(e){ console.log("Error with decoding audio data" + e.err); });

  };

  request.send();
}


// audioSrc.connect(analyser);
// audioSrc.connect(audioCtx.destination);



  // let svgHeight = '1500';
  // let svgWidth = '1800';
  // let barPadding = '1';

  // function createSvg(parent, height, width) {
  //   return d3.select(parent).append('svg').attr('height', height).attr('width', width);
  // }

  // function createSvg(parent, height, width) {
  //   return d3.select(parent).append('svg').attr('height', height).attr('width', width);
  // }

  let svg = d3.select('#svg-container')
    .append('svg')
    // .attr("preserveAspectRatio", "xMinYMin meet")
    // .attr("viewBox", "0 0 600 400")
    .attr('width', 1000)
    .attr('height', 1000)
    .classed("svg-content-responsive", true);


  // let svg = createSvg('body', svgHeight, svgWidth);




      // const theta = [0, Math.PI / 12,
      //   Math.PI / 6,
      //   Math.PI / 4,
      //   Math.PI / 3,
      //   5 * (Math.PI / 12),
      //   Math.PI / 2,
      //   7 * (Math.PI / 12),
      //   2 * (Math.PI / 3),
      //   3 * (Math.PI / 4),
      //   5 * (Math.PI / 6),
      //   11 * (Math.PI / 12),
      //   Math.PI,
      //   13 * (Math.PI / 12),
      //   7 * (Math.PI / 6),
      //   5 * (Math.PI / 4),
      //   4 * (Math.PI / 3),
      //   17 * (Math.PI / 12),
      //   3 * (Math.PI / 2),
      //   19 * (Math.PI / 12),
      //   5 * (Math.PI / 3),
      //   7 * (Math.PI / 4),
      //   11 * (Math.PI / 6),
      //   23 * (Math.PI / 12)];

    function angles(n) {
      let result = {};
      for (let i = 0; i < n; i++) {
        result[i] = ((i* 2* Math.PI) / n) + (3 * (Math.PI/2));
      }
      return result;
    }

    const bars = 150;
    const polygons = 50;
    let frequencyData = new Uint8Array(bars + 25);
    let frequencyData2 = new Uint8Array(polygons);

    const theta = angles(bars);
    const theta2 = angles(polygons);

    const radius = 300;
    const barRadius = radius - 250;
    const ellipseRadius = radius + 50;

    let cx = 500;
    let cy = 500;

  svg.selectAll('rect')
     .data(frequencyData.slice(25))
     .enter()
     .append('rect')
     .attr('x', function (d, i) {
        return cx + Math.round(barRadius * (Math.cos(theta[i])));
     })
     .attr('y', function (d, i) {
        return cy + Math.round(barRadius * (Math.sin(theta[i])));
     })
     .attr('transform', function (d, i) {
       return 'rotate(' + (i *(360/bars) + 180) + ',' + (cx + Math.round((barRadius) * (Math.cos(theta[i])))) + ',' + (cy + Math.round((barRadius) * (Math.sin(theta[i])))) + ')'
      //  return 'rotate(' + (i *(360/24)) + ',' + (600 + Math.round(radius * (Math.cos(theta[i])))) + ',' + (600 + Math.round(radius * (Math.sin(theta[i])))) + ')'
     })
     .attr('width', Math.PI * (barRadius) * 2 / bars); //- barPadding);

  svg.selectAll('circle')
      .data(frequencyData)
      .enter()
      .append('circle')
      .attr("cx", cx)
      .attr("cy", cy);

  svg.selectAll('ellipse')
    .data(frequencyData2)
    .enter()
    .append('ellipse')
    .attr('x', function (d, i) {
       return cx + Math.round(ellipseRadius * (Math.cos(theta2[i])));
    })
    .attr('y', function (d, i) {
       return cy + Math.round(ellipseRadius * (Math.sin(theta2[i])));
    })
    .attr("rx", 0)
    .attr("ry", 0);

  function renderChart() {
    requestAnimationFrame(renderChart);

    analyser.getByteFrequencyData(frequencyData);
    analyser2.getByteFrequencyData(frequencyData2);
    // console.log(frequencyData);

    svg.selectAll('rect')
      .data(frequencyData.slice(25))
      // .attr('y', function(d) {
      //   return svgHeight - d;
      // })
      .attr('height', function(d) {
        // let d1 = d - 50;
        return d > 0 ? d + 130 : d;
      })
      .attr('fill', function(d) {
        return 'rgb( 255,' + (d) + ', 50)';
      });


    svg.selectAll('circle')
      .data(frequencyData)
      .attr('r', function(d) {
        return d * .75;
      })
      .attr('fill', function(d) {
        return 'rgb( 0, ' + (d) + ', ' + (d) + ')';
      });

    svg.selectAll('circle')
      .data(frequencyData.slice(6,11))
      .attr('r', function(d) {
        return d * 1.1;
      })
      .attr('fill', function(d) {
        return 'rgb( 0, 0, ' + (d) + ')';
      });

      if (source) {
        $('#yeah').prop('disabled', true);
        $('#audien').prop('disabled', true);
        $('#turn').prop('disabled', true);
        $('#levels').prop('disabled', true);
        $('#inception').prop('disabled', true);
        $('#slow').prop('disabled', true);
        $('#against').prop('disabled', true);
        $('#300').prop('disabled', true);
        $('#stop').prop('disabled', false);
      }
      else {
        $('#yeah').prop('disabled', false);
        $('#audien').prop('disabled', false);
        $('#turn').prop('disabled', false);
        $('#levels').prop('disabled', false);
        $('#inception').prop('disabled', false);
        $('#slow').prop('disabled', false);
        $('#against').prop('disabled', false);
        $('#300').prop('disabled', false);
        $('#stop').prop('disabled', true);
      }

      // console.log(frequencyData);
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
    sound.play();
    $('#title').toggleClass('title-animation');
  };

  document.onkeyup = function(e) {
    $('#title').toggleClass('title-animation');
  }

  $('#yeah').click(function() {
    getData1('yeah');
    source.start(0);
    $("#status").text("Status: Playing");

  });

  $('#audien').click(function() {
    getData1('audien');
    source.start(0);
      $("#status").text("Status: Playing");

  });

  $('#turn').click(function() {
    getData1('turn');
    source.start(0);
      $("#status").text("Status: Playing");

  });

  $('#levels').click(function() {
    getData1('levels');
    source.start(0);
      $("#status").text("Status: Playing");

  });

  $('#inception').click(function() {
    getData1('inception');
    source.start(0);
      $("#status").text("Status: Playing");

  });
  $('#slow').click(function() {
    getData1('slow');
    source.start(0);
      $("#status").text("Status: Playing");

  });
  $('#against').click(function() {
    getData1('against');
    source.start(0);
      $("#status").text("Status: Playing");

  });
  $('#300').click(function() {
    getData1('300');
    source.start(0);
      $("#status").text("Status: Playing");

  });

  $('#stop').click(function() {
      if (source) source.stop(0);
      if (source2) source2.stop(0);
      if (source) source = null;
      if (source2) source2 = null;
      $("#status").text("Status: Stopped");
  });

  renderChart();
});
