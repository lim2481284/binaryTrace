var products = [];
var order =[];
var customer_id=null;

function getProductById(id){
  for(var i = 0; i<products.length; i++){
    if(products[i].id == parseInt(id,10) ){
      return products[i];
    }
  }
  return {};
}

function addItemToOrder(item){
  for(var i = 0; i<order.length; i++){
    if(order[i].item.id == parseInt(item.id,10) ){
      order[i].quantity++
      return
    }
  }

  order.push({
    item:item,
    quantity:1
  });
  return
}

function getTotalPrice(){
  var sum = 0.00;
  for(var i = 0; i<order.length; i++){
    sum+=order[i].item.price*order[i].quantity;
  }
  return sum.toFixed(2);
}

$(document).ready(function(){

  api.getProducts(function(data){
    var items =[];
    products = data;
    items = data.map(function(o){
      return('<div class="col-sm-3 desc galleryItem">\
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
      addItemToOrder(item);

      var items = order.map(function(o){
        return('<tr>\
          <td> '+o.item.name+' </td>\
          <td> '+parseFloat(o.item.price*o.quantity).toFixed(2)+' </td>\
          <td> '+parseInt(o.quantity)+' </td>\
        </tr>')
      });
      items.unshift("<tr class='rowHeader'>\
        <th> Item Name </th>\
        <th> Price (RM) </th>\
        <th> Qty </th>\
      </tr>")

      $('.itemList').html(items);
      $('.orderTotal').html(getTotalPrice());
    });
  });

  $('.payBtn').on('click',function(){
    var items = order.map(function(o){
      return {product_id:o.item.id,quantity:o.quantity}
    });

    var orderItem = {
      customer_id:customer_id,
      products:items,
      timestamp:Date.now()
    }
    api.createOrder(orderItem, function(){
      alert('Order Created');
      order =[];
      $('.itemList').html("<tr class='rowHeader'>\
        <th> Item Name </th>\
        <th> Price (RM) </th>\
        <th> Qty </th>\
      </tr>");
      $('.orderTotal').html("0.00");
      trackingTask = tracking.track(video, tracker, { camera: true });
    });

    console.log(JSON.stringify(orderItem) );
  });

});
