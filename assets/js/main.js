$(document).ready(function(){
	 $(".purchaseBtn").click(function(){
		$(".camSection").animate({			
			height: "0px"
		},1000,function(){			
		});		
		$(".purchaseBtn").attr('class',' purchaseBtn active');
		$(".attributeBtn").attr('class','attributeBtn');
		$(".purchaseSection").show();
		$(".attributeSection").hide();
	 });
	 
	 $(".attributeBtn").click(function(){
		$(".camSection").animate({			
			height: "290px"
		},1000,function(){			
		});	
		$(".attributeBtn").attr('class','attributeBtn active');
		$(".purchaseBtn").attr('class','purchaseBtn');
		$(".purchaseSection").hide();
		$(".attributeSection").show();
	 });
});
