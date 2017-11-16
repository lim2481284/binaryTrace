
var video = document.querySelector('#videoElement');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var tracker = new tracking.ObjectTracker('face');
var trackingTask ={};
var localMediaStream = null;

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;


function handleVideo(stream) {
    video.src = window.URL.createObjectURL(stream);
    localMediaStream = stream;
}

function videoError(e) {
    console.log('foi malz', e);
}

function snapshot() {
  if (localMediaStream) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);
    //document.querySelector('#saida').src = canvas.toDataURL('image/jpeg', 1.0);
    var faceImageUrl=canvas.toDataURL('image/jpeg', 1.0)
    $('.Failed').fadeOut();
    $('.Success').fadeIn();
    faceDetect(faceImageUrl)
  }
}

$(document).ready(function(){
    if (navigator.getUserMedia) {
        navigator.getUserMedia({audio: false, video: true}, handleVideo, videoError);
    }

    $('.statusBox').hide();
    $('.loader').hide();

    trackingTask = tracking.track(video, tracker, { camera: true });
    tracker.on('track', function(event) {
      if (event.data.length!=0){
        setTimeout(function () {
          trackingTask.stop();
          console.log('Tracking Stopped');
        }, 100);
        $('.loader').fadeIn();
        $('.statusBox').fadeOut();
        snapshot();
      } else {
        $('.Failed').fadeIn();
      }
    });
    //setInterval(function(){snapshot();},5000)
    //snapshot();
    //$(document).on('captureFace',function(){snapshot();});

    // Demo
    /*$(snapshotbut).click(function(){
        snapshot();
    })
    $(comparebut).click(function(){
        compare();
    })
    $(removebut).click(function(){
        faceRemove($(removeID).val())
    })
    $(viewbut).click(function(){
        viewGallery();
    });
    $(viewsubbut).click(function(){
        viewSubject($(removeID).val())
    })*/
})
