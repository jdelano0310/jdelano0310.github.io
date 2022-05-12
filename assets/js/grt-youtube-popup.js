/*!
 * GRT Youtube Popup - jQuery Plugin
 * Version: 1.0
 * Author: GRT107
 *
 * Copyright (c) 2017 GRT107
 * Released under the MIT license
*/

(function ( $ ) {

	$.fn.grtyoutube = function( options ) {

		return this.each(function() {

			// Get video ID
			var getvideoid = $(this).attr("youtubeid");
			var videoPlayback = '';
			var src = '';
			var popupIfame = '';
			
			// Default options
			var settings = $.extend({
				videoID: getvideoid,
				autoPlay: true,
				theme: "dark"
			}, options );

			// Convert some values
			if(settings.autoPlay === true) { settings.autoPlay = 1 } else if(settings.autoPlay === false)  { settings.autoPlay = 0 }
			if(settings.theme === "dark") { settings.theme = "grtyoutube-dark-theme" } else if(settings.theme === "light")  { settings.theme = "grtyoutube-light-theme" }
			
			if(settings.videoID.indexOf('twitch') > -1) {
				src = settings.videoID.split('/')[1];
				popupIfame='<iframe class="grtyoutube-iframe" src="https://clips.twitch.tv/embed?clip=' + src + '&parent=www.fansofstapes.com" autoplay="true" frameborder="0" allowfullscreen="false" scrolling="no"></iframe>';
			} else {

				if(settings.videoID.indexOf('FB/') > -1) {
					src = settings.videoID.split('/')[1];
					popupIfame='<iframe class="grtyoutube-iframe" src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com' + src + '&show_text=false&width=850&t=0" width="100%" height="100%" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>';
				} else {

					// check for start and end paramters in the video id
					var startTimeLocation = settings.videoID.indexOf('start');

					if(startTimeLocation > 0) {
						// has a start and end time to show
						var splitID = settings.videoID.split('|');
						settings.videoID = splitID[0];

						videoPlayback = '&' + splitID[1];

						src = 'https://www.youtube.com/embed/'+settings.videoID+'?rel=0&wmode=transparent&autoplay='+settings.autoPlay+videoPlayback+'&iv_load_policy=3';	
					} else {
						// doesn't have specidied start and end time to show
						src = 'https://www.youtube.com/embed/'+settings.videoID+'?rel=0&wmode=transparent&autoplay='+settings.autoPlay+'&iv_load_policy=3';
					}

					popupIfame = '<iframe class="grtyoutube-iframe" src="'+src+'" allowfullscreen frameborder="0" allow="autoplay; fullscreen"></iframe>'
				}
			}

			// Initialize on click
			if(getvideoid) {
				$(this).on( "click", function() {
					 $("body").append('<div class="grtyoutube-popup '+settings.theme+'">'+
								'<div class="grtyoutube-popup-content">'+
									'<span class="grtyoutube-popup-close"></span>'+
									popupIfame+
								'</div>'+
							'</div>');
				});
			}

			// Close the box on click or escape
			$(this).on('click', function (event) {
				event.preventDefault();
				$(".grtyoutube-popup-close, .grtyoutube-popup").click(function(){
					$(".grtyoutube-popup").remove();
				});
			});

			$(document).keyup(function(event) {
				if (event.keyCode == 27){
					$(".grtyoutube-popup").remove();
				}
			});
		});
	};

}( jQuery ));
