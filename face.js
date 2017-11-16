var headers = {
    "app_id"          : "f85b9af0",
    "app_key"         : "ca64c4ea184e5e4ffed0349bf10922cb"
};

var currentFaceId = "";

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
            //console.log("Got Face");
            faceReco(image);
            //Need to compare with gallery
            //if no exist, send to backend, if exist, enroll
        }
        else if (response.Errors){
            console.log("No face");
            $('.loader').fadeOut();
            //$('.Failed').fadeIn();
            trackingTask = tracking.track(video, tracker, { camera: true });
        }
    });
}

function faceEnroll(image,id=null){
    var newUser = id==null;
    id?id:id=makeid();
    var payload  = {
        "image" : image,
        "subject_id":id,
        "gallery_name":"whaddahack"
    };
    var url = "http://api.kairos.com/enroll";

    $.get(api.url+'customer',{face_id:id}).done(function(data){
      if(data.length>0){
        customer_id = data[0].id;
        $('.Success').fadeOut();
        $('.SuccessMatch').fadeIn();
        $('.loader').fadeOut();

        api.getUserOrders(customer_id,function(data){
          var items = [];

          for(var i =0; i<data.length; i++){
            data[i].products.map(function(o){
              var product = getProductById(o.product_id);
              items.push('<tr>\
                <td> '+product.name+' </td>\
                <td> '+parseFloat(product.price*parseInt(o.quantity,10)).toFixed(2)+' </td>\
                <td> '+o.quantity+' </td>\
              </tr>');
            });
          }

          items.unshift("<tr class='rowHeader'>\
            <th> Item Name </th>\
            <th> Price (RM) </th>\
            <th> Qty </th>\
          </tr>");

          //alert(JSON.stringify(data) );
          $('.itemList2').html(items);
        });

      }else{
        //if no user face id found create customer
        $.post(api.url+'customer',{face_id:id}).done(function(data){
          console.log(data);
          customer_id = data.id;
          $('.Success').fadeOut();
          $('.Register').fadeIn();
          $('.loader').fadeOut();

          api.getUserOrders(customer_id,function(data){
            var items = [];

            for(var i =0; i<data.length; i++){
              data[i].products.map(function(o){
          			var product = getProductById(o.product_id);
          			items.push('<tr>\
          				<td> '+product.name+' </td>\
          				<td> '+parseFloat(product.price*parseInt(o.quantity,10)).toFixed(2)+' </td>\
                  <td> '+o.quantity+' </td>\
          			</tr>');
          		});
            }

            items.unshift("<tr class='rowHeader'>\
              <th> Item Name </th>\
              <th> Price (RM) </th>\
              <th> Qty </th>\
            </tr>");

            //alert(JSON.stringify(data) );
            $('.itemList2').html(items);
          });

        });
      }

    });

    $.ajax(url, {
        headers  : headers,
        type: "POST",
        data: JSON.stringify(payload),
        dataType: "json"
    }).done(function(response){
        console.log(response)
        $(document).trigger('captureFace');
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
        console.log(response);
        if (response.images[0].transaction.status=="success"){
            console.log("Face matches")
            var id=response.images[0].transaction.subject_id;
            faceEnroll(image,id)
        }
        else{
          $('.Success').fadeOut();
          $('.Register').fadeIn();
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
