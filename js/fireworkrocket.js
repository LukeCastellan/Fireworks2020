function FireworkRocket(image, xPos, yPos, finalYPos, color, pattern, velocity) {
	this.image = image;
	this.xPos = xPos;
	this.yPos = yPos;
	this.finalYPos = finalYPos;
	this.color = color;
	this.pattern = pattern;
	this.velocity = velocity;
}

FireworkRocket.prototype.getImage = function() {
	let img = new Image(27,32); //hardcoded unless I can get this from the file
	img.src = this.image;
	return img;
}

FireworkRocket.prototype.draw = function(lapse) {
	this.yPos -= this.velocity; //make it go up in JS
	context.drawImage(this.getImage(),this.xPos, this.yPos);
	if (this.yPos < this.finalYPos) { //goes from bottom of canvas to where mouse clicked
		this.createParticles(this.pattern, this.color, this.pattern);
		this.explode();
	} 
}

//MASSIVE TODO OF DE-SPAGHETTIFYING DIFFERENT PARTICLE DIRECTIONS AND VELOCITIES
FireworkRocket.prototype.createParticles = function(pattern, color, pattern) {
	let xSpread, ySpread, size, baseXVel, baseYVel, baseXAccel, baseYAccel;
	switch (pattern) {
		case "brocade": //X shaped antigrav particles
			xSpread = this.xPos + Math.round(Math.random() * 50 + 10);
			ySpread = this.finalYPos - Math.round(Math.random() * 25 - 15);
			size = 4;
			baseXVel = 3;
			baseYVel = 3;
			baseXAccel = 0;
			baseYAccel = 0;
			for (let i = 0; i<10; ++i) { //q1 (right, up)
				activeParticles.push(new FireworkParticle(pattern, color, xSpread, ySpread, size, baseXVel, baseYVel*-1, baseXAccel, baseYAccel));
				xSpread = this.xPos + Math.round(Math.random() * 50 + 10) + (i*i);
				ySpread = this.finalYPos - Math.round(Math.random() * 25 - 15) - (i*i);
			}
			for (let i = 0; i<10; ++i) { //q2 (left, up)
				activeParticles.push(new FireworkParticle(pattern, color, xSpread, ySpread, size, baseXVel*-1, baseYVel*-1, baseXAccel, baseYAccel));
				xSpread = this.xPos + Math.round(Math.random() * 50 + 10) + (i*i);
				ySpread = this.finalYPos - Math.round(Math.random() * 25 - 15) - (i*i);
			}
			for (let i = 0; i<10; ++i) { //q3 (left, down)
				activeParticles.push(new FireworkParticle(pattern, color, xSpread, ySpread, size, baseXVel*-1, baseYVel, baseXAccel, baseYAccel));
				xSpread = this.xPos + Math.round(Math.random() * 50 + 10) + (i*i);
				ySpread = this.finalYPos - Math.round(Math.random() * 25 - 15) - (i*i);
			}
			for (let i = 0; i<10; ++i) { //q4 (right, down)
				activeParticles.push(new FireworkParticle(pattern, color, xSpread, ySpread, size, baseXVel, baseYVel, baseXAccel, baseYAccel));
				xSpread = this.xPos + Math.round(Math.random() * 50 + 10) + (i*i);
				ySpread = this.finalYPos - Math.round(Math.random() * 25 - 15) - (i*i);
			}
			break;
		case "comet": //left and right stream of particles following gravity
			xSpread = this.xPos;
			ySpread = this.finalYPos;
			size = 4;
			baseXVel = 5;
			baseYVel = 5;
			baseXAccel = 0.1;
			baseYAccel = 0.3;
			for (let i = 0; i<10; ++i) { //left
				activeParticles.push(new FireworkParticle(pattern,color, xSpread, ySpread, size, baseXVel*-1, baseYVel, baseXAccel*-1, baseYAccel*-1));
				xSpread = this.xPos - (i*i);
				ySpread = this.finalYPos - (i*20);
			}
			for (let i = 0; i<10; ++i) { //right
				activeParticles.push(new FireworkParticle(pattern,color, xSpread, ySpread, size, baseXVel, baseYVel, baseXAccel, baseYAccel*-1));
				xSpread = this.xPos + (i*i);
				ySpread = this.finalYPos + (i*20);
			}
			break;
		case "tourbillion": //chaos theory incarnate
			xSpread = this.xPos + Math.round(Math.random() * 50);
			ySpread = this.finalYPos - Math.round(Math.random() * 20);
			size = 3;
			baseXVel = randomVelocity()/5;
			baseYVel = randomVelocity()/5;
			baseXAccel = 0.01;
			baseYAccel = 0.01;
			for (let i = 0; i<40; ++i) {
				activeParticles.push(new FireworkParticle(pattern,color, xSpread, ySpread, size, baseXVel, baseYVel, baseXAccel, baseYAccel));
				xSpread = this.xPos + Math.round(Math.random() * 50);
				ySpread = this.finalYPos - Math.round(Math.random() * 20);
			}
			break;
		case "pearls": //many many particles heading to infinity and beyond
			size = 5;
			baseXAccel = 0;
			baseYAccel = 0.05;
			for (let i = 1; i<=20; ++i) { //left
				activeParticles.push(new FireworkParticle(pattern,color, this.xPos, this.finalYPos, size, i*1.02, i*1.02, 0, baseYAccel*-1));
			}
			for (let i = 1; i<=20; ++i) { //right
				activeParticles.push(new FireworkParticle(pattern,color, this.xPos, this.finalYPos, size, -i*1.02, i*1.02, 0, baseYAccel*-1));
			}
			break;
	}
}

FireworkRocket.prototype.explode = function() {
	playAudio("twinkle");
	activeRockets = activeRockets.filter(r => r != this);
}

function launchRandomFirework(mouseX, finalYPos) {
	let startHeight = canvas.height - 40;
	let randomRocket = new FireworkRocket("img/rocket.png", mouseX, startHeight, finalYPos, randomColor(), randomPattern(), randomVelocity());
	console.log(randomRocket.color, randomRocket.pattern, randomRocket.finalYPos, randomRocket.velocity);
	activeRockets.push(randomRocket);
	playAudio("launch");
}

function randomColor() {
	let randomColor = {
		red: (Math.round(Math.floor(Math.random() * 255 + 1))), //0-255, repeat for G,B
		green: (Math.round(Math.floor(Math.random() * 255 + 1))),
		blue: (Math.round(Math.floor(Math.random() * 255 + 1))),
	};
	return randomColor;
}

function randomPattern() {
	let patterns = [];
	patterns.push("brocade");
	patterns.push("comet");
	patterns.push("tourbillion");
	patterns.push("pearls");
	return patterns[Math.round(Math.floor(Math.random() * patterns.length))];
}

function randomVelocity() {
	return (Math.round(Math.floor(Math.random() * 20 + 5)));
}