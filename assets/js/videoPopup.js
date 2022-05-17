/*!
 * Based on **************
 * GRT Youtube Popup - jQuery Plugin
 * Version: 1.0
 * Author: GRT107
 *
 * Copyright (c) 2017 GRT107
 * Released under the MIT license
 * modified to allow it to display Twitch clips and videos from Facebook - 2022 JDelano0310
*/

(function ( $ ) {

	$.fn.videoPopup = function( options ) {

		return this.each(function() {

			// Get video ID
			var getvideoid = $(this).attr("videoid");
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
			if(settings.theme === "dark") { settings.theme = "videoPopup-dark-theme" } else if(settings.theme === "light")  { settings.theme = "videoPopup-light-theme" }
			
			if(settings.videoID.indexOf('twitch') > -1) {
				// twitch video request
				src = settings.videoID.split('/')[1];
				popupIfame='<iframe class="videoPopup-iframe" src="https://clips.twitch.tv/embed?clip=' + src + '&parent=www.fansofstapes.com" autoplay="true" frameborder="0" allowfullscreen="false" scrolling="no"></iframe>';
			} else {

				if(settings.videoID.indexOf('FB/') > -1) {
					// Facebook video request using the embed iframe code from their share popup
					src = settings.videoID.split('/')[1];
					popupIfame='<iframe class="videoPopup-iframe" src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com' + src + '&show_text=false&width=850&t=0" width="100%" height="100%" data-autoplay="true" scrolling="no" frameborder="0" allow="clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="false"></iframe>';
				} else {

					// YouTube video requested
					// check for start and end paramters in the video id
					var startTimeLocation = settings.videoID.indexOf('start');

					if(startTimeLocation > 0) {
						// has a start and end time to show
						var splitID = settings.videoID.split('|');
						settings.videoID = splitID[0];

						videoPlayback = '&' + splitID[1];

						src = 'https://www.youtube.com/embed/'+settings.videoID+'?rel=0&wmode=transparent&autoplay='+settings.autoPlay+videoPlayback+'&iv_load_policy=3';	
					} else {
						// doesn't have specified start and end time to show
						src = 'https://www.youtube.com/embed/'+settings.videoID+'?rel=0&wmode=transparent&autoplay='+settings.autoPlay+'&iv_load_policy=3';
					}

					popupIfame = '<iframe class="videoPopup-iframe" src="'+src+'" allowfullscreen frameborder="0" allow="autoplay; fullscreen"></iframe>'
				}
			}

			// Initialize on click
			if(getvideoid) {
				$(this).on( "click", function() {
					 $("body").append('<div class="videoPopup-popup '+settings.theme+'">'+
								'<div class="videoPopup-popup-content">'+
									'<span class="videoPopup-popup-close"></span>'+
									popupIfame+
								'</div>'+
							'</div>');
				});
			}

			// Close the box on click or escape
			$(this).on('click', function (event) {
				event.preventDefault();
				$(".videoPopup-popup-close, .videoPopup-popup").click(function(){
					$(".videoPopup-popup").remove();
				});
			});

			$(document).keyup(function(event) {
				if (event.keyCode == 27){
					$(".videoPopup-popup").remove();
				}
			});
		});
	};

}( jQuery ));
