var canvas = document.getElementById("grid");
var context = canvas.getContext("2d");
var boundingBox = {
	width: window.innerWidth-10,
	height: window.innerHeight-20,
};
canvas.width = boundingBox.width;
canvas.height = boundingBox.height;

var activeBackground;
var activeRockets = [];
var activeParticles = [];

var last_time = null;
var lapse = 0;
function animate(time) {
	if (last_time == null) {
		lapse = 0;
	} else {
		lapse = time-last_time;
	}
	last_time = time;
	mainDraw(lapse);
	requestAnimationFrame(animate);
}

function mainDraw(lapse) {
	context.clearRect(0,0,canvas.width, canvas.height);
	//activeBackground.draw(lapse);
	activeRockets.forEach(aR => aR.draw(lapse));
	activeParticles.forEach(aP => aP.draw(lapse));
	context.stroke();
}
requestAnimationFrame(animate);