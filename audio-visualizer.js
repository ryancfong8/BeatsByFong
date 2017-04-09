

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

    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let analyser = audioCtx.createAnalyser();
    let source;
    let source2;



    // $('#restart').click(function() {
    //     audioElement.currentTime = 0;
    // });

// let audioSrc = audioCtx.createMediaElementSource(audioElement);
function getData() {
  source = audioCtx.createBufferSource();
  let request = new XMLHttpRequest();

  request.open('GET', './audio/turn.mp3', true);

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

  $('#play').click(function() {
    getData();
    source.start(0);
      $("#status").text("Status: Playing");
  });

  $('#pause').click(function() {
      source.stop(0);
      $("#status").text("Status: Stopped");
  });

  renderChart();
});
