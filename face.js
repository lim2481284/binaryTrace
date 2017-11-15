var headers = {
    "app_id"          : "f85b9af0",
    "app_key"         : "ca64c4ea184e5e4ffed0349bf10922cb"
};



function faceDetect(image){   
    var payload  = { "image" : image };
    var url = "http://api.kairos.com/detect";

    $.ajax(url, {
        headers  : headers,
        type: "POST",
        data: JSON.stringify(payload),
        dataType: "json"
    }).done(function(response){
        if (response.images){
            console.log("Got Face");
            faceReco(image);
            //Need to compare with gallery
            //if no exist, send to backend, if exist, enroll
        }
        else if (response.Errors){
            console.log("No face")
        }
    });
}

function faceEnroll(image,id=null){
    id?id:id=makeid();
    var payload  = { 
        "image" : image,
        "subject_id":id,
        "gallery_name":"whaddahack"
    };
    var url = "http://api.kairos.com/enroll";

    $.ajax(url, {
        headers  : headers,
        type: "POST",
        data: JSON.stringify(payload),
        dataType: "json"
    }).done(function(response){
        console.log(response)
        //Here need to bind the faceid to current 
    });
}

function faceReco(image){
    var payload  = { 
        "image" : image,
        "gallery_name":"whaddahack"
    };
    var url = "http://api.kairos.com/recognize";

    $.ajax(url, {
        headers  : headers,
        type: "POST",
        data: JSON.stringify(payload),
        dataType: "json"
    }).done(function(response){
        if (response.images[0].transaction.status=="success"){
            console.log("Face matches")
            var id=response.images[0].transaction.subject_id;
            faceEnroll(image,id)
        }
        else{
            faceEnroll(image)
        }
    });
}

function faceRemove(id){
    var payload  = { 
        "subject_id":id,
        "gallery_name":"whaddahack"
    };
    var url = "http://api.kairos.com/gallery/remove_subject";

    $.ajax(url, {
        headers  : headers,
        type: "POST",
        data: JSON.stringify(payload),
        dataType: "json"
    }).done(function(response){
        console.log(response)
    });
}

function viewGallery(){
    var payload  = { 
        "gallery_name":"whaddahack"
    };
    var url = "http://api.kairos.com/gallery/view";

    $.ajax(url, {
        headers  : headers,
        type: "POST",
        data: JSON.stringify(payload),
        dataType: "json"
    }).done(function(response){
        console.log(response)
    });
}

function viewSubject(id){
    var payload  = { 
        "gallery_name":"whaddahack",
        "subject_id":id
    };
    var url = "http://api.kairos.com/gallery/view_subject";

    $.ajax(url, {
        headers  : headers,
        type: "POST",
        data: JSON.stringify(payload),
        dataType: "json"
    }).done(function(response){
        console.log(response)
    });
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 32; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}