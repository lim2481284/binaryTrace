
var video = document.querySelector('#videoElement');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
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
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;

    ctx.drawImage(video, 0, 0);
    document.querySelector('#saida').src = canvas.toDataURL('image/jpeg', 1.0);
    var faceImageUrl=canvas.toDataURL('image/jpeg', 1.0)
    faceDetect(faceImageUrl)
  }
}

$(document).ready(function(){
    if (navigator.getUserMedia) {
        navigator.getUserMedia({audio: false, video: true}, handleVideo, videoError);
    }

    //setInterval(function(){snapshot();},5000)


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
