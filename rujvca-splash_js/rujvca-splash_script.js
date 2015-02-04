/* A few global variables so that future eboard members can edit the page freely
 * Follow the format if unsure
 */
var slides = [];

/* Add a slideshow image as follows
 * 		slides.push("filename.jpg");
 * Check model if unsure
 */
slides.push("test-imgs/item1.jpg");
slides.push("test-imgs/item2.jpg");
slides.push("test-imgs/item3.jpg");
slides.push("test-imgs/item4.jpg");
slides.push("test-imgs/item5.jpg");

/* Text that goes in the banner overlay
 * HTML tags allowed, but NO HEADER TAGS (don't use h1, h2, etc.)
 */
var banner_text = "This is a test";

/* Text for the about the club section
 * HTML tags allowed
 */
var about_text = "" +
"<p>" +
	"No description yet" +
"</p>" +
"";

/* Text for the eboard info section
 * HTML tags allowed
 */
var eboard_text = "" +
"<p>" +
	"Election by Russian democracy" +
"</p>" +
"";


/* Write the document
 * Use given variables above
 */
var load = function() {
	/* Write the images to the 'carousel_ul' div */
	$.each(slides, function(index, img) {
		$("#carousel_ul").append( "<li><a href='#'><img id='" + index + "' src='" + img + "' /></a></li>" );
	});
	
	/* Add a banner
	 * 	Use different sizes depending on screen size
	 *
	 * Banner styles
	 * 	Move it to its correct position over carousel_ul
	 * 	Set bg color to #B8B8B8 (gray), rgba(184, 184, 184, .5)
	 */
	if ( $(window).width() <= 727 ) { /* Mobile */
		$("#banner").append("<h3>" + banner_text + "</h3>");
	} else if ( $(window).width() > 727 && $(window).width() <= 1010 ) { /* Tablet */
		$("#banner").append("<h2>" + banner_text + "</h2>");
	} else { /* Desktop */
		$("#banner").append("<h1>" + banner_text + "</h1>");
	}
	$("#banner").css({
		"position": "absolute",
		"zIndex": "9002",
		"top": $( document ).height() * .20 + "px",
		"left": $( document ).width() * .20 + "px",
		"backgroundColor": "rgba(184, 184, 184, .40)",
		"border-radius": "5px",
		"padding": "0px 10px 0px 10px"  /* Left and right 10px padding */
	});
	
	/* Navbar
	 *
	 * Sticky when it reaches top
	 * Images when not active, text when active
	 */
	/* First, add div elements to hold the buttons */
	$("#navbar_container").append("<div id='about-button'></div>");
	$("#navbar_container").append("<div id='eboard-info-button'></div>");
	$("#navbar_container").append("<div id='to-blog-button'></div>");
	/* Add icons */
	/* Add text */
	$("#about-button").append("About the Club");
	$("#eboard-info-button").append("About the EBoard");
	$("#to-blog-button").append("<a href='http://rujvca.org'>To the Blog!</a>");
	/* Add styles */
	if ( $(window).width() <= 727 ) { /* Mobile */
		
	} else if ( $(window).width() > 727 && $(window).width() <= 1010 ) { /* Tablet */
		
	} else { /* Desktop */
		
	}
	
	/* Add the club description */
	$("#about_club").append(about_text);
	
	/* Add the eboard description */
	$("#about_eboard").append(eboard_text);
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
	
	/* Put dynamic content on the page */
	load();
	
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
