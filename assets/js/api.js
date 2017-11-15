function Api(){
  this.url = "http://192.168.3.245:3000/";

  this.getProducts = function(success){
    $.get(this.url+'product',{}).done((data)=>success(data));
  }
  this.getProducts = this.getProducts.bind(this);
}

var api = new Api();
