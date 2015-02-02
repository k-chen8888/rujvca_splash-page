/* A few global variables so that future eboard members can edit the page freely */
var slides = [];

/* Add a slideshow image as follows
 * 		slides.push("filename.jpg");
 * Check model if unsure
 */
slides.push("");
slides.push("");
slides.push("");
slides.push("");
slides.push("");

/* Text that goes in the banner overlay
 * HTML tags allowed
 */
var banner_text = "";

/* Text for the about the club section
 * HTML tags allowed
 */
var about_text = "";

/* Text for the eboard info section
 * HTML tags allowed
 */
var eboard_text = "";


/* Load images based on an info file
 * Write images into document and resizes them to fit window
 */
var load = function(data) {
	var imgs = [];
};

/* Get every image that has loaded and store them in an array
 * Testing only
 */
var get_img = function() {
	var imgs = [];
	
	$( "li img" ).each(function(index, i){
		imgs.push(i);
	});
	
	return imgs;
};

/* Hides all images except the one at the index passed in */
var hideaway = function(list, i) {
	$.each(list, function(index, elem) {
		if (parseInt($(this).attr('id')) === i) {
			$(this).fadeTo(500, 1);
		} else {
			$(this).fadeTo(500, 0);
		}
	});
};

/* Hides image i and un-hides image j */
var change_hide = function(list, i, j) {
	/* Reveal element j */
	$(list[j]).fadeTo(500, 1);
	/* Hide element i */
	$(list[i]).fadeTo(500, 0);
}

/* Fixes an annoying negative modulo tick
 * Calculates x % y
 */
var modulo = function(x, y){
	return (x + y) % y;
}

$(window).load(function() {
	/* Current image that should be showing */
	var visible = 0;
	/* Next image to show */
	var index = 0;
	
	/* Images on the page */
	var imgs = get_img();
	
	/* Prevent events from firing if they are already going on */
	var ignore = false;
	
	/* Everything but image index 0 is hidden to start*/
	hideaway(imgs, index);
	
	/* Goes to next image */
	var nextimg = function(){
		visible = modulo(index + 1, imgs.length);
		change_hide(imgs, index, visible);
		index = visible;
	}
	/* Automatically goes to the next image every 2 seconds */
	var autonext = window.setInterval(nextimg, 2000);
	
	/* Go to the next image (right) */
	$('#right_scroll img').click(function(){
		/* Stay on new image for 2 seconds */
		clearInterval(autonext);
		
		/* Go to new image */
		visible = modulo(index + 1, imgs.length);
		change_hide(imgs, index, visible);
		index = visible;
		
		/* Start up interval again */
		autonext = window.setInterval(nextimg , 2000);
	});
	
	/* Go to the previous image (left) */ 
	$('#left_scroll img').click(function(){
		/* Stay on new image for 2 seconds */
		clearInterval(autonext);
		
		/* Go to new image */
		visible = modulo(index - 1, imgs.length);
		change_hide(imgs, index, visible);
		index = visible;
		
		/* Start up interval again */
		autonext = window.setInterval(nextimg , 2000);
	});
});
