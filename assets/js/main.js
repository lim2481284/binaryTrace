$(document).ready(function(){
	 $(".purchaseBtn").click(function(){
		$(".camSection").animate({			
			height: "0px"
		},1000,function(){			
		});		
		$(".purchaseBtn").attr('class',' purchaseBtn active');
		$(".attributeBtn").attr('class','attributeBtn');
		$(".purchaseSection").slideDown(1000);
		$(".attributeSection").slideUp(1000);
	 });
	 
	 $(".attributeBtn").click(function(){
		$(".camSection").animate({			
			height: "290px"
		},1000,function(){			
		});	
		$(".attributeBtn").attr('class','attributeBtn active');
		$(".purchaseBtn").attr('class','purchaseBtn');
		$(".purchaseSection").slideUp(1000);
		$(".attributeSection").slideDown(1000);
	 });
});
