function FireworkParticle(pattern, color, xPos, yPos, size, xVel, yVel, xAccel, yAccel) {
	this.pattern = pattern;
	this.color = color;
	this.xPos = xPos;
	this.yPos = yPos;
	this.size = size;
	this.xVel = xVel;
	this.yVel = yVel;
	this.xAccel = xAccel;
	this.yAccel = yAccel;
}

FireworkParticle.prototype.draw = function(lapse) {
	if (this.pattern == "tourbillion") {
		this.xVel += Math.random() > 0.5 ? Math.random() : Math.random() * -1;
		this.yVel += Math.random() > 0.5 ? Math.random() : Math.random() * -1;
		this.xAccel += Math.random() > 0.5 ? Math.random()/10 : Math.random()/10 * -1;
		this.yAccel += Math.random() > 0.5 ? Math.random()/10 : Math.random()/10 * -1;
	}
	this.xPos -= this.xVel;
	this.yPos -= this.yVel;
	this.xVel += this.xAccel;
	this.yVel += this.yAccel;
	context.beginPath();
	context.fillStyle = `rgb(${this.color.red}, ${this.color.green}, ${this.color.blue})`
	context.arc(this.xPos, this.yPos, this.size, 0, Math.PI * 2);
	context.fill();
	context.closePath();
}