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
	 
	 $('.addAttribute').click(function(){
		$('.attributeSection').prepend('<input type="text" class="form-control" required><br>');
	 });
	 
	 $('.addProductBtn').click(function(){
		 swal({
		  title: 'Confirm to add ?',
		  text: "Percentage of customer that might be interested : 0.001%",
		  type: 'info',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, confirm to add!'
		}).then(function () {
		  swal(
			'Cancel!',
			'Your file has been deleted.',
			'success'
		  )
		})
	 });
});
