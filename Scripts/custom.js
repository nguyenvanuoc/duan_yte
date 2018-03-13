$.fn.setActive=function(index){
	$(this).each(function(i){

		if(index==i){
			$(this).addClass("active");
		}else{
			$(this).removeClass("active");
		}
	});
}