function POST(url, data, success, err=console.error){
  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then((res)=>res.json())
  .then((json)=>{success(json);})
  .catch((e)=>{err(e);})
}

function Api(){
  this.url = "http://192.168.3.245:3000/";

  this.getProducts = function(success){
    $.get(this.url+'product',{}).done((data)=>success(data));
  }
  this.getProducts = this.getProducts.bind(this);

  this.getLastOrder = function(success){
    $.get(this.url+'order',{_sort:'id',_order:'desc',_limit:1}).done((data)=>success(data));
  }
  this.getLastOrder = this.getLastOrder.bind(this);

  this.createOrder = function(data, success){
    POST(this.url+'order',data,(data)=>success(data));
  }
  this.createOrder = this.createOrder.bind(this);
}

var api = new Api();
