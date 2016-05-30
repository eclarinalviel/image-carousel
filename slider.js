	$(function() {

		var ul = $(".carousel ul");
		var slide_count = ul.children().length; //count the child ng ul (<li>)
		var slide_width_pc = 100.0 / slide_count; //percentage width per slide
		var slide_index = 0; // which is the visible slide
		var timeOut = 0;
		var interval = 0;

		ul.find("li").each(function(indx) {
			var left_percent = (slide_width_pc * indx) + "%";
			$(this).css({"left":left_percent});
			$(this).css({width:(100 / slide_count) + "%"});
		});

		// // Event when any of the page number is Clicked
		$(".slider-nav a").click(function() {
		    $("a").removeClass("a-active");
		    $(this).addClass("a-active");
		});

		// Event when "Previous" Button is Clicked
		$(".carousel .prev").click(function() {
			clearTimeout(timeOut);
			clearInterval(interval);
			
			slide(slide_index - 1);
			//find the active anchor then remove its active class
			var active = $(".slider-nav").find("a.a-active");
			active.removeClass('a-active');
		    if(active.prev().length > 0){
				active.prev().addClass('a-active');  
			 }else{
			 	$("a").removeClass("a-active");
				active.addClass("a-active");
			}
		});

		// Event when "Next" Button is Clicked
		$(".carousel .next").click(function() {
			clearTimeout(timeOut);
			clearTimeout(interval);
			//console.log(slide_index);

			slide(slide_index + 1);	
			var active = $(".slider-nav").find("a.a-active");
			active.removeClass("a-active");
		    if(active.next().length > 0){
				active.next().addClass('a-active');  
			 }
			 else{
				$("a").removeClass("a-active");
				active.addClass("a-active");

				$("a:last").removeClass("a-active");
				slide(0);
				$("a:first").addClass("a-active");
				
			}		
		});

		//------------- automatic slide -------------
		    timeOut = setTimeout(function(){
		    // automatic slide declaration
				var cnt = 0;
				var imgs = document.getElementById('img-container');
			    var imgList = imgs.getElementsByTagName('img'); 
		    	if(cnt <= imgList.length){
			    	console.log("Time out will now start!");
			    	$("#slide-1").removeClass('a-active');

			    	interval = setInterval(function(){ 
			    		imgList[0].src = imgList[cnt].src; 
			    		console.log(imgList[0].src);
			    		cnt++;
			            //if the img reached the last slide, return the value of counter to 1
			            if(cnt === imgList.length){ 
			            	console.log("Image Length: " + imgList.length); 
			            	cnt = 0;
			            }
			            // For Automatic Navigation
			            var active = $(".slider-nav").find("a.a-active");
			           	active.addClass('a-active');
		            
		            	if(active.next().length > 0){ // if may next slide pa
		            		active.removeClass('a-active'); 
		                	active.next().addClass('a-active'); 
		            		
			            }else{
			                $("a").removeClass("a-active");
			                $("#slide-1").addClass("a-active");
			            }	 

			    	}, 3000);

		    	}
			  }, 3000);
	    //------------ end of automatic slide ---------------

		//Function to move slides with simple animation 
		function slide(new_slide_index) {

		if(new_slide_index < 0 || new_slide_index >= slide_count) return;  //if the slider reached the last slide then return
			var margin_left_pc = (new_slide_index * (-100)) + "%"; 
			ul.animate({
				"margin-left": margin_left_pc
			  }, 600, "swing", function() {
			   	slide_index = new_slide_index
		  });

		}

		});