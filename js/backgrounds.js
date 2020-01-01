function Background(city) {
	this.city = city;
}

Background.prototype.setDrawingProcedures = function() {
	
}

function randomBackground() {
	backgrounds[Math.round(Math.floor(Math.random() * backgrounds.length))].draw(lapse);
}