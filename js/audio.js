var launch = new Audio("sfx/launch.ogg");
var twinkle = new Audio("sfx/twinkle.ogg");

function playAudio(name) {
	switch (name) {
		case "launch":
			launch.play();
			break;
		case "twinkle":
			twinkle.play();
			break;
	}
}