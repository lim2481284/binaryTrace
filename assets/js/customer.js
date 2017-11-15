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
	 
});