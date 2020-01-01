var canvas = document.getElementById("grid");
var inputHandler = {
	startHandle: function() {
		canvas.addEventListener("click", inputHandler.canvasClickEvents);
		canvas.addEventListener("keydown", inputHandler.handleKeyDown);
	},
	toggleAuto: function() {
		let toggleAuto = true;
		if (toggleAuto)
			setInterval(function(){launchRandomFirework(Math.round(Math.floor(Math.random() * canvas.width)), Math.round(Math.floor(Math.random() * canvas.height)));}, 1500);
		toggleAuto = !toggleAuto;
	},
	canvasClickEvents: function(e) {
		launchRandomFirework(e.clientX, e.clientY);
	},
	handleKeyDown: function(e) {
		switch(e.keyCode) {
			case 69: //"e" pressed
				randomBackground();
				break;
		}
	},
};