(function($){

	$.fn.pinwheel = function(options){

		/* Options of the pinwheel */
		var defaultOptions ={
			'interval' : 5000 ,
			'width' : 800,
			'height' : 250,
			'slideZIndex' : 200
		};
		var parameters = $.extend(defaultOptions, options);

		

		/* Init the plugin for all the mentionned elements */
		return this.each(function(){

			var slides = $(this).find("ul.content-pinwheel").find("li");
			var currentSlideIndex =0;
			var nbSlide = slides.length;

			/**
			 *	Change the current nave item.
			 *
			 **/
			var changeNav = function(nav, index){
				nav.find("li").each(function(){
					var itemIndex = $(this).attr('name').split('-')[2];
					if(itemIndex == index){
						$(this).addClass("current-item");
					}else{
						$(this).removeClass("current-item");
					}
				});
			};

			/**
			 * Return the next slide index.
			 **/
			var getNextSlideIndex = function(){
				if(currentSlideIndex < nbSlide-1){
					return parseInt(currentSlideIndex+1); 
				}else{
					return 0;
				}
			};

			/**
			 *	Show the slide.
			 **/
			 var showSlide = function(slideIndex){
			 	if( slideIndex >=0 && slideIndex < nbSlide){
			 		if(slideIndex != currentSlideIndex){
						for(i = 0; i < nbSlide; i++){
							var slide = $(slides[i]);
							if(currentSlideIndex == i){
								slide.css('z-index', parameters.slideZIndex);
							}else if(slideIndex == i){
								slide.css('z-index', parameters.slideZIndex -1);
								slide.show();
							}else{
								slide.css('z-index', "auto");
								slide.hide();
							}
						}
						$(slides[currentSlideIndex]).fadeOut(function(){
							currentSlideIndex=slideIndex;
							changeNav(nav, currentSlideIndex);
						});
					}
			 	}
			 };

			/* Set the dimenssions of the slide zone */
			$(this).css({
				'width' : parameters.width,
				'height' : parameters.height
			});

			/* Init the slides */
			slides.each(function(elIndex){
				if(elIndex > 0 ){
					$(this).hide();
					//changeZIndex($(this), -elIndex); //TODO
				}

				$(this).css({
					'width' : parameters.width,
					'height' : parameters.height
				});

				var link = $(this).find("a");
				if(link){
					$(this).on('click', function(){
						var url = link.attr('href');
						if(url){
							window.location.href = url;
						}
					});
				}

			});

			/* Add and init the navigation bar of the pinwheel */
			var nav = $('<ul class="nav-pinwheel"></ul>');
			slides.each(function(index){
				var navItem = $('<li name="nav-item-'+index+'">'+index+'</li>');
				/* Action called when we click on a nav element */
				$(navItem).on('click', function(){
					var itemIndex = $(this).attr('name').split('-')[2];
					showSlide(itemIndex);
				});
				$(nav).append(navItem);
			});
			$(this).prepend(nav);
			changeNav(nav, currentSlideIndex);


			/**
			 *	 The main function, run the pinwheel 
			 **/
			setInterval(function(){
				var nextIndex = getNextSlideIndex();
				showSlide(nextIndex);	
			}, parameters.interval);

		});
	};
})(jQuery);