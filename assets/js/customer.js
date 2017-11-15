var products = [];
var order ={};

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
  for(var i = 0; i<order.products.length; i++){
    sum+=getProductById(order.products[i].product_id).price*order.products[i].quantity;
  }
  return sum.toFixed(2);
}

$(document).ready(function(){
	 $(".purchase").click(function(){
		 $(".purchase").attr('class','purchase active');
		 $(".recommended").attr('class','recommended ');
		 $('.recommendedSection').hide();
		 $('.purchaseSection').show();
	 });
	 $(".recommended").click(function(){
		 $(".purchase").attr('class','purchase ');
		 $(".recommended").attr('class','recommended active');
		 $('.recommendedSection').show();
		 $('.purchaseSection').hide();
	 });

	 api.getProducts(function(data){
		 products = data;
		 updateOrder();
	 });


});


setInterval(updateOrder, 10000);

function updateOrder(){
	api.getLastOrder(function(data){
		order = data[0];
		var items = [];

		items = order.products.map(function(o){
			var product = getProductById(o.product_id);
			return ('<tr>\
				<td> '+product.name+' </td>\
				<td> '+o.quantity+' </td>\
				<td> '+parseFloat(product.price*parseInt(o.quantity,10)).toFixed(2)+' </td>\
			</tr>');
		});

		items.unshift('<tr class="rowHeader">\
			<th> Item Name </th>\
			<th> Qty </th>\
			 <th> Price (RM) </th>\
		</tr>');

		$('.itemList').html(items);
		$('.orderTotal').html(getTotalPrice());
	});
}
