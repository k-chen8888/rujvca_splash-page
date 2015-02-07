/* Write the document
 * Use given variables in 'rujvca-splash_global.js'
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
	/* Add ul to hold button li elements
	 * Put the container in the correct place
	 */
	$("#navbar_container").append("<ul id='navbar'></ul>");
	$("#navbar_container").css({
		"position": "absolute",
		"top": $( document ).height() * .75 + "px"
	});
	/* Style this ul to turn it into a navbar */
	$("#navbar").css({
		"top": $( document ).height() * .75 + "px",
		"list-style-type": "none",
		"margin": "0",
		"padding": "0",
	});
	/* Add an li element for each button */
	$("#navbar").append("<li id='about-button'></li>");
	$("#navbar").append("<li id='eboard-info-button'></li>");
	$("#navbar").append("<li id='to-blog-button'></li>");
	/* Make the navbar elements more navbar-like */
	$("#about-button, #eboard-info-button, #to-blog-button").css({
		"display": "inline-block",
		"height": $( document ).height() * .1 + "px",
		"width": $( document ).width() * .15 + "px"
	});
	/* Add icons */
	/* Add text */
	$("#about-button").append("<a id='about-navbutton' href='#about_club'>About the Club</a>");
	$("#eboard-info-button").append("<a id='eboard-info-navbutton' href='#about_club'>About the E-Board</a>");
	$("#to-blog-button").append("<a id='to-blog-navbutton' href='http://rujvca.org'>To the Blog!</a>");
	/* Add universal styles */
	$("#about-navbutton").position({ /* Centers text in nav buttons */
		my: "center",
		at: "center",
		of: "#about-button"
	});
	$("#eboard-info-navbutton").position({ /* Centers text in nav buttons */
		my: "center",
		at: "center",
		of: "#eboard-info-button"
	});
	$("#to-blog-navbutton").position({ /* Centers text in nav buttons */
		my: "center",
		at: "center",
		of: "#to-blog-button"
	});
	$("#about-navbutton, #eboard-info-navbutton, #to-blog-navbutton").css({ /* Removes link formatting */
		"text-decoration": "none",
		"color": "rgb(48, 48, 48)" /* Dark gray #303030 */
	});
	/* Add styles unique to displays of specific sizes */
	if ( $(window).width() <= 727 ) { /* Mobile */
		
	} else if ( $(window).width() > 727 && $(window).width() <= 1010 ) { /* Tablet */
		
	} else { /* Desktop */
		
	}
	
	/* Add the club description and styles */
	$("#about_club").append(about_text);
	$("#about_club").css({
		"position": "absolute",
		"top": $( document ).height() * .85 + "px",
		"left": $( document ).width() * .1 + "px",
		"width": $( document ).width() * .8 + "px"
	});
	/* Reveal this element on button click */
	$("#about-navbutton").click(function() {
		$("#about_club").fadeTo(500, 1);
		$("#about_eboard").fadeTo(500, 0);
	});
	
	/* Add the eboard description and styles */
	$("#about_eboard").append(eboard_text);
	$("#about_eboard").css({
		"position": "absolute",
		"top": $( document ).height() * .85 + "px",
		"left": $( document ).width() * .1 + "px",
		"width": $( document ).width() * .8 + "px"
	});
	/* Reveal this element on button click */
	$("#eboard-info-navbutton").click(function() {
		$("#about_eboard").fadeTo(500, 1);
		$("#about_club").fadeTo(500, 0);
	});
	/* This starts out hidden */
	$("#about_eboard").fadeTo(500, 0);
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
	
	/* Everything but image index 0 is hidden to start */
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

	/* Cross-browser sticky navbar */
	var originalYOffset = $("#navbar_container").offset().top;
	
	document.addEventListener('scroll', function() {
		if(window.scrollY >= originalYOffset) {
			$("#navbar_container").addClass('sticky');
		} else {
			$("#navbar_container").removeClass('sticky');
		}
	});

	/* The navbar displays text when inactive and icons when active
	 * Display only text when the page first loads
	 */
});
