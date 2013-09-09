/*
	Only add code to this file.
*/


// $(document).ready(function(){

	// $(".box2").css("background","red");

	var input = prompt('Are you ready for the DOM to change? (Y) or (N)');

	if (input === 'Y' || input === 'y'){
		$('.box').hide(1000);
		
		$('.box2').css("background","blue").show(1000);
	}
// })