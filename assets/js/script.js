var products = [];
var order =[];

function getProductById(id){
  for(var i = 0; i<products.length; i++){
    if(products[i].id == parseInt(id,10) ){
      return products[i];
    }
  }
  return {};
}

$(document).ready(function(){

  api.getProducts(function(data){
    var items =[];
    products = data;
    data.map(function(o){
      items.push('<div class="col-sm-3 desc galleryItem">\
        <div class="project-wrapper">\
          <div class="project">\
            <div class="photo-wrapper">\
              <div class="photo">\
                <a class="fancybox catalogue-item" data-id="'+o.id+'" >\
                  <img class="img-responsive" src="'+o.image_url+'" alt="'+o.name+'">\
                </a>\
              </div>\
              <div class="overlay"></div>\
            </div>\
          </div>\
        </div>\
      </div>');
    });

    $('#catalogue').html(items);

    $('.catalogue-item').on('click',function(e){
      var item = getProductById($(this).data('id'));
      console.log(item);
    });
  });
});
