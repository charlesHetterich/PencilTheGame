var atBottom = false;
const linkSpeed = 0.01;
var linkPercent = 0;

$(document).ready(function() {
	//hover function links
	$(".link").hover(
		function() {
			//choose color
			var color = '#ffffff';
			if ($(this).attr("id") == "t-link") {
				color = '#00aced';
			}
			else if ($(this).attr("id") == "e-link") {
				color = '#ffaf3f';
			}
			else if ($(this).attr("id") == "m-link") {
				color = '#55ed8f';
			}

			//perform animation
			$(this).stop();
			$(this).animate( {
            'padding-left': '150px',
            'backgroundColor': color
			});
		}, function() {
			$(this).stop();
	    	$(this).animate( {
            'padding-left': '0px',
            'backgroundColor': 'black'
	    	});
	    }
	);

	//bring links over when at bottom of screen
	setInterval(function () {
		//get variables
		var twitter = $('#t-link');
		var email = $('#e-link');
		var me = $('#m-link');
		var scrollY = $(this).scrollTop();

		//change percent based on if at bottom or not
    	if (atBottom) {
    		linkPercent += linkSpeed;
    		if (linkPercent > 1.5)
    			linkPercent = 1.5;
    	}
    	else {
    		linkPercent -= linkSpeed;
    		if (linkPercent < 0.4)
    			linkPercent = 0.4;
    	}

		//calculate positions
		var ease = 2;
		var twitterX = -570 + easePercent(linkPercent, ease, 1.2) * 600;
		var emailX = -570 + easePercent(linkPercent - 0.1, ease, 1.2) * 600;
		var meX = -570 + easePercent(linkPercent - 0.2, ease, 1.2) * 600;

		//set scroll position
		twitter.css({'left': twitterX + "px"});
		email.css({'left': emailX + "px"});
		me.css({'left': meX + "px"});

	}, 10);

});

$(window).scroll(function() {
	//when bottom of page is hit
	if($(window).scrollTop() + $(window).height() >=
	   $(document).height() - $('#footer-content').outerHeight(true)) {
		atBottom = true;
	}
	else {
   		atBottom = false;
	}
});

//finds eased percentage from 'a' based on ease 'a'
function easePercent(x, a, pCap) {

	if (x > pCap)
		x = pCap;

	if (x < 0)
		x = 0;

	return Math.pow(x, a) / (Math.pow(x, a) + Math.pow(1 - x, a));
}