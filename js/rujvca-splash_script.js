/* Load images based on an info file
 * Write images into document and resizes them to fit window
 * Return an array with all image li elements
 */
var load = function() {
	var imgs = [];
};

/* Get every image that has loaded and store them in an array
 * Testing only
 */
var get_img = function() {
	var imgs = [];
	
	$( "li img" ).each(function(index, i){
		imgs.push(i);
		console.log(index + ": " + i);
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

/* Fixes an annoying negative modulo tick
 * Calculates x % y
 */
var modulo = function(x, y){
	return (x + y) % y;
}

$(document).ready(function() {
	/* Current image that should be showing */
	var index = 0;
	
	/* Images on the page */
	var imgs = get_img();
	
	/* Everything but image index 0 is hidden to start*/
	hideaway(imgs, index);
	
	/* Go to the next image (right) */
	$('#right_scroll img').click(function(){
		index = modulo(index + 1, imgs.length);
		hideaway(imgs, index);
		console.log(index);
	});
	
	/* Go to the previous image (left) */ 
	$('#left_scroll img').click(function(){
		index = modulo(index - 1, imgs.length);
		hideaway(imgs, index);
		console.log(index);
	});
});  